import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { DeleteCustomerDto } from './dto/delete-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { VoucherEntity } from 'src/voucher/voucher.entity';
import { GetVouchersByEmailDto } from './dto/get-vouchers-by-email.dto';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async getAllCustomers(): Promise<CustomerEntity[]> {
    return await this.customerService.getCustomers();
  }

  @Post()
  async makeCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Patch('updateCustomer/:id')
  async updateCustomerById(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @Delete('/:id')
  async deleteCustomerById(
    @Param() deleteCustomerDto: DeleteCustomerDto,
  ): Promise<string> {
    return this.customerService.deleteCustomer(deleteCustomerDto);
  }

  @Patch('getVouchersByEmail')
  async getVouchersByEmail(
    @Body() getVouchersByEmailDto: GetVouchersByEmailDto,
  ): Promise<VoucherEntity[]> {
    return this.customerService.getVouchersForCustomer(getVouchersByEmailDto);
  }
}
