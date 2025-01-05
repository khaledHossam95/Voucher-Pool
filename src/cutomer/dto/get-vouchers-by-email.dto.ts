import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GetVouchersByEmailDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
