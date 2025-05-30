import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeTransaction } from '../enum/typeTransaction.enum';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: TypeTransaction,
  })
  type: TypeTransaction;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
