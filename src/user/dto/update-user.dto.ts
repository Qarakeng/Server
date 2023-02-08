import { IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    first_name: string;

    @IsOptional()
    @IsString()
    last_name: string;
     
    @IsOptional()
    @IsString()
    @MinLength(0)
    @MaxLength(52)
    bio: string;

    @IsOptional()
    avatar: string;

}
