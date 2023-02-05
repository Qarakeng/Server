import { CacheModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/utils/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    CacheModule.register()
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
