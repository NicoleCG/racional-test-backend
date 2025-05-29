import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { OrdersModule } from './orders/orders.module';
import { PortfoliosModule } from './portfolios/portfolios.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.ejemplo.env',
      isGlobal: true,
    }),
    UsersModule,
    TransactionsModule,
    OrdersModule,
    PortfoliosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
