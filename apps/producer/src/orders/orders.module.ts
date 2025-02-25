import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { SqsService } from '../sqs/sqs.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [OrdersController],
  providers: [SqsService],
})
export class OrdersModule {}
