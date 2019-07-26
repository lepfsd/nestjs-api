import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): {name: string} {
    //return this.appService.getHello();
    return {name: 'Nest (or NestJS) is a framework for building efficient, scalable Node.js server-side applications.'};
  }
}
