import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from '../auth.service';
import {ConfigService} from '@nestjs/config';
import {AuthPayloadDto} from '../dto/auth-payload.dto';
import {User} from '../modules/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        readonly authService: AuthService,
        readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('AUTH_SECRET'),
            ignoreExpiration: false,
        });
    }

    validate = async (payload: AuthPayloadDto): Promise<User> => {
        const user = await this.authService.getUser(payload);
        if (!user) throw new UnauthorizedException('User not found');
        return user;
    };
}
