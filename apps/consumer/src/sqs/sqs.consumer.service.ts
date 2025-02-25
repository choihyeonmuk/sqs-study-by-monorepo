import {
  ReceiveMessageCommand,
  SendMessageCommand,
  SQSClient,
  SQSClientConfig,
} from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SqsConsumerService {
  private readonly logger = new Logger(SqsConsumerService.name);
  private readonly sqsClient: SQSClient;
  private readonly queueUrl: string;

  constructor(private configService: ConfigService) {
    const sqsClientConfig: SQSClientConfig = {
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
        )!,
      },
    };

    this.sqsClient = new SQSClient(sqsClientConfig);
    this.queueUrl = this.configService.get<string>('AWS_SQS_URL')!;
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async pollMessage() {
    try {
      const receiveParam = {
        QueueUrl: this.queueUrl,
        MaxNumberOfMessages: 5, // Maximum number of messages to return
        WaitTimeSeconds: 5, // Long polling
        VisibilityTimeout: 30, // The duration (in seconds) that the received messages are hidden from subsequent retrieve requests after being retrieved by a ReceiveMessage request
      }

      const command = new ReceiveMessageCommand(receiveParam);
    }
  }
}
