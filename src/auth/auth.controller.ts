import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtStrategy } from './jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    console.log('Login attempt for:', username); //debug logunu tutuyorum login credentials bilgilerini görmek için
    const user = await this.userService.validateUser(username, password);
  
    if (!user) {
      console.log('Invalid credentials for:', username); //yanlış bilgiler girerse buradan debug yolluyorum
      throw new UnauthorizedException('Invalid credentials');
    }
  
    console.log('User found:', user); // Tüm user objesini incele
    //return this.jwtStrategy.validate(user); Jwt strategy den çekiyordum önceden tam olarak istediğimi yapmadı tekrardan authservice'den döndürdüm 
    return this.authService.login(user);
  }
}