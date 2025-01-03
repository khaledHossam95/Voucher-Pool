import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';
import { CustomerEntity } from 'src/cutomer/customer.entity';
import { OfferEntity } from 'src/offer/offer.entity';

export class UpdateVoucherDto {
  
  @IsOptional()
  @IsBoolean()
  isRedeemed: boolean;

  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsDate()
  expirationDate: Date;

  @IsOptional()
  customer: CustomerEntity;

  @IsOptional()
  offer: OfferEntity;
}
