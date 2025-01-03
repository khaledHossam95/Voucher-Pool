import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerEntity } from './customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerRepository } from './customer.repository';
import { VoucherEntity } from 'src/voucher/voucher.entity';
import { OfferEntity } from 'src/offer/offer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity, VoucherEntity, OfferEntity]),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
