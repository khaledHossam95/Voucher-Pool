import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RedeemVoucherDto {
  
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
//   @IsEmail()
  email: string;
}
