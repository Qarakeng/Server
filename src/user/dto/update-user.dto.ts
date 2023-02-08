import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

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
