import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VoucherEntity } from 'src/voucher/voucher.entity';
import { CustomerEntity } from 'src/cutomer/customer.entity';
import { OfferEntity } from './offer.entity';
import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { OfferRepository } from './offer.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([VoucherEntity, CustomerEntity, OfferEntity]),
  ],
  controllers: [OfferController],
  providers: [OfferService, OfferRepository],
  exports: [OfferService],
})
export class OfferModule {}
