import { IsNumber, IsString } from "class-validator";
import { Messages } from "src/utils/typeorm";

export class UpdateMessageDto {
    @IsNumber()
    message_id: Messages['id']

    @IsString()
    context: string;
}
 