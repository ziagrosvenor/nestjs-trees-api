import { Module } from '@nestjs/common';
import { TreesModule } from './trees';

@Module({
  imports: [TreesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
