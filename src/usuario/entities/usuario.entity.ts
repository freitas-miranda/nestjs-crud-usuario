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

  @Column()
  senhaSalt: string;

  @Column({ default: true })
  isActive: boolean;
}
