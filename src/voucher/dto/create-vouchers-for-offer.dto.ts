import { IsString } from "class-validator";
import { CustomerEntity } from "src/cutomer/customer.entity";
import { OfferEntity } from "src/offer/offer.entity"

export class CreateVoucherForOfferDto {
    
    @IsString()
    offer: OfferEntity;

}