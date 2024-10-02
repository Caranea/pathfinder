import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { MD5 } from 'object-hash';

@Injectable()
export class RedisCacheService {
  private CACHE_TTL = 21600; // 6 hours

  constructor(@InjectRedis() private readonly redis: Redis) {}

  public async get(input: Record<string, any> | string) {
    const hash = MD5(input);
    const json = await this.redis.get(hash);

    return JSON.parse(json);
  }

  public async set<T>(
    query: Record<string, any> | string,
    value: T,
    options?: { ttl_seconds: number }
  ) {
    const hash = MD5(query);
    const resJson = JSON.stringify(value);

    await this.redis.setex(hash, options?.ttl_seconds || this.CACHE_TTL, resJson);
  }

  public async delete(query: Record<string, any> | string) {
    const hash = MD5(query);
    await this.redis.del(hash);
  }

  public async update<T>(
    query: Record<string, any> | string,
    value: T,
    options?: { ttl_seconds: number }
  ) {
    await this.delete(query);
    await this.set(query, value, options);
  }

  public async flushAll() {
    await this.redis.flushall();
  }
}
