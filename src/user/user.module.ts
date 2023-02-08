import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages, User } from 'src/utils/typeorm';
import { ChatService } from './services/chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([ User, Messages ])],
  controllers: [UserController],
  providers: [UserService, ChatService]
})
export class UserModule {}
