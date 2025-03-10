import {
    IsString,
    IsNotEmpty,
    IsEmail,
  } from 'class-validator';
  
  export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsString()
    @IsNotEmpty()
    surname: string;
  
    @IsString()
    @IsNotEmpty()
    street: string;
  
    @IsString()
    @IsNotEmpty()
    city: string;
  
    @IsString()
    @IsNotEmpty()
    zipCode: string;
  
    @IsString()
    @IsNotEmpty()
    country: string;
  
    @IsEmail()
    email: string;
  }