import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteCustomerDto {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;
}
