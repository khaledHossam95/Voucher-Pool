import { Injectable, NotFoundException } from '@nestjs/common';
import { OfferEntity } from './offer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// @Injectable()
export class OfferRepository extends Repository<OfferEntity> {
  
  async findAllOffers(): Promise<OfferEntity[]> {
    return this.find();
  }

  async findOfferById(id: string): Promise<OfferEntity> {
    const offer = await this.findOneBy({ id: id });
    if (!offer) {
      throw new NotFoundException(`Offer with ID:${id} was not found`);
    }
    return offer;
  }

  async insertOffer(
    name: string,
    discountPercentage: number,
  ): Promise<OfferEntity> {
    const createOffer = this.create({
      name,
      discountPercentage,
    });
    const saveOffer = await this.save(createOffer);
    return saveOffer;
  }

  async updateOfferById(
    id: string,
    updateData: Partial<OfferEntity>,
  ): Promise<OfferEntity> {
    const offer = await this.findOfferById(id);

    await this.update(offer.id, updateData); //this doesn't return entity , so you will need to hit database again to get it if you want to return it in response

    return offer;
  }

  async deleteOffer(id: string): Promise<string> {
    await this.delete(id);
    return 'Offer Deleted';
  }
}
