import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoucherEntity } from './voucher.entity';
import { Repository } from 'typeorm';
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { UpdateVoucherDto } from './dto/update-voucher.dto';
import { CustomerEntity } from 'src/cutomer/customer.entity';
import { OfferEntity } from 'src/offer/offer.entity';

//Data Access Layer , use the stuff sent from the service and do transactions with database
@Injectable()
export class VoucherRepository {
  constructor(
    @InjectRepository(VoucherEntity)
    private readonly voucherEntityRepository: Repository<VoucherEntity>,
  ) {}

  async findAllVouchers(): Promise<VoucherEntity[]> {
    return this.voucherEntityRepository.find();
  }

  async findVoucherById(id: string): Promise<VoucherEntity> {
    const found = await this.voucherEntityRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async insertVoucher(
    isRedeemed: boolean,
    dateOfUsage: Date,
    customer: CustomerEntity,
    offer: OfferEntity,
  ): Promise<VoucherEntity> {
    //needs to be iniatlizied to invoke the @Beforeinsert Hook , and then save it
    //if the values are not defined , create will use the default value
    const created = this.voucherEntityRepository.create({
      isRedeemed,
      dateOfUsage,
      customer,
      offer,
    });
    const saved = await this.voucherEntityRepository.save(created);
    return saved;
  }

  async insertVouchersForOffer(
    offer: OfferEntity,
    customer: CustomerEntity,
  ): Promise<VoucherEntity> {
    const createVoucher = await this.voucherEntityRepository.create({
      customer,
      offer,
    });
    return this.voucherEntityRepository.save(createVoucher);
  }

  async updateVoucherById(
    id: string,
    updateData: Partial<VoucherEntity>,
  ): Promise<VoucherEntity> {
    const voucher = await this.findVoucherById(id);
    Object.assign(voucher, updateData);
    return this.voucherEntityRepository.save(voucher);
  }

  async deleteVoucher(id: string): Promise<void> {
    await this.voucherEntityRepository.delete(id);
  }

  //   async findAllwithfilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
  //     const { status, search } = filterDto;
  //     const query = this.taskEntityRepository.createQueryBuilder('task');

  //     if (status) {
  //       query.andWhere('task.status = :status', { status });
  //     }

  //     if (search) {
  //       query.andWhere(
  //         'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
  //         { search: `%${search}%` },
  //       );
  //     }

  //     const tasks = await query.getMany();
  //     return tasks;
  //   }

  //   async deleteById(id: string): Promise<void> {
  //     const result = await this.taskEntityRepository.delete(id);

  //     if (result.affected === 0) {
  //       throw new NotFoundException(`Task with ID "${id}" not found`);
  //     }
  //   }

  //   async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  //     const task = await this.findById(id);

  //     task.status = status;
  //     await this.taskEntityRepository.save(task);

  //     return task;
  //   }
}
