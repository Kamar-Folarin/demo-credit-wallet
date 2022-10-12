import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class WithdrawFundsDto {
    @ApiProperty()
    @IsString()
    fromAccount: string;
    
    @ApiProperty()
    @IsNumber()
    amount: number;
    
}