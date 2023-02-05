import type { RedisClientOptions } from 'redis';
import { CacheModule, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
const redisStore = require("cache-manager-redis-store");


@Module({
    imports: [
        CacheModule.register<RedisClientOptions>({
            isGlobal: true,
            store: redisStore
        })
    ],
  providers: [RedisService],
  exports: [RedisService, CacheModule]
})
export class RedisModule {}
