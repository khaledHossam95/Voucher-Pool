import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CustomerEntity } from './customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DeleteCustomerDto } from './dto/delete-customer.dto';

@Injectable()
export class CustomerService {
  constructor(private customerRepo: CustomerRepository) {}

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
}
