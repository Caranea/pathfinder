import { Controller, Post, Req } from '@nestjs/common';
import { PublicApi } from '../../shared/decorators/public-api.decorator';
import { WebhookUsersService } from '../services/webhook-users.service';

@Controller('user/webhook')
export class UsersWebhookController {
  constructor(private readonly webhookService: WebhookUsersService) {}

  @Post()
  @PublicApi()
  async receive(@Req() req: Request) {
    const webhook = this.webhookService.verify(req);
    await this.webhookService.dispatch(webhook);
  }
}
