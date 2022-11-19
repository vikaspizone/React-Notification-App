import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getNotification(
    @Body() data: { fcmToken: string; count: string },
  ): Promise<string> {
    return this.appService.sendNotification(data?.fcmToken, data?.count);
  }
}
