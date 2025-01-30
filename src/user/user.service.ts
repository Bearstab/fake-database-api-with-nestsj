import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(
    name: string,
    email: string,
    age: number,
    address: string,
    role: string,
  ): Promise<User> {
    const newUser = this.userRepository.create({ name, email, age, address, role });
    return this.userRepository.save(newUser);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async deleteUser(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`${id} bu id ile ilgili bir kayıt bulunamadı`);
    }

    return `bu ${id}'deki kayıt silindi.`;
  }
}

// önceki yapıdan farklı olarak postgresql işlemlerini yapabilmek için typeorm yi importluyoruz

// fake database kullanmak yerine postgresql e geçtiğimiz için:
/*export class UserService {
  private users: User[] = []; // Fake database  yerine

   export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {} kullanıyoruz 
   

  Repository yapısı typeorm nin veritabanındaki entitylere erişmesi için kullanılan bir yapıymış ondan dolayı crud işlemlerini yapmak için
  kullanıyoruz 

  ai dan aldığım kısım:-------
  Repository Erişimi: NestJS'teki servislerde, veritabanı işlemlerini gerçekleştirmek için repository'e ihtiyacınız vardır. User entity'si üzerinde işlem yapabilmek için UserRepository'yi kullanmanız gerekir.
  Bağımlılık Enjeksiyonu (DI): @InjectRepository(User) ile, UserRepository'yi NestJS'in dependency injection sistemine dahil etmiş oluyorsunuz. NestJS, UserRepository'yi otomatik olarak constructor'a inject eder.
  Kodu Temiz ve Modüler Tutmak: Bağımlılığı constructor üzerinden inject ederek, sınıfın bağımlılıklarını açıkça belirlemiş oluyorsunuz ve sınıfın yönetimi daha modüler hale gelir. Bu sayede, bu repository'nin yönetimi NestJS'in sorumluluğuna verilmiş olur.
  */