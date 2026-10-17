import { Module } from '@nestjs/common';
import { StoreModule } from './store/store.module.js';
import { ProductsModule } from './products/products.module.js';
import { CartModule } from './cart/cart.module.js';
import { ShippingModule } from './shipping/shipping.module.js';
import { CheckoutModule } from './checkout/checkout.module.js';

@Module({
  imports: [
    StoreModule,
    ProductsModule,
    CartModule,
    ShippingModule,
    CheckoutModule,
  ],
})
export class AppModule {}
