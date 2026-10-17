import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { StoreService } from '../store/store.service.js';
import { AddCartItemDto } from './dto/add-cart-item.dto.js';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly store: StoreService) {}

  @Get()
  @ApiOperation({ summary: 'Get cart items and subtotal' })
  getCart() {
    return this.store.getCartTotals();
  }

  @Post('items')
  @ApiOperation({ summary: 'Add a product to the cart' })
  addItem(@Body() body: AddCartItemDto) {
    const { productId, size, color, quantity = 1 } = body ?? {};
    if (!productId || size === undefined || !color) {
      throw new BadRequestException(
        'productId, size, and color are required',
      );
    }

    try {
      const item = this.store.addToCart({
        productId,
        size: Number(size),
        color,
        quantity: Number(quantity),
      });
      return { success: true, item, cart: this.store.getCartTotals() };
    } catch (err) {
      const code = err instanceof Error ? err.message : 'UNKNOWN';
      if (code === 'PRODUCT_NOT_FOUND') {
        throw new NotFoundException(`Product ${productId} not found`);
      }
      if (code === 'INVALID_SIZE') {
        throw new BadRequestException('Selected size is not available');
      }
      if (code === 'INVALID_COLOR') {
        throw new BadRequestException('Selected color is not available');
      }
      if (code === 'INVALID_QUANTITY') {
        throw new BadRequestException('Quantity must be at least 1');
      }
      throw err;
    }
  }

  @Delete('items/:itemId')
  @ApiOperation({ summary: 'Remove an item from the cart' })
  @ApiParam({ name: 'itemId', example: 'cart-1' })
  removeItem(@Param('itemId') itemId: string) {
    const removed = this.store.removeFromCart(itemId);
    if (!removed) {
      throw new NotFoundException(`Cart item ${itemId} not found`);
    }
    return { success: true, cart: this.store.getCartTotals() };
  }
}
