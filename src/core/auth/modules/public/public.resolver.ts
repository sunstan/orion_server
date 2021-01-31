import {matching} from '@/core/utils/strings';
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {GqlResponse} from '@/core/decorators/gql-response.decorator';
import {GqlUserAgent} from '@/core/decorators/gql-user-agent.decorator';
import {GqlRefreshToken} from '@/core/decorators/gql-refresh-token.decorator';
import {BadRequestException, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {SessionService} from '../session/session.service';
import {SignInOutput} from './outputs/sign-in.output';
import {SignInInput} from './inputs/sign-in.input';
import {UserService} from '../user/user.service';
import {AuthService} from '../../auth.service';
import {ConfigService} from '@nestjs/config';
import {Response} from 'express';

@Resolver()
export class PublicResolver {

    constructor(
        readonly authService: AuthService,
        readonly userService: UserService,
        readonly configService: ConfigService,
        readonly sessionService: SessionService,
    ) {
    }

    @Query(() => Boolean)
    async emailExists (
        @Args('email') email: string,
    ): Promise<boolean> {
        if (!email) throw new BadRequestException('Email is required');
        return !!await this.userService.repository.findOne({email});
    }

    @Mutation(() => SignInOutput)
    async signIn (
        @GqlUserAgent() userAgent: string,
        @GqlResponse() response: Response,
        @Args('input') input: SignInInput,
    ): Promise<SignInOutput> {

        const {email, password, remember} = input;
        if (!email) throw new BadRequestException('email is required');
        if (!password) throw new BadRequestException('Password is requires');

        const user = await this.userService.repository.findOne({email});
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const match = await matching(password, user.password);
        if (!match) throw new UnauthorizedException('Invalid credentials');

        const session = await this.sessionService.repository.createSession({user});
        if (!session) throw new InternalServerErrorException('Unknown error');

        const options: any = {httpOnly: true};
        const duration = parseInt(this.configService.get<string>('AUTH_COOKIE_DURATION'), 10);
        if (remember) options.maxAge = duration * 24 * 60 * 60 * 1000;
        response.cookie('refreshToken', session.refreshToken, options);

        const expiresIn = parseInt(this.configService.get<string>('AUTH_EXPIRES_IN'), 10);
        const accessToken = await this.authService.createToken(user);
        return {accessToken, expiresIn, user};
    }

    @Mutation(() => SignInOutput)
    async refresh (
        @GqlResponse() response: Response,
        @GqlRefreshToken() refreshToken: string,
    ): Promise<SignInOutput> {
        if (!refreshToken) throw new BadRequestException('Refresh Token is required');

        const session = await this.sessionService.repository.findOne({refreshToken, isValid: true});
        if (!session) throw new UnauthorizedException('Invalid Session');

        const user = await session.user;
        if (!user) throw new UnauthorizedException('User not found');

        const expiresIn = parseInt(this.configService.get<string>('AUTH_EXPIRES_IN'), 10);
        const accessToken = await this.authService.createToken(user);
        return {accessToken, expiresIn, user};
    }

    @Mutation(() => Boolean)
    async signOut (
        @GqlResponse() response: Response,
    ): Promise<boolean> {
        return !!response.clearCookie('refreshToken');
    }
}