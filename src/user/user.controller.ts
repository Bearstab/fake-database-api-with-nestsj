import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service'; //servis 
import { User } from './user.model'; //model 

@Controller('users') //kullanıcı işlemleri kontroller sınıfı
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get() //tüm kullanıcıları listeliyor 
  getAllUsers(): User[] {
    return this.userService.getAllUsers();
  }

  @Post() //Kullanıcı eklemeye yarıyor kullanıcı adı- ve email- verisi alıyorr
  createUser(
    @Body('name') name: string,
    @Body('email') email: string,
  ): User {
    return this.userService.createUser(name, email);
  }


  @Delete(':id') //kullanıcı silmeye yarıyor localhost:PORT/users/id adresi ile çalıoşıyor 
  deleteUser(@Param('id') id: string): string {
    const parsedId = parseInt(id, 10); 
    return this.userService.deleteUser(parsedId);
  }
}