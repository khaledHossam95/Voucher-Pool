import { OfferEntity } from 'src/offer/offer.entity';
import { VoucherEntity } from 'src/voucher/voucher.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => VoucherEntity, (voucher) => voucher.customer)
  vouchers: VoucherEntity[];

  @ManyToMany(
    () => OfferEntity,
    (offer) => offer.customers, //optional
  )
  @JoinTable({
    name: 'customer_offer',
    joinColumn: {
      name: 'customer_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'offer_id',
      referencedColumnName: 'id',
    },
  })
  offers?: OfferEntity[];
}
