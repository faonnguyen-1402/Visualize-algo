import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AlgorithmsModule } from './algorithms/algorithms.module';

@Module({
  imports: [AuthModule, UsersModule, AlgorithmsModule],
})
export class AppModule {}
