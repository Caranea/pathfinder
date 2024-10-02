import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersWebhookController } from './webhook/webhook-users.controller';
import { WebhookUsersService } from './services/webhook-users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersWebhookController],
  providers: [UsersService, WebhookUsersService],
})
export class UsersModule {}