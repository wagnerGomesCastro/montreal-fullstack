import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './utils/helpers';
import { UserModule } from './modules/user/user.module';
import { AllExceptionsFilters } from './core/filters/all-exceptions.filter';

dotenv.config({ path: path.join(__dirname, 'config', 'envs', `.env.${process.env.NODE_ENV}`) });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // expandVariables: true,
      envFilePath: getEnvPath(path.join(__dirname, 'config', 'envs')),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilters,
    },
  ],
})

//
export class AppModule {}
