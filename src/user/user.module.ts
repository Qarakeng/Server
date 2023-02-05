import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages, User } from 'src/utils/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ User, Messages ])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
