import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PortfolioStock } from './portfolioStock.entity';

@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  riskLevel: number;

  @Column()
  name: string;

  @Column()
  balance: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => PortfolioStock, (ps) => ps.portfolio)
  portfoliosStock: PortfolioStock[];
}
