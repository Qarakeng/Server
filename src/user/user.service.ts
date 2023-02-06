import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiRes } from 'src/utils/payloadRes';
import { Messages, User } from 'src/utils/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Messages) 
    private readonly MessageRepository: Repository<Messages>,
    @InjectRepository(User) 
    private readonly UserRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto, user: User) {
    createUserDto.author = user;
    const findZRecipient = await this.UserRepository.findOneBy({ id: createUserDto.recaption })
    console.log(createUserDto)

    const newMessage = this.MessageRepository.create({
      context: createUserDto.context,
      author: createUserDto.author,
      recipient: findZRecipient,
    });

    return newMessage.save();
    
  }

  async findAll(chatId: number, user: User) {
    const findMessages = await this.MessageRepository.find({ 
        where: [
          {authorId: user.id},
          {authorId: chatId},
          {recipientId: user.id},
          {recipientId: chatId}
        ],
        relations: ['author', 'recipient']      
      }); 

    if(findMessages.length == 0) {
      return ApiRes('Not Found Messages', HttpStatus.NOT_FOUND);
    }
    return ApiRes('Found chat', HttpStatus.OK, findMessages );
  }

  async myFriends  (_user: User) {
    const user = _user.id;
    // const friends = await this.MessageRepository
    // .createQueryBuilder('messages')
    // .select(['MAX(messages.created_at) AS createdAt', 'messages.id', 'messages.context'])
    // // .leftJoinAndSelect('messages.recipient', 'recipient')
    // // .groupBy('recipient.id')
    // // .where('messages.authorId != :user or messages.recipientId = :user', {
    // //   user
    // // })
    // // .orderBy('messages.created_at', 'DESC')
    // .getMany()

    const d = await this.MessageRepository.find({
      select: ['id', 'context', 'createdAt', 'recipientId'],
      where: {},
      order: {'createdAt': 'DESC'},
      
    })
    const friends = await this.MessageRepository.query(
      'SELECT '
      + 'MAX(id) as id, MAX(authorId) as author_id, MAX(context) as context, MAX(recipientId) as recipent_id, MAX(created_at) as createdAt '
      + 'from Messages ' 
      + `WHERE authorId = ${user} or recipientId=${user} `
      + 'GROUP BY recipientId, authorId '
      + 'ORDER BY context DESC'
      )
    return ApiRes('My Friends', HttpStatus.OK, friends);
  }

  async SearchUser (username: string) {
    if (username.length > 3) {
      const findUsers = await this.UserRepository.find({
        where:{
          username: Like('%' + username + '%')
        },
        take: 5
      });
      if (findUsers.length == 0) return ApiRes('Not Found Users', HttpStatus.NOT_FOUND);
      return ApiRes('Found Users', HttpStatus.OK, findUsers);
    }
    return ApiRes('Search text length short place 3 < text insert', HttpStatus.BAD_REQUEST);
  }
}
