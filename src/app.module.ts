import type { RedisClientOptions } from 'redis';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfig } from './config/typeorm.config';
import { RedisModule } from './redis/redis.module';
import { UserModule } from './user/user.module';
const redisStore = require("cache-manager-redis-store");

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    CacheModule.register(),
    AuthModule,
    UserModule,

  ],
})
export class AppModule {}
