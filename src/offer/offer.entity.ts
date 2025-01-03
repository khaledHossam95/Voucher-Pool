import { CustomerEntity } from 'src/cutomer/customer.entity';
import { VoucherEntity } from 'src/voucher/voucher.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OfferEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  discountPercentage: number;

  @OneToMany(() => VoucherEntity, (voucher) => voucher.offer)
  vouchers: VoucherEntity[];

  @ManyToMany(
    () => CustomerEntity,
    (customer) => customer.offers, //optional
    { cascade: true, onDelete: 'CASCADE' },
  )
  customers?: CustomerEntity[];
}
