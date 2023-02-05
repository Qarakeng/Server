import { CACHE_MANAGER, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Cache} from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import SendMailer from 'src/utils/nodemailer';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiRes } from 'src/utils/payloadRes';
import { JwtPayload } from './util/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) 
    private readonly usersRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    const { email } = createAuthDto;
    const cachData = await this.cacheManager.get(email) || null;
    if (cachData == null){
      const randomCode: number = Math.floor(Math.random() * (99999 - 10000 + 1) + 10000);
      await SendMailer(email, randomCode);
      await this.cacheManager.set(email, { first_name: uuidv4(), email, code: randomCode }, { ttl: 90 });
      return ApiRes('code sent', HttpStatus.OK);
    }
    return ApiRes('code was sent 90s time', HttpStatus.BAD_REQUEST);
  }

  async checkCode(query: any) {
    const {email, code } = query
    const cachData: any =  await this.cacheManager.get(email) || null;
    if (cachData == null) {
      return ApiRes('code entry timed out!', HttpStatus.REQUEST_TIMEOUT);
    }
    if (Number(code) == Number(cachData['code'])){
      const userFind = await this.usersRepository.findOneBy({ email }) || null;
      if (!userFind){
        const newUser =  this.usersRepository.create({
          first_name: cachData['first_name'],
          email: cachData['email']
        });
        const data = await newUser.save();
        const payload: JwtPayload = { user_id: data.id, email }
        const accessToken: string = this.jwtService.sign(payload);
        return ApiRes('created accound', HttpStatus.OK, { accessToken });
      }
      const payload: JwtPayload = { user_id: userFind.id, email }
      const accessToken: string = this.jwtService.sign(payload);
      return ApiRes('created accound', HttpStatus.OK, { accessToken });
    } else {
      return ApiRes('The entered code is incorrect', HttpStatus.FORBIDDEN);
    }
  }
}
