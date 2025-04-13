import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemMagicoService } from './item-magico.service';
import { CreateItemMagicoDto } from './dto/create-item-magico.dto';
import { ItemMagico } from './entities/item-magico.entity';

@ApiTags('itens-magicos')
@Controller('itens-magicos')
export class ItemMagicoController {
  constructor(private readonly itemMagicoService: ItemMagicoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo item mágico' })
  @ApiResponse({ status: 201, description: 'Item mágico criado com sucesso', type: ItemMagico })
  create(@Body() createItemMagicoDto: CreateItemMagicoDto): ItemMagico {
    return this.itemMagicoService.create(createItemMagicoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os itens mágicos' })
  @ApiResponse({ status: 200, description: 'Lista de itens mágicos retornada', type: [ItemMagico] })
  findAll(): ItemMagico[] {
    return this.itemMagicoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar item mágico por ID' })
  @ApiResponse({ status: 200, description: 'Item mágico encontrado', type: ItemMagico })
  findOne(@Param('id') id: string): ItemMagico {
    return this.itemMagicoService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover item mágico' })
  @ApiResponse({ status: 204, description: 'Item mágico removido com sucesso' })
  remove(@Param('id') id: string): void {
    return this.itemMagicoService.remove(id);
  }
} 