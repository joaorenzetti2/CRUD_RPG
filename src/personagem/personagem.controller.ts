import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PersonagemService } from './personagem.service';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { UpdateNomeAventureiroDto } from './dto/update-nome-aventureiro.dto';
import { Personagem } from './entities/personagem.entity';
import { ItemMagico } from '../item-magico/entities/item-magico.entity';
import { ItemMagicoService } from '../item-magico/item-magico.service';

@ApiTags('personagens')
@Controller('personagens')
export class PersonagemController {
  constructor(
    private readonly personagemService: PersonagemService,
    private readonly itemMagicoService: ItemMagicoService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo personagem' })
  @ApiResponse({ status: 201, description: 'Personagem criado com sucesso', type: Personagem })
  create(@Body() createPersonagemDto: CreatePersonagemDto): Personagem {
    return this.personagemService.create(createPersonagemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os personagens' })
  @ApiResponse({ status: 200, description: 'Lista de personagens retornada', type: [Personagem] })
  findAll(): Personagem[] {
    return this.personagemService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar personagem por ID' })
  @ApiResponse({ status: 200, description: 'Personagem encontrado', type: Personagem })
  findOne(@Param('id') id: string): Personagem {
    return this.personagemService.findOne(id);
  }

  @Patch(':id/nome-aventureiro')
  @ApiOperation({ summary: 'Atualizar nome de aventureiro' })
  @ApiResponse({ status: 200, description: 'Nome de aventureiro atualizado', type: Personagem })
  updateNomeAventureiro(
    @Param('id') id: string,
    @Body() updateNomeAventureiroDto: UpdateNomeAventureiroDto,
  ): Personagem {
    return this.personagemService.updateNomeAventureiro(id, updateNomeAventureiroDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover personagem' })
  @ApiResponse({ status: 204, description: 'Personagem removido com sucesso' })
  remove(@Param('id') id: string): void {
    return this.personagemService.remove(id);
  }

  @Post(':id/itens/:itemId')
  @ApiOperation({ summary: 'Adicionar item mágico ao personagem' })
  @ApiResponse({ status: 200, description: 'Item adicionado ao personagem', type: Personagem })
  addItem(@Param('id') id: string, @Param('itemId') itemId: string): Personagem {
    const item = this.itemMagicoService.findOne(itemId);
    this.itemMagicoService.assignToPersonagem(itemId, id);
    return this.personagemService.addItem(id, item);
  }

  @Delete(':id/itens/:itemId')
  @ApiOperation({ summary: 'Remover item mágico do personagem' })
  @ApiResponse({ status: 200, description: 'Item removido do personagem', type: Personagem })
  removeItem(@Param('id') id: string, @Param('itemId') itemId: string): Personagem {
    this.itemMagicoService.removeFromPersonagem(itemId);
    return this.personagemService.removeItem(id, itemId);
  }

  @Get(':id/itens')
  @ApiOperation({ summary: 'Listar itens mágicos do personagem' })
  @ApiResponse({ status: 200, description: 'Lista de itens do personagem', type: [ItemMagico] })
  findItems(@Param('id') id: string): ItemMagico[] {
    return this.personagemService.findItems(id);
  }

  @Get(':id/amuleto')
  @ApiOperation({ summary: 'Buscar amuleto do personagem' })
  @ApiResponse({ status: 200, description: 'Amuleto do personagem', type: ItemMagico })
  findAmuleto(@Param('id') id: string): ItemMagico | null {
    return this.personagemService.findAmuleto(id);
  }
} 