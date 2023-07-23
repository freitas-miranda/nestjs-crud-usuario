import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senhaHash: string;

  @Column({ default: '123' })
  senhaSalt: string;

  @Column({ default: true })
  isActive: boolean;
}
