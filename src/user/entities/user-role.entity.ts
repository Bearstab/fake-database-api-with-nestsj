import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { RoleType } from '../roles.enum';

@Entity()
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleType })
  role: RoleType;
  
  @ManyToOne(() => User, (user) => user.userRole) //user tablosu ile user_role tablosu arasındaki yabancu anahtar ilişkisi buradan sağlanıyor
  user: User;


  /*@OneToOne(() => User) ÇALIŞMAYAN METHOD
  @JoinColumn()
  user: User;*/
}