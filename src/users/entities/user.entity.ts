import { Order } from 'src/orders/entities/order.entity';
import { Portfolio } from 'src/portfolios/entities/portfolio.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rut: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Transaction, (t) => t.user)
  transactions: Transaction[];

  @OneToMany(() => Order, (o) => o.user)
  orders: Order[];

  @OneToOne(() => Portfolio, (p) => p.user)
  portfolio: Portfolio;
}
