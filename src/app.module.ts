import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ZoomModule } from './modules/zoom/zoom.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ZoomModule,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule { }
