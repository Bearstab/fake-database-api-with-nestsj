import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('age') age: number,
    @Body('address') address: string,
    @Body('role') role: string,
  ): Promise<User> {
    return this.userService.createUser(name, email, age, address, role);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    const parsedId = parseInt(id, 10);
    return this.userService.deleteUser(parsedId);
  }
}

// öncekinden farklı olarak user create lerken async yapmamız için promise<User> döndürmemiz gerekliymiş @Get kısmında blok değiştirildi

// getAllUsers methoduna geri döndürüyoruz bir değişiklik yok

// @post kısmında createUser'ı async bir şekilde çalıştırmam gerekti NestJs de veritabanı işlemleri async çalışıyormuş diğer sıradaki
//işlemleri yormaması için async veya await kullanılıyormuş async kullandım ekstra @body ile entityleri tanımlıyoruz başka ekstra bir şey yok

// @delete kısmında da aynı şekilde async çalıştırıyoruz bir sql işlemi gerçekleştiği için yine promise<> yapısı ile parselanan id yi methode döndürüyoruz

