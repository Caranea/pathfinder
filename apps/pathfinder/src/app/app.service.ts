import { Injectable } from '@nestjs/common';
import { RedisCacheService } from './redis/services/redis-cache.service';

@Injectable()
export class AppService {

  getData(): { message: string } {
    return ({ message: 'Hello API' });
  }
}
