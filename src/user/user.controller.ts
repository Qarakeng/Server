import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedGuard, LocalAuthGuard } from 'src/auth/util/Gourds';
import { GetUser } from 'src/auth/util/getUser';
import { User } from 'src/utils/typeorm';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController { 
  constructor(private readonly userService: UserService) {}

  // @Get('profile')
  // Profile (@Req() req) {
  //   return req.user;
  // }

  @Get('friends')
  async MyFriends (@GetUser() user: User) {
    return await this.userService.myFriends(user);
  }

  @Post('sendMessage')
  SendMessage(@GetUser() user: User, @Body() createUserDto){
    return this.userService.create(createUserDto, user);
  }

  @Get()
  async Search(@Query() query) {
    return await this.userService.SearchUser(query['search']);
  }

  @Get(':chatId')
  async InChat(@Param('chatId') chatId: number, @GetUser() user: User) {
    return await this.userService.findAll(chatId, user)
  }
}

