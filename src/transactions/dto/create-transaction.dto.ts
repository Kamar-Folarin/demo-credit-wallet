import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateTransactionsDto {
    @ApiProperty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsNumber()
    to: number;
}
