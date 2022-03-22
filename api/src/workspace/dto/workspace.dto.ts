import { IsNumber, IsString } from 'class-validator';

export class WorkspaceDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}
