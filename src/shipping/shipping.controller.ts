import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StoreService } from '../store/store.service.js';
import { UpdateShippingDto } from './dto/update-shipping.dto.js';

@ApiTags('shipping')
@Controller('shipping')
export class ShippingController {
  constructor(private readonly store: StoreService) {}

  @Get()
  @ApiOperation({ summary: 'Get the current shipping address' })
  getAddress() {
    return {
      address: this.store.getShippingAddress(),
    };
  }

  @Put('address')
  @ApiOperation({ summary: 'Create or update the shipping address' })
  updateAddress(@Body() body: UpdateShippingDto) {
    const required = ['fullName', 'line1', 'city', 'state', 'postalCode', 'country'] as const;
    for (const field of required) {
      if (!body?.[field]?.toString().trim()) {
        throw new BadRequestException(`${field} is required`);
      }
    }

    const address = this.store.updateShippingAddress({
      fullName: body.fullName!.trim(),
      line1: body.line1!.trim(),
      line2: body.line2?.trim() || undefined,
      city: body.city!.trim(),
      state: body.state!.trim(),
      postalCode: body.postalCode!.trim(),
      country: body.country!.trim(),
      phone: body.phone?.trim() || undefined,
    });

    return { success: true, address };
  }
}
