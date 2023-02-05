import { IsNumber, IsString } from "class-validator";
import { User } from "src/utils/typeorm";

export class CreateUserDto {
    @IsString()
    context: string;

    @IsNumber()
    author: any;

    @IsNumber()
    recaption: User;
}
