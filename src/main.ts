import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import { RoleType } from './user/roles.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}

bootstrap();

//İLK KAYIT 
/*const userService = app.get(UserService)
const adminUser: CreateUserDto = {
  username: 'testUser',
  password: 'test123',
  email: 'test@example.com',
  role: RoleType.ADMIN,
};
await userService.createUser(testUser);*/