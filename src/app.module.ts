import { Module } from '@nestjs/common';

import { VoucherModule } from './voucher/voucher.module';
import { OfferModule } from './offer/offer.module';
import { CustomerModule } from './cutomer/customer.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    VoucherModule,
    OfferModule,
    CustomerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'c.ronaldo',
      database: 'Voucher-app',
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
})
export class AppModule {}
