import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VoucherEntity } from './voucher.entity';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { VoucherRepository } from './voucher.repository';
import { OfferEntity } from 'src/offer/offer.entity';
import { CustomerEntity } from 'src/cutomer/customer.entity';
import { OfferRepository } from 'src/offer/offer.repository';
import { CustomerRepository } from 'src/cutomer/customer.repository';
import { OfferModule } from 'src/offer/offer.module';
import { CustomerModule } from 'src/cutomer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoucherEntity, OfferEntity, CustomerEntity]),
    OfferModule,
    CustomerModule,
  ],
  controllers: [VoucherController],
  providers: [
    VoucherService,
    VoucherRepository,
    OfferRepository,
    CustomerRepository,
  ],
})
export class VoucherModule {}
