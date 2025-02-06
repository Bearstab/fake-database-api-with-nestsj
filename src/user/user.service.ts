import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(UserRole) private roleRepo: Repository<UserRole>,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { username },
      relations: ['userRole'], 
    });
  
    if (!user) return null;
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  async createUser(dto: CreateUserDto) {
    const existing = await this.userRepo.findOne({ 
      where: [{ username: dto.username }, { email: dto.email }] 
    });
    if (existing) throw new ConflictException('Kullanıcı hali hazırda mevcut');

    const user = this.userRepo.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10), //kullanıcının şifresini burada hashliyoruz veritabanına hashlenerek kaydediliyorr
    });
    
    const savedUser = await this.userRepo.save(user);
    await this.roleRepo.save({ role: dto.role, user: savedUser });
    
    return savedUser;
  }

  async findAll() {
    return this.userRepo.find({ relations: ['userRole'] });
  }

  

  async deleteUser(id: number) {
    const user = await this.userRepo.findOne({ where: { id }, relations: ['userRole'] });
    if (!user) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }

    
    await this.roleRepo.delete({ user: { id: user.id } }); // Önce user_role tablosundaki ilgili kayıtları siliyoruz ki yabancı anahtar ile 
    //bağlı olduğu için iki yerden kayıt silmeden önce buradan siliyoruz
    
    const result = await this.userRepo.delete(id); // Sonra buradaki tablodan siliyoruz
    return result;
  }



  //ESKİ METHOD
  /*async deleteUser(id: number) {   
    const result = await this.userRepo.delete(id);
    return result;
  }*/
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