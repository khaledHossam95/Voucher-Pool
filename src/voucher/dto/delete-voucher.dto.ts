import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class DeleteVoucherDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
