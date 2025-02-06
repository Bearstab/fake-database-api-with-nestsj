import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { UserRole } from './user-role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => UserRole, (userRole) => userRole.user, { eager: true }) //user tablosu ile user_role tablosu arasındaki yabancu anahtar ilişkisi buradan sağlanıyor
  userRole: UserRole;
}