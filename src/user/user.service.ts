import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiRes } from 'src/utils/payloadRes';
import { Messages, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Messages) 
    private readonly MessageRepository: Repository<Messages>,
  ) {}

  async create(createUserDto: CreateUserDto, user: User) {
    createUserDto.author = user;
    console.log(createUserDto)

    const newMessage = this.MessageRepository.create({
      context: createUserDto.context,
      author: createUserDto.author,
      recipient: createUserDto.recaption,
    });

    return newMessage.save();
    
  }

  async findAll(chatId: number, user: User) {
    const findMessages = await this.MessageRepository.find({
        where: { recipientId: chatId },
        relations: ['author', 'recipient']      
      });

    if(findMessages.length == 0) {
      return ApiRes('Not Found Messages', HttpStatus.NOT_FOUND);
    }
    return ApiRes('Found chat', HttpStatus.OK, findMessages );
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
