import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { RoleType } from '../user/roles.enum';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User) {
    if (!user.userRole) {
      throw new Error('Kullanıcı rolü bulunamadı');
    }
  
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.userRole.role 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}