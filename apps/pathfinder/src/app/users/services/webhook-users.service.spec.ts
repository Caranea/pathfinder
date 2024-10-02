import { Test, TestingModule } from '@nestjs/testing';
import { WebhookUsersService } from './webhook-users.service';

describe('WebhookUsersService', () => {
  let service: WebhookUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhookUsersService],
    }).compile();

    service = module.get<WebhookUsersService>(WebhookUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
