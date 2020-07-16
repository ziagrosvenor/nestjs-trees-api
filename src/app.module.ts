import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TreesModule } from './trees';
import { HttpExceptionFilter } from './shared/http-exception-filter';

@Module({
  imports: [TreesModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
