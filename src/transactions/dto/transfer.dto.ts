import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TransferFundsDto {
  @ApiProperty()
  @IsNumber()
  to: string;

  @ApiProperty()
  @IsNumber()
  amount: number;
}
