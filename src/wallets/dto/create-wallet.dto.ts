import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateWalletDto {
    @ApiProperty()
    @IsString()
    name: string;
}