import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Employer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cnh: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  gender: string;

  @Column()
  position: string; //criar tabela separada

  @Column()
  departament: string; //criar tabela separada

  @Column({ type: 'date' })
  admissionDate: Date;

  @Column({ nullable: true })
  workSchedule: string; //criar tabela separada

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
