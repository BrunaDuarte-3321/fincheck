import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsHexColor,
} from 'class-validator';
import { BankAccount } from '../entities/BankAccount';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance: number;

  @IsNotEmpty()
  @IsEnum(BankAccount)
  type: BankAccount;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color: string;
}
