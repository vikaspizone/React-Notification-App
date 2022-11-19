import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AppService {
  async sendNotification(fcmToken: string, clickInfo: string): Promise<string> {
    try {
      const res = await admin.messaging().sendToDevice(fcmToken, {
        notification: {
          body: `clicked:${clickInfo}`,
        },
      });

      // return error message if any error create in fcm process
      if (res?.failureCount) {
        return res.results?.[0]?.error?.message;
      }
      // return error message if any error create in fcm process
      return res.results?.[0]?.messageId;
    } catch (error) {
      return error;
    }
  }
}
