import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle, VehicleDocument } from '../schemas/vehicle.schema';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
  ) {}

  async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    const createdVehicle = new this.vehicleModel({
      ...createVehicleDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return createdVehicle.save();
  }

  async findAll(
    page:number,
    limit:number,
  ): Promise<{
    data: Vehicle[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  }> {
    const validatedPage = Math.max(1, page);
    const validatedLimit = Math.min(Math.max(1, limit), 100);

    const skip = (validatedPage - 1) * validatedLimit;
    
    const [data, totalItems] = await Promise.all([
      this.vehicleModel.find()
        .skip(skip)
        .limit(validatedLimit)
        .populate('brand')
        .populate('address')
        .exec(),
      this.vehicleModel.countDocuments().exec()
    ]);

    const totalPages = Math.ceil(totalItems / validatedLimit);

    return {
      data,
      totalItems,
      totalPages,
      currentPage: validatedPage,
      itemsPerPage: validatedLimit
    };
  }

  async findOne(id: string): Promise<Vehicle> {
    return this.vehicleModel.findById(id)
      .populate('brand')
      .populate('address')
      .exec();
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    if(updateVehicleDto.isRented === false) updateVehicleDto.address=null;

    return this.vehicleModel.findByIdAndUpdate(
      id,
      {
        ...updateVehicleDto,
        updatedAt: new Date(),
      },
      { new: true }
    )
      .populate('brand')
      .populate('address')
      .exec();
  }

  async remove(id: string): Promise<Vehicle> {
    return this.vehicleModel.findByIdAndDelete(id).exec();
  }
}