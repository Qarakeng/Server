import { IsEmail } from "class-validator";

export class CreateAuthDto {
    @IsEmail()
    email: string;
}
