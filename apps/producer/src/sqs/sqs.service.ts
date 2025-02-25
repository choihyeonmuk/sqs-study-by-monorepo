import {
  SendMessageCommand,
  SQSClient,
  SQSClientConfig,
} from '@aws-sdk/client-sqs';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqsService {
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

  async sendMessage(messageBody: any) {
    const params = {
      QueueUrl: this.queueUrl,
      MessageBody: JSON.stringify(messageBody),
    };

    const command = new SendMessageCommand(params);
    const response = await this.sqsClient.send(command);
    console.log('Message sent. MessageId:', response.MessageId);
    return response;
  }
}
