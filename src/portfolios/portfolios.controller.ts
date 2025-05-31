import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { GetPortfolioValueDto } from './dto/get-portfolio-value.dto';
import { GetPortfolioDto } from './dto/get-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PortfoliosService } from './portfolios.service';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  // Modify portfolio information
  @Patch()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UpdatePortfolioDto })
  @ApiOperation({ summary: 'Modificar información del portafolio' })
  @ApiResponse({
    status: 200,
    description: 'Información del portafolio modificada correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear modificar información del portafolio',
  })
  async update(
    @Body() updatePortfolioDto: UpdatePortfolioDto,
    @Request() req,
  ): Promise<GetPortfolioDto> {
    return await this.portfoliosService.update(req, updatePortfolioDto);
  }

  // Get total value of portfolio
  @Get('value')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Obtener saldo y total de portafolio' })
  @ApiResponse({
    status: 200,
    description: 'Valor total del portafolio obtenida correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al obtener valor total del portafolio',
  })
  async getBalance(@Request() req): Promise<GetPortfolioValueDto> {
    return await this.portfoliosService.getBalance(req);
  }

  // Get last movements
  @Get('movements')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Obtener últimos movimientos del portafolio' })
  @ApiResponse({
    status: 200,
    description: 'Movimientos del portafolio obtenidos correctamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Error al obtener movimientos del portafolio',
  })
  @ApiQuery({
    name: 'limit',
    description: 'Cantidad límite de movimientos a obtener',
    required: false,
    example: 10,
  })
  async getMovements(
    @Request() req,
    @Query('limit') limit?: number,
  ): Promise<object> {
    return await this.portfoliosService.getMovements(req, limit);
  }
}
