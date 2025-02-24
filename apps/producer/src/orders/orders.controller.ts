import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly producerService: OrdersService) {}

  @Get()
  getHello(): string {
    return this.producerService.getHello();
  }
}
