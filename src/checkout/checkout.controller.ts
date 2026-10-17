import {
  BadRequestException,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StoreService } from '../store/store.service.js';

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly store: StoreService) {}

  @Get('orders')
  @ApiOperation({ summary: 'List mock purchase orders' })
  listOrders() {
    return this.store.getOrders();
  }

  @Post('purchase')
  @ApiOperation({
    summary: 'Mock checkout — marks order paid and clears the cart',
  })
  purchase() {
    try {
      const order = this.store.purchase();
      return {
        success: true,
        message: 'Mock payment successful — order confirmed',
        order,
      };
    } catch (err) {
      const code = err instanceof Error ? err.message : 'UNKNOWN';
      if (code === 'EMPTY_CART') {
        throw new BadRequestException('Cart is empty');
      }
      if (code === 'MISSING_SHIPPING') {
        throw new BadRequestException(
          'Shipping address is required before purchase',
        );
      }
      throw err;
    }
  }
}
