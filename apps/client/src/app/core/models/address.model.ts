export interface CreateAddressDto {
    name: string;
    surname: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
    email: string;
  }
  
  export interface UpdateAddressDto {
    name?: string;
    surname?: string;
    street?: string;
    city?: string;
    zipCode?: string;
    country?: string;
    email?: string;
  }
  
  export interface Address extends CreateAddressDto {
    _id: string;
    createdAt: string;
    updatedAt: string;
  }