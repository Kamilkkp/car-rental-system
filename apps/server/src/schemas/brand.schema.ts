import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument} from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema({versionKey: false})
export class Brand {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true, unique:true })
  name: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);
