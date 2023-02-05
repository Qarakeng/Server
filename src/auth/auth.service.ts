import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Cache} from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import SendMailer from 'src/utils/nodemailer';
import { Users } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiRes } from 'src/utils/payloadRes';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) 
    private readonly usersRepository: Repository<Users>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    const { email } = createAuthDto;
    const cachData = await this.cacheManager.get(email) || null;
    if (cachData == null){
      const randomCode: number = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
      await SendMailer(email, randomCode);
      await this.cacheManager.set(email, { first_name: uuidv4(), email, code: randomCode }, { ttl: 60 });
      return ApiRes('code sent', HttpStatus.OK);
    }
    return ApiRes('code was sent 60s time', HttpStatus.BAD_REQUEST);
  }

  async checkCode(query: any) {
    console.log(query)
    const {email, code } = query
    const cachData: any =  await this.cacheManager.get(email) || null;
    if (cachData == null) {
      return ApiRes('code entry timed out!', HttpStatus.REQUEST_TIMEOUT);
    }
    if (Number(code) == Number(cachData['code'])){
      const userFind = await this.usersRepository.findOneBy({ email });
      if (!userFind){
        const newUser =  this.usersRepository.create({
          first_name: cachData['first_name'],
          email: cachData['email']
        });
        await newUser.save();
      }
      return ApiRes('created accound', HttpStatus.OK, userFind);
    } else {
      return ApiRes('The entered code is incorrect', HttpStatus.FORBIDDEN);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
