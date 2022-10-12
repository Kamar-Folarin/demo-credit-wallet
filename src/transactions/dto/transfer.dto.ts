import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TransferFundsDto {
  @ApiProperty()
  @IsString()
  fromAccount: string;

  @ApiProperty()
  @IsString()
  toAccount: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  receiverId: string;
}
