import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { PortfolioStock } from 'src/portfolios/entities/portfolioStock.entity';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  ticker: string;

  @OneToMany(() => Order, (o) => o.stock)
  orders: Order[];

  @OneToMany(() => PortfolioStock, (ps) => ps.stock)
  portfoliosStock: PortfolioStock[];
}
