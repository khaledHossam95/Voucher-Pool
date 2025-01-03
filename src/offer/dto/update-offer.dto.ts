import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CustomerEntity } from 'src/cutomer/customer.entity';
import { VoucherEntity } from 'src/voucher/voucher.entity';

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty({ message: 'discountPercentage is required' })
  @Transform(({ value }) => parseInt(value, 10))
  discountPercentage: number;

  @IsOptional()
  vouchers: VoucherEntity;

  @IsOptional()
  customers: CustomerEntity;
}
