import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { AlgorithmsModule } from './algorithm/algorithms.module';
import { ExerciseModule } from './exercise/exercise.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    AlgorithmsModule,
    ExerciseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
