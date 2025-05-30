import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeOrder } from '../enum/typeOrder.enum';
import { Stock } from './stocks.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column({
    type: 'enum',
    enum: TypeOrder,
  })
  type: TypeOrder;

  @Column()
  date: Date;

  @Column()
  price: number;

  @ManyToOne(() => Stock)
  @JoinColumn({ name: 'stockId' })
  stock: Stock;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;
}
