import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mariadb',
      host: this.configService.get('database.host'),
      port: 3306,
      username: this.configService.get('database.user'),
      password: this.configService.get('database.pass'),
      database: this.configService.get('database.name'),
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
