import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema({ versionKey: false })
export class Address {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  surname: string;

  @ApiProperty()
  @Prop({ required: true })
  street: string;

  @ApiProperty()
  @Prop({ required: true })
  city: string;

  @ApiProperty()
  @Prop({ required: true })
  zipCode: string;

  @ApiProperty()
  @Prop({ required: true })
  country: string;

  @ApiProperty()
  @Prop({ required: true })
  email: string;

  @ApiProperty()
  @Prop({ required: true, default: Date.now })
  createdAt: Date;

  @ApiProperty()
  @Prop({ required: true, default: Date.now })
  updatedAt: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
