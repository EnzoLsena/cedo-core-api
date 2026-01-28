import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { DatabaseModule } from './database/database.module';
import { FeaturesModule } from './features/features.module';
import { HttpExceptionsFilter } from './common/filters/exceptionErrorFilter.filter';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { IsAdminGuards } from './common/guards/is-admin-guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
    FeaturesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: IsAdminGuards,
    },
  ],
})
export class AppModule {}
