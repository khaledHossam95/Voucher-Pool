import { CustomerEntity } from 'src/cutomer/customer.entity';
import { OfferEntity } from 'src/offer/offer.entity';
import { generateUniqueCode } from 'src/util/generate-unique-code';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  RelationId,
} from 'typeorm';

@Entity()
export class VoucherEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @Generated('uuid')
  // Didn't use uuid library because it can't generate just 8 char , so i will have to slice it and that could make the code not unique.
  @Column({ unique: true }) //length: 8 didn't work because of generated : 'uuid' as its 32 char.
  code: string;

  @BeforeInsert()
  async generateCode(): Promise<void> {
    const code = generateUniqueCode(8);
    this.code = code;
  }

  @Column({ type: 'timestamp', nullable: true })
  dateOfUsage: Date;

  @Column({ default: false })
  isRedeemed: boolean;

  @Column({
    type: 'timestamp',
    default: () => `CURRENT_TIMESTAMP + INTERVAL '14 days'`,
    nullable: false,
  })
  expirationDate: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.vouchers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  customer: CustomerEntity;

  @RelationId((voucher: VoucherEntity) => voucher.customer) //this makes the id ONLY to be visible , without the need to make eager=true  , and if you want the entity you can access it through field cutomer
  customerId: string;

  @ManyToOne(() => OfferEntity, (offer) => offer.vouchers, {
    eager: true, //this goes against lazy loading , and loads the fk entity even without its accessed so you don't need to define in queryies the relations options to load them anymore
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  offer: OfferEntity;
}
