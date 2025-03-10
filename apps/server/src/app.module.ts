import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BrandsModule } from './brands/brands.module';
import { AddressesModule } from './addresses/addresses.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { APP_FILTER } from '@nestjs/core';
import { MongooseFilter } from './common/filters/mongoose.filter';
import { HttpFilter } from './common/filters/http.filter';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/car_rental_db?authSource=admin`
    ),
    BrandsModule,
    AddressesModule,
    VehiclesModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: HttpFilter },
    { provide: APP_FILTER, useClass: MongooseFilter },
  ],
})
export class AppModule {
}
