import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferEntity } from './offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Controller('offers')
export class OfferController {
  constructor(private offerService: OfferService) {}

  @Get()
  async getAllOffers(): Promise<OfferEntity[]> {
    return this.offerService.getOffers();
  }

  @Post()
  async createOffer(
    @Body() createOfferDto: CreateOfferDto,
  ): Promise<OfferEntity> {
    return this.offerService.makeOffer(createOfferDto);
  }

  @Patch('/:id')
  async updateOfferById(
    @Param('id') id: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ): Promise<OfferEntity> {
    return this.offerService.updateOffer(id, updateOfferDto);
  }

  @Delete('/:id')
  async removeOfferById(@Param('id') id: string): Promise<string> {
    return this.offerService.removeOffer(id);
  }
}
