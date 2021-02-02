import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {UserService} from './modules/user/user.service';
import {AuthPayloadDto} from './dto/auth-payload.dto';
import {User} from './modules/user/user.entity';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    readonly jwtService: JwtService,
    readonly userService: UserService,
    readonly configService: ConfigService,
  ) {}

  getUser = async (payload: AuthPayloadDto): Promise<User> =>
    await this.userService.repository.findOne(payload.id);

  createToken = async ({id, email, roles}: User): Promise<string> =>
    await this.jwtService.sign(
        {id, email, roles},
        {
          expiresIn: parseInt(
              this.configService.get<string>('AUTH_EXPIRES_IN'),
              10,
          ),
        },
    );
}
