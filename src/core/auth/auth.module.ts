import {Module} from '@nestjs/common';
import {SessionRepository} from './modules/session/session.repository';
import {SessionResolver} from './modules/session/session.resolver';
import {SessionService} from './modules/session/session.service';
import {PublicResolver} from './modules/public/public.resolver';
import {UserRepository} from './modules/user/user.repository';
import {UserResolver} from './modules/user/user.resolver';
import {UserService} from './modules/user/user.service';
import {JwtStrategy} from './strategies/jwt.strategy';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';
import {AuthService} from './auth.service';
import {JwtModule} from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            SessionRepository,
            UserRepository,
        ]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('AUTH_SECRET'),
                signOptions: {
                    expiresIn: parseInt(configService.get<string>('AUTH_EXPIRES_IN'), 10),
                },
            })
        })
    ],
    providers: [
        PublicResolver,
        SessionResolver,
        SessionService,
        UserResolver,
        UserService,
        AuthService,
        JwtStrategy,
    ],
    exports: [
        SessionService,
        UserService,
    ],
})
export class AuthModule {}
