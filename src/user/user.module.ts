import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRole])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

// burada ekstra postgresql için gerekli paket olan typeorm modülü importluyoruz @module içerisinde typeorm.forfeature methodu ile 
//crud işlemlerini gerçekleştirebiliyormuşuz (User) entitysini alıp crud işlemlerini yaptırıyor
//https://docs.nestjs.com/techniques/database UsersModule içerisindeki kaynaktan aldım