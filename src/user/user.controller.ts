import { Controller, Get, Post, Delete, Body, Param, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RoleType } from './roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(RoleType.ADMIN, RoleType.USER)
  async findAll() {
    try {
      const users = await this.userService.findAll();
      console.log('Kullanıcı bulundu:', users); //kullanıcı bulundu mesajı döndürüyoruz debug 
      return users;
    } catch (error) {
      console.error('findAll methodu hata verdi:', error); 
      throw new InternalServerErrorException('kullanıcıları getirirken bir hata oluştu'); //metod çalışmazsa buradan debug döndürüyoruz
    } //diğerleri için de aynı debug logu düşürmek için try catch yapıyoruz 
  }

  @Post()
  @Roles(RoleType.ADMIN)
  async create(@Body() dto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(dto);
      console.log('Kullanıcı oluşturuldu:', user); 
      return user;
    } catch (error) {
      console.error('Kayıt oluşturma hata verdi:', error); 
      throw new InternalServerErrorException('Kullanıcı eklenirken bir hata oluştu');
    }
  }

  @Delete(':id')
  @Roles(RoleType.ADMIN)
  async delete(@Param('id') id: number) {
    try {
      const result = await this.userService.deleteUser(id);
      console.log('Kullanıcı silindi:', result); 
      return result;
    } catch (error) {
      console.error('Kayıt silme hata verdi:', error); 
      throw new InternalServerErrorException('Kullanıcı silinirken bir hata oluştu');
    }
  }

}

// öncekinden farklı olarak artık role denetimi var ve user rolü sadece get endpointini çalıştırabikliyorken
// admin rolü tüm endpointleri çalıştırabiliyor 

