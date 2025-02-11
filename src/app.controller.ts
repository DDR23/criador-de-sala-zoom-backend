import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getInfo() {
    return {
      project: 'criador-de-sala-zoom-backend',
      description: 'Criador automatico de sala de reunião no ZOOM',
      owner: 'André Campos',
      builder: 'https://github.com/DDR23',
      statusCode: 200,
    };
  }
}
