import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.model';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

// burada ekstra postgresql için gerekli paket olan typeorm modülü importluyoruz @module içerisinde typeorm.forfeature methodu ile 
//crud işlemlerini gerçekleştirebiliyormuşuz (User) entitysini alıp crud işlemlerini yaptırıyor
//https://docs.nestjs.com/techniques/database UsersModule içerisindeki kaynaktan aldım