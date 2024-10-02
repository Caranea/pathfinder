import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { RedisModule as RedisIOModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisCacheService } from './services/redis-cache.service';

@Module({
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    isGlobal: true,
                    store: redisStore,
                    host: configService.get('HOST'),
                    port: configService.get('REDIS_PORT')
                }
            }
        }),
        RedisIOModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    type: 'single',
                    options: {
                        host: configService.get('HOST'),
                        port: configService.get('REDIS_PORT'),
                        password: configService.get('REDIS_PASSWORD'),
                        ttl: 21600000, // 6 hours
                        no_ready_check: true
                    },
                };
            },
        }),
    ],
    exports: [RedisCacheService],
    providers: [RedisCacheService]
})
export class RedisModule { }
