import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller.js';

@Module({
  controllers: [ShippingController],
})
export class ShippingModule {}
