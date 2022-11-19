import { NestFactory } from '@nestjs/core';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

import { AppModule } from './app.module';
import * as CONFIG from './config.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const adminConfig: ServiceAccount = {
    projectId: CONFIG.project_id,
    privateKey: CONFIG.private_key.replace(/\\n/g, '\n'),
    clientEmail: CONFIG.client_email,
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });

  await app.listen(3000);
}
bootstrap();
