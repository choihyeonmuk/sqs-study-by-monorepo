import { Body, Controller, Post } from '@nestjs/common';
import { SqsService } from '../sqs/sqs.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly sqsService: SqsService) {}

  @Post()
  async createOrder(@Body() orderData: any) {
    await this.sqsService.sendMessage({
      type: 'CREATE_ORDER',
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      payload: orderData,
      timestamp: new Date().toISOString(),
    });

    return { message: 'Order creation request sent to the queue' };
  }
}
