import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { VoucherEntity } from './voucher.entity';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { DeleteVoucherDto } from './dto/delete-voucher.dto';
import { CreateVoucherForOfferDto } from './dto/create-vouchers-for-offer.dto';

//Take the request and pass it to dto , to make sure its validated and then send it to service to be queryed or do any service on it
@Controller('vouchers')
export class VoucherController {
  constructor(private voucherService: VoucherService) {}

  @Get()
  async getAllVouchers(): Promise<VoucherEntity[]> {
    return this.voucherService.getVouchers();
  }

  @Post()
  async createVoucher(
    @Body() createVoucherDto: CreateVoucherDto,
  ): Promise<VoucherEntity> {
    const reponse = await this.voucherService.makeVoucher(createVoucherDto);
    return reponse;
  }

  @Patch('/:id')
  async updateVoucherById(
    @Param('id') id: string,
    @Body() updateVoucherDto: UpdateVoucherDto,
  ): Promise<VoucherEntity> {
    return this.voucherService.updateVoucher(id, updateVoucherDto);
  }

  @Delete('/:id')
  async removeVoucherById(
    @Param() deleteVoucherDto: DeleteVoucherDto, //Dto needs to be passed all params not a specific param like ('id')
  ): Promise<string> {
    return this.voucherService.removeVoucher(deleteVoucherDto);
  }

  @Post('makeVouchersForOffer')
  async makeVouchersForOffer(
    @Body() createVoucherForOfferDto: CreateVoucherForOfferDto,
  ): Promise<VoucherEntity[]> {
    return this.voucherService.makeVouchersByOfferForCustomers(
      createVoucherForOfferDto,
    );
  }
}
