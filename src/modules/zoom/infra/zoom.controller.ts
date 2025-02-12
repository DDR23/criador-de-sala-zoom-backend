import { Controller, Post, Body } from '@nestjs/common';
import { CreateZoomService } from '../services/createZoom.service';
import { CreateZoomDto } from '../domain/dto/create-zoom.dto';

@Controller('zoom')
export class ZoomController {
  constructor(
    private readonly createZoomService: CreateZoomService,
  ) { }

  @Post('create-room')
  createZoom(
    @Body() data: CreateZoomDto,
  ) {
    return this.createZoomService.execute(data);
  }
}
