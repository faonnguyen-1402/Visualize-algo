import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AlgorithmsModule } from './algorithm/algorithms.module';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    AlgorithmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
