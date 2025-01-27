import { Module } from '@nestjs/common';
import { UserService } from './user.service'; //user klasöründen çekiliyor
import { UserController } from './user.controller'; 

@Module({
  controllers: [UserController], //api uç nokta tanımlama 
  providers: [UserService], //Servisler 
})
export class UserModule {}