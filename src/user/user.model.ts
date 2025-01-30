import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  address: string;

  @Column()
  role: string;
}

// öncekinden farklı olarak typeorm bileşenlerini importladık üstde @entity ile tablo columnlarına gelecek olan verileri yazdım biçimleri ile birlikte

// ekstra yaşı adresi ve rol entitylerini ekledim

// @PrimaryGeneratedColumn() kısmı id yi birincil anahtar ve otomatik artan bir değer almasını sağlıyormuş onu ekledim bu da:
/*export declare function PrimaryGeneratedColumn(): PropertyDecorator;
* Column decorator is used to mark a specific class property as a table column. dan geliyor*/