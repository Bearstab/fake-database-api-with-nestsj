import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { User } from './user.model';

@Injectable()
export class UserService {
  private users: User[] = []; // Fake database

  constructor() {
    this.loadUsers(); // Uygulama başlatıldığında verileri yükle
  }

  // JSON dosyasından kullanıcıları yükle
  private loadUsers() {
    try {
      const data = fs.readFileSync('users.json', 'utf-8');
      this.users = JSON.parse(data); // json dosyasından veri okuma
    } catch (error) {
      this.users = []; // Dosya yoksa yeni bir kullanıcı listesi oluştur
    }
  }

  // Kullanıcıları JSON dosyasına kaydet users.json a kaydetme bölümü 
  private saveUsers() {
    fs.writeFileSync('users.json', JSON.stringify(this.users, null, 2)); // json dosyasına veriyi yazdırma
  }

  // Yeni kullanıcı oluştur ve diziye ekle
  createUser(name: string, email: string): User { //POST bölümü aldığı parametreler ile yeni kullanıcı postluyor
    const newUser: User = {
      id: Date.now(), // ID
      name,
      email,
    };
    this.users.push(newUser); // user listesine ekleme bölümü
    this.saveUsers(); // json dosyasına kaydetme bölümü
    return newUser; // kullanıcıyı returnla
  }

  // GET bölümü, Tüm kullanıcıları listele
  getAllUsers(): User[] {
    return this.users;
  }

  // DELETE bölümü Kullanıcıyı id'ye göre siliyor
  deleteUser(id: number): string {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`); // try catch 
    }

    this.users.splice(index, 1); // Kullanıcıyı sil
    this.saveUsers(); // Güncellenen kullanıcı listesini JSON dosyasına kaydetme bölümü users.json a kaydediiyor
    return `User with id ${id} deleted successfully.`; // tebrikler sildin
  }
}
