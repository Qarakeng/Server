import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiRes } from 'src/utils/payloadRes';
import { Messages, User } from 'src/utils/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateMessageDto } from '../dto/message/update.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Messages) 
    private readonly MessageRepository: Repository<Messages>,
    @InjectRepository(User) 
    private readonly UserRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto, user: User) {
    createUserDto.author = user;
    const findRecipient = await this.UserRepository.findOneBy({ 
        id: createUserDto.recaption
    });
    
    const newMessage = this.MessageRepository.create({
      context: createUserDto.context,
      author: createUserDto.author,
      recipient: findRecipient,
      isReply: createUserDto.isReply || null,
    });

    return newMessage.save();
  }

  async GetAllMessage (user: User, query: any) {
    const page = query.page || 1;
    const recaptionId = query.recipientId;
    const skip = (page - 1) * 30;

    const [findMessage, total] = await this.MessageRepository.findAndCount({
      relations: {
        recipient: true,
        author: true
      },
        where: [
            { authorId: user['id'], recipientId: parseInt(recaptionId) },
            { authorId: parseInt(recaptionId), recipientId: user['id'] }
        ],
        order: { 'createdAt': 'DESC' },
        take: 30,
        skip
    }) || null;


    if (findMessage == null){
      return ApiRes('Not Found Message', HttpStatus.NOT_FOUND);
    }    

    return ApiRes('Found Message', HttpStatus.OK, {data: findMessage, total});
  }
  
  async UpdateMessage (updateDto: UpdateMessageDto, user: User) {
    const MessageBy = await this.MessageRepository.findOneBy({ 
      authorId: user['id'], 
      id: updateDto.message_id 
    }) || null;

    if (MessageBy == null) {
      return ApiRes('Not Fund Messages', HttpStatus.OK);
    }
    const a = await this.MessageRepository.update(MessageBy.id, {
      context: updateDto.context
    });
  
    return ApiRes('Updated Message', HttpStatus.OK);
  }

  async DeleteMessage (message_id: Messages['id'], user: User) {

    const MessageBy = await this.MessageRepository.findOneBy({ 
      authorId: user['id'], 
      id: message_id 
    }) || null;

    if (MessageBy == null) {
      return ApiRes('Not Fund Messages', HttpStatus.OK);
    }
    await this.MessageRepository.delete(MessageBy.id);
    return ApiRes('Deleted Message', HttpStatus.OK);
  }

}