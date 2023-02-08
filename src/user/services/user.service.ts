import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiRes } from 'src/utils/payloadRes';
import { Messages, User } from 'src/utils/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateProfileDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Messages) 
    private readonly MessageRepository: Repository<Messages>,
    @InjectRepository(User) 
    private readonly UserRepository: Repository<User>
  ) {}

  async myProfile (user: User) {
    const getProfile = await this.UserRepository.findOneBy({ id: user['id'] });
    return ApiRes('Find Profile', HttpStatus.OK, getProfile);
  }
  
  async updateProfile (user: User, dto: UpdateProfileDto) {
    const data = await this.UserRepository.update(user['id'], dto);
    console.log(data);
  }
  
  async myFriends  (_user: User) {
    const user = _user.id;
    console.log('hjk')
    const friednds = await this.MessageRepository
    .createQueryBuilder('msg')
    .select(['MAX(msg.id) as id'])
    .addSelect(['MAX(msg.authorId) as author_id'])
    .addSelect(['MAX(msg.context) as context'])
    .addSelect(['MAX(msg.recipientId) as recipent_id'])
    .addSelect(['MAX(msg.created_at) as createdAt'])
    .leftJoinAndSelect('msg.recipient', 'recipient')
    .leftJoinAndSelect('msg.author', 'author')
    .where('msg.authorId = :user or msg.recipientId = :user', { user })
    .groupBy('msg.recipientId')
    .addGroupBy('msg.authorId')
    .orderBy('msg.created_at', 'DESC')
    .getRawMany()

    if (friednds.length == 0) return ApiRes('NotFound', HttpStatus.NOT_FOUND);
    
    return ApiRes('My Friends', HttpStatus.OK, friednds);
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

