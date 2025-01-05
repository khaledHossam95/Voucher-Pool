import { BadRequestException, Injectable } from '@nestjs/common';
import { VoucherRepository } from './voucher.repository';
import { VoucherEntity } from './voucher.entity';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { DeleteVoucherDto } from './dto/delete-voucher.dto';
import { OfferService } from 'src/offer/offer.service';

import { CustomerRepository } from 'src/cutomer/customer.repository';
import { CreateVoucherForOfferDto } from './dto/create-vouchers-for-offer.dto';
import { RedeemVoucherDto } from './dto/redeem-voucher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

//Deconsturct DTOs and form data to be query from database , or form data retrived from database
@Injectable()
export class VoucherService {
  constructor(
    @InjectRepository(VoucherEntity)
    private voucherRepository: Repository<VoucherEntity>, //for normal repo methods
    private voucherRepo: VoucherRepository, //for the custom repo methods 
    private customerRepo: CustomerRepository, //best practice to use service instead
    private offerService: OfferService,
  ) {}

  async getVouchers(): Promise<VoucherEntity[]> {
    return this.voucherRepo.findAllVouchers();
  }

  async makeVoucher(
    createVoucherDto: CreateVoucherDto,
  ): Promise<VoucherEntity> {
    const { isRedeemed, dateOfUsage, customer, offer } = createVoucherDto;
    const voucher = await this.voucherRepo.insertVoucher(
      isRedeemed,
      dateOfUsage,
      customer,
      offer,
    );
    //add checks for customer and offer for exception response
    return voucher;
  }

  async updateVoucher(
    id: string,
    updateVoucherDto: UpdateVoucherDto,
  ): Promise<VoucherEntity> {
    const { code, expirationDate, isRedeemed } = updateVoucherDto;

    if (expirationDate && new Date(expirationDate) < new Date()) {
      throw new BadRequestException('Expiration date cannot be in the past');
    }
    const updateData = { code, expirationDate, isRedeemed };
    return this.voucherRepo.updateVoucherById(id, updateData);
  }

  async removeVoucher(deleteVoucherDto: DeleteVoucherDto): Promise<string> {
    await this.voucherRepo.findVoucherById(deleteVoucherDto.id);
    await this.voucherRepo.deleteVoucher(deleteVoucherDto.id);
    return `Voucher with ID "${deleteVoucherDto.id}" has been deleted successfully.`;
  }

  async makeVouchersByOffer(
    createVoucherForOfferDto: CreateVoucherForOfferDto,
  ): Promise<VoucherEntity[]> {
    const offer = createVoucherForOfferDto.offer;
    const customers = await this.customerRepo.findCustomers();
    const vouchersCreated: VoucherEntity[] = [];
    for (const customer of customers) {
      const voucher = await this.voucherRepo.insertVouchersForOffer(
        offer,
        customer,
      );
      vouchersCreated.push(voucher);
    }
    return vouchersCreated;
  }

  async makeVouchersByOfferForCustomers(
    createVoucherForOfferDto: CreateVoucherForOfferDto,
  ): Promise<VoucherEntity[]> {
    const offer = createVoucherForOfferDto.offer;
    const customers = await this.offerService.createVouchersForOffer(offer.id);
    const vouchersCreated: VoucherEntity[] = [];
    for (const customer of customers) {
      const voucher = await this.voucherRepo.insertVouchersForOffer(
        offer,
        customer,
      );
      vouchersCreated.push(voucher);
    }
    return vouchersCreated;
  }

  async redeemVoucher(redeemVoucherDto: RedeemVoucherDto): Promise<string> {
    const { code, email } = redeemVoucherDto;
    const voucher = await this.voucherRepository.findOneOrFail({
      where: {
        code: code,
        customer: {
          email: email,
        },
      },
      relations: ['customer'], // because of lazy loading
    });
    if (voucher.isRedeemed) {
      throw new BadRequestException('Voucher already redeemed !');
    } else {
      voucher.isRedeemed = true;
      voucher.dateOfUsage = new Date();
    }
    await this.voucherRepo.updateVoucherById(voucher.id, voucher);
    return `Voucher Redeemed ! Discount value :"${voucher.offer.discountPercentage}"`;
  }

  
}
