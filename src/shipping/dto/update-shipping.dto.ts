import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateShippingDto {
  @ApiProperty({ example: 'Ada Lovelace' })
  fullName!: string;

  @ApiProperty({ example: '123 Sneaker St' })
  line1!: string;

  @ApiPropertyOptional({ example: 'Apt 4' })
  line2?: string;

  @ApiProperty({ example: 'Portland' })
  city!: string;

  @ApiProperty({ example: 'OR' })
  state!: string;

  @ApiProperty({ example: '97201' })
  postalCode!: string;

  @ApiProperty({ example: 'US' })
  country!: string;

  @ApiPropertyOptional({ example: '555-0100' })
  phone?: string;
}
