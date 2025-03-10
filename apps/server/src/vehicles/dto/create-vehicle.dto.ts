import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  Length,
  IsMongoId,
  ValidateIf,
} from 'class-validator';

export class CreateVehicleDto {
  @IsMongoId()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsString()
  @Length(17, 17)
  vin: string;

  @IsBoolean()
  isRented: boolean;

  @ValidateIf(o => o.isRented)
  @IsMongoId()
  address?: string;
}