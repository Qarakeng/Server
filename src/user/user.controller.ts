import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser } from 'src/auth/util/getUser';
import { User } from 'src/utils/typeorm';
import { ChatService } from './services/chat.service';
import { UpdateMessageDto } from './dto/message/update.dto';
import { UpdateProfileDto } from './dto/update-user.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController { 
  constructor(
    private readonly userService: UserService,
    private readonly chatService: ChatService
    ) {}

  @Get('friends')
  async MyFriends (@GetUser() user: User) {
    return await this.userService.myFriends(user);
  }

  @Patch('profile/update')
  async UpdateProfile (@GetUser() user: User, @Body() dto: UpdateProfileDto) {
    return await this.userService.updateProfile(user, dto);
  } 

  @Get('profile/update')
  async GetProfile (@GetUser() user: User) {
    return await this.userService.myProfile(user);
  }



  @Get()
  async Search(@Query() query) {
    return await this.userService.SearchUser(query['search']);
  }

  @Post('/sendMessage')
  SendMessage(@GetUser() user: User, @Body() createUserDto: CreateUserDto){
    return this.chatService.create(createUserDto, user);
  }

  @Get('/messagesBy')
  async InChat(@Query() query, @GetUser() user: User) {
    return await this.chatService.GetAllMessage(user, query);
  }

  @Patch('/updateMessages')
  async UpdateMessages (@Body() updateDto: UpdateMessageDto, @GetUser() user: User) {
    return await this.chatService.UpdateMessage(updateDto, user);
  }
  
  @Delete('/deleteMessage/:message_id')
  async DeleteMessages (@Param(':message_id') Message_id: number,  @GetUser() user: User) {
    return await this.chatService.DeleteMessage(Message_id, user);
  }
}

