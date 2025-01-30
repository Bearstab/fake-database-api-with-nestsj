import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'users',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UserModule,
  ],
})
export class AppModule {}


// postgresql kullanabilmemiz için typeorm modülünü importladık ve @module içerisinde oluşturduğumuz (users) database bilgilerini girdim
// local çalıştığından dolayı default port 5432