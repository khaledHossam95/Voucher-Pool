import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { VoucherEntity } from 'src/voucher/voucher.entity';

export class CreateOfferDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'discountPercentage is required' })
  // @Transform(({ value }) => parseInt(value, 10))
  discountPercentage: number;

  @IsOptional()
  vouchers: VoucherEntity;
}
