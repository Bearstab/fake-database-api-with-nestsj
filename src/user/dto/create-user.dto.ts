import { RoleType } from '../roles.enum';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  username: string;
  password: string;
  email: string;
  
  @IsString()
  @IsNotEmpty()
  role: RoleType;
}
//veri transfer objesi