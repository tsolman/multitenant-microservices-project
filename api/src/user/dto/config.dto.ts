import { IsNumber } from 'class-validator';

export class ConfigDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  inputId: number;
}