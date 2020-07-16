import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TreeModule } from './trees';
import { HttpExceptionFilter } from './shared/http-exception-filter';

@Module({
  imports: [TreeModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
