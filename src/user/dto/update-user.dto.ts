import { IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateProfileDto {
    @IsString()
    username: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;
     
    @IsString()
    @MinLength(0)
    @MaxLength(52)
    bio: string;

    @IsOptional()
    avatar: string;

}
