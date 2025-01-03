import { Injectable } from '@nestjs/common';
import { OfferRepository } from './offer.repository';
import { OfferEntity } from './offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CustomerEntity } from 'src/cutomer/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(OfferEntity)
    private offerRepo: OfferRepository,
  ) {}

  async getOffers(): Promise<OfferEntity[]> {
    return this.offerRepo.findAllOffers();
  }

  async makeOffer(createOfferDto: CreateOfferDto): Promise<OfferEntity> {
    const { name, discountPercentage } = createOfferDto;
    const voucher = await this.offerRepo.insertOffer(name, discountPercentage);
    return voucher;
  }

  async updateOffer(
    id: string,
    updateOfferDto: UpdateOfferDto,
  ): Promise<OfferEntity> {
    const { name, discountPercentage } = updateOfferDto;
    const updateData = { name, discountPercentage };
    try {
      return this.offerRepo.updateOfferById(id, updateData);
    } catch (error) {
      throw error;
    }
  }

  async removeOffer(id: string): Promise<string> {
    await this.offerRepo.findOfferById(id);
    await this.offerRepo.deleteOffer(id);
    return 'Offer is successfully deleted';
  }

  async createVouchersForOffer(id: string): Promise<CustomerEntity[]> {
    const offer = await this.offerRepo.findOneOrFail({
      where: { id: id },
      relations: { customers: true },
    });
    return offer.customers;
  }
}
