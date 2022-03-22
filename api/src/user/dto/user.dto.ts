import { IsNumber, IsString } from 'class-validator';
import { UserRole } from '../types';

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  last_name: string;

  @IsString()
  role: UserRole;
}
