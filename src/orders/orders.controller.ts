import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { GetOrderDto } from './dto/get-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Endpoint to create a stock order
  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateOrderDto })
  @ApiOperation({ summary: 'Crear una orden de compra o venta de acción' })
  @ApiResponse({ status: 200, description: 'Orden creada correctamente' })
  @ApiResponse({ status: 400, description: 'Error al crear orden' })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Request() req,
  ): Promise<GetOrderDto> {
    return await this.ordersService.create(req, createOrderDto);
  }
}
