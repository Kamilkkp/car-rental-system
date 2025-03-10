import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Brand, BrandDocument } from '../schemas/brand.schema';
import { Model } from 'mongoose';

@Injectable()
export class BrandsService implements OnApplicationBootstrap {
  constructor(@InjectModel(Brand.name) private brandModel: Model<BrandDocument>) {}

  async onApplicationBootstrap() {
    await this.seedBrands();
  }

  create(createBrandDto: CreateBrandDto): Promise<Brand> {
    const createdBrand = new this.brandModel(createBrandDto);
    return createdBrand.save();
  }

  findAll(): Promise<Brand[]> {
    return this.brandModel.find().exec();
  }

  update(id: string, updateBrandDto: UpdateBrandDto): Promise<Brand> {
    return this.brandModel.findByIdAndUpdate(
      id,
      updateBrandDto,
      { new: true },
    ).exec();
  }

  async remove(id: string) {
    return this.brandModel.findByIdAndDelete(id).exec();
  }

  private async seedBrands() {
    const defaultBrands = ['Toyota', 'Ford', 'BMW', 'Audi', 'Volkswagen'];

    const count = await this.brandModel.countDocuments();
    if (count > 0) return;

    await this.brandModel.insertMany(
      defaultBrands.map((name) => new this.brandModel({ name }))
    );

    console.log('loaded seeds.');
  }
}
