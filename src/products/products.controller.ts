import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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

  @Get('search')
  @ApiOperation({
    summary: 'Search products by text, category, and/or color',
  })
  @ApiQuery({
    name: 'q',
    required: false,
    example: 'air',
    description: 'Matches name, description, category, or colors',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    example: 'Running',
  })
  @ApiQuery({
    name: 'color',
    required: false,
    example: 'Black',
  })
  search(
    @Query('q') q?: string,
    @Query('category') category?: string,
    @Query('color') color?: string,
  ) {
    const results = this.store.searchProducts({ q, category, color });
    return {
      query: { q: q ?? null, category: category ?? null, color: color ?? null },
      count: results.length,
      results,
    };
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
