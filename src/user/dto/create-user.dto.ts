import { IsNumber, IsOptional, IsString } from "class-validator";
import { User } from "src/utils/typeorm";

export class CreateUserDto {

    @IsString()
    context: string;

    @IsOptional()
    @IsNumber()
    author: any;

    @IsNumber()
    recaption: number;

    @IsOptional()
    isReply: any;
}
 