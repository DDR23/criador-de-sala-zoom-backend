import { Module } from '@nestjs/common';
import { ZoomController } from './infra/zoom.controller';
import { ZOOM_SERVICE_TOKEN } from './utils/zoomServiceToken';
import { ZoomRepository } from './infra/zoom.repository';
import { CreateZoomService } from './services/createZoom.service';

@Module({
  controllers: [
    ZoomController,
  ],
  providers: [
    {
      provide: ZOOM_SERVICE_TOKEN,
      useClass: ZoomRepository,
    },
    CreateZoomService,
  ],
})
export class ZoomModule { }
