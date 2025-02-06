import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserRole } from './user/entities/user-role.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'denemev2',
      entities: [User, UserRole],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}

// postgresql kullanabilmemiz için typeorm modülünü importladık ve @module içerisinde oluşturduğumuz (denemev2) database bilgilerini girdim
// deneme olarak ayrı bir yerde database açtım ve oradaki tabloları ve verileri kullanmak için denemev2 database ini bağladım