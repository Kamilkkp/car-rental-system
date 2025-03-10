import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Brand } from './brand.schema';
import { Address } from './address.schema';
import { ApiProperty } from '@nestjs/swagger';

export type VehicleDocument = mongoose.HydratedDocument<Vehicle>;

@Schema({ versionKey: false })
export class Vehicle {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    validate: {
      validator: async function (v: mongoose.Types.ObjectId) {
        const model = this.constructor.db.model('Brand');
        return model.exists({ _id: v });
      },
      message: 'Brand {VALUE} does not exist',
    },
  })
  brand: Brand;

  @ApiProperty()
  @Prop({ required: true })
  registrationNumber: string;

  @ApiProperty()
  @Prop({ required: true, minLength: 17, maxLength: 17, unique: true })
  vin: string;

  @ApiProperty()
  @Prop({ required: true })
  isRented: boolean;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: function () {
      return this.isRented;
    },
    validate: {
      validator: async function (v: mongoose.Types.ObjectId) {
        if (!v) return true;
        const model = this.constructor.db.model('Address');
        return model.exists({ _id: v });
      },
      message: 'Address {VALUE} does not exist',
    },
  })
  address?: Address;

  @ApiProperty()
  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @ApiProperty()
  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
