import {Injectable} from '@nestjs/common';
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {

    constructor(
        readonly configService: ConfigService,
    ) {
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST', 'localhost'),
            port: parseInt(this.configService.get<string>('DB_PORT', '3306'), 10),
            username: this.configService.get<string>('DB_USERNAME', 'root'),
            password: this.configService.get<string>('DB_PASSWORD', 'root'),
            database: this.configService.get<string>('DB_DATABASE', 'test'),
            entities: [__dirname + '../../../**/*.entity{.ts,.js}'],
            synchronize: true,
        };
    }
}