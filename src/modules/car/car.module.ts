import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarEntity } from '../../database/car.entity';
import { AuthModule } from '../auth/auth.module';
import { CarBrandRepository } from '../brand/carBrand.repository';
import { CarModelRepository } from '../brand/carModel.repository';
import { ModelsService } from '../brand/models.service';
import { CurrencyModule } from '../currency/currency.module';
import { CurrencyService } from '../currency/currency.service';
import { S3Module } from '../s3/s3.module';
import { S3Service } from '../s3/s3.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { CarController } from './car.controller';
import { CarRepository } from './car.repository';
import { CarService } from './car.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CarEntity]),
    UserModule,
    AuthModule,
    CurrencyModule,
    S3Module,
  ],
  controllers: [CarController],
  providers: [
    CarService,
    CarRepository,
    UserRepository,
    CurrencyService,
    CarModelRepository,
    CarBrandRepository,
  ],
})
export class CarModule {}
