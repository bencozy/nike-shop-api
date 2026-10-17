import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { StoreService } from '../store/store.service.js';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly store: StoreService) {}

  @Get()
  @ApiOperation({ summary: 'List all Nike products' })
  findAll() {
    return this.store.getProducts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiParam({ name: 'id', example: 'nk-001' })
  findOne(@Param('id') id: string) {
    const product = this.store.getProduct(id);
    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }
    return product;
  }
}
