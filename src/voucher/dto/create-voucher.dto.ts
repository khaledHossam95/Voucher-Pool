import { Transform } from 'class-transformer';
import { IsBoolean, IsDate, IsEmpty, IsOptional } from 'class-validator';
import { CustomerEntity } from 'src/cutomer/customer.entity';
import { OfferEntity } from 'src/offer/offer.entity';

//Ensure the data sent from controller layer is the same as the entity
export class CreateVoucherDto {
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : value), {
    toClassOnly: true,
  })
  @IsDate()
  dateOfUsage: Date;

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : value), {
    toClassOnly: true,
  })
  @IsDate()
  expirationDate: Date;

  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true, {
    toClassOnly: true,
  })
  @IsBoolean()
  isRedeemed: boolean;

  @IsOptional()
  customer: CustomerEntity;

  @IsOptional()
  offer: OfferEntity;
}
