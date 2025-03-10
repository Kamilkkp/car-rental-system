import { Address } from './address.model';
import { Brand } from './brand.model';

export interface CreateVehicleDto {
  brand: string;
  registrationNumber: string;
  vin: string;
  isRented: boolean;
  address?: string;
}

export interface UpdateVehicleDto {
  brand?: string;
  registrationNumber?: string;
  vin?: string;
  isRented?: boolean;
  address?: string;
}

export interface PaginatedVehicles {
    data: Vehicle[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  }

export interface Vehicle {
  _id: string;
  brand: Brand;
  registrationNumber: string;
  vin: string;
  isRented: boolean;
  address: Address;
  createdAt: string;
  updatedAt: string;
}