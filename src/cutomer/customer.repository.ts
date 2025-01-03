import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly CustomerEntityRepository: Repository<CustomerEntity>,
  ) {}

  async findCustomers(): Promise<CustomerEntity[]> {
    return await this.CustomerEntityRepository.find();
  }

  async findCustomersById(id: string): Promise<CustomerEntity> {
    const found = await this.CustomerEntityRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException(`Customer with ID:${id} was not found`);
    }
    return found;
  }

  async insertCustomer(name: string, email: string): Promise<CustomerEntity> {
    const customer = await this.CustomerEntityRepository.create({
      name,
      email,
    });
    const customerSaved = await this.CustomerEntityRepository.save(customer);
    return customerSaved;
  }

  async updateCustomer(
    id: string,
    name: string,
    email: string,
  ): Promise<CustomerEntity> {
    const found = await this.findCustomersById(id);
    await this.CustomerEntityRepository.update(found.id, {
      name,
      email,
    });
    Object.assign(found, { name, email }); //instead of hitting database , update the entity manual to be sent for response
    return found;
  }

  async deleteCustomer(id: string): Promise<string> {
    await this.findCustomersById(id);
    await this.CustomerEntityRepository.delete(id);
    return 'Customer Deleted Successfully';
  }
}
