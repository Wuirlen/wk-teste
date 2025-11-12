import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TasksModule } from './tasks/tasks.module.js';

@Module({
  imports: [DatabaseModule, AuthModule, TasksModule],
})
export class AppModule {}