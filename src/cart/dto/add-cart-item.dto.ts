import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddCartItemDto {
  @ApiProperty({ example: 'nk-001' })
  productId!: string;

  @ApiProperty({ example: 9 })
  size!: number;

  @ApiProperty({ example: 'White' })
  color!: string;

  @ApiPropertyOptional({ example: 1, default: 1 })
  quantity?: number;
}
