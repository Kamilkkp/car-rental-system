import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address, AddressDocument } from '../schemas/address.schema';

@Injectable()
export class AddressesService {
  constructor(
    @InjectModel(Address.name) private addressModel: Model<Address>
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<AddressDocument> {
    const createdAddress = new this.addressModel({
      ...createAddressDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return createdAddress.save();
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.find().exec();
  }

  async findOne(id: string): Promise<Address> {
    return this.addressModel.findById(id).exec();
  }

  async update(
    id: string,
    updateAddressDto: UpdateAddressDto
  ): Promise<Address> {
    return this.addressModel
      .findByIdAndUpdate(
        id,
        {
          ...updateAddressDto,
          updatedAt: new Date(),
        },
        { new: true }
      )
      .exec();
  }

  async remove(id: string): Promise<Address> {
    return this.addressModel.findByIdAndDelete(id).exec();
  }
}
