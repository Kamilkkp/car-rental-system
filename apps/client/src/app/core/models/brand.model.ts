export interface CreateBrandDto {
    name: string;
  }
  
  export interface UpdateBrandDto {
    name?: string;
  }
  
  export interface Brand extends CreateBrandDto {
    _id: string;
  }