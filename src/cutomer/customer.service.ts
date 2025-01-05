import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DeleteCustomerDto } from './dto/delete-customer.dto';
import { GetVouchersByEmailDto } from './dto/get-vouchers-by-email.dto';
import { VoucherEntity } from 'src/voucher/voucher.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepoistory: Repository<CustomerEntity>,
    private customerRepo: CustomerRepository,
  ) {}

  async getCustomers(): Promise<CustomerEntity[]> {
    return this.customerRepo.findCustomers();
  }

  async createCustomer(
    createCustomerDto: CreateCustomerDto,
  ): Promise<CustomerEntity> {
    const { name, email } = createCustomerDto;
    return await this.customerRepo.insertCustomer(name, email);
  }

  async updateCustomer(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<CustomerEntity> {
    const { name, email } = updateCustomerDto;
    return await this.customerRepo.updateCustomer(id, name, email);
  }

  async deleteCustomer(deleteCustomerDto: DeleteCustomerDto): Promise<string> {
    await this.customerRepo.deleteCustomer(deleteCustomerDto.id);
    return 'Customer deleted Successfully';
  }

  async getVouchersForCustomer(
    getVouchersByEmailDto: GetVouchersByEmailDto,
  ): Promise<VoucherEntity[]> {
    const email = getVouchersByEmailDto.email;
    const vouchers: VoucherEntity[] = [];
    const customer = await this.customerRepoistory.findOneOrFail({
      where: { email: email },
      relations: ['vouchers'],
    });
    for (const voucher of customer.vouchers) {
      if (!voucher.isRedeemed) {
        vouchers.push(voucher);
      }
    }
    return vouchers;
  }
}
