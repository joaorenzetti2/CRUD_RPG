import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemMagicoDto } from './dto/create-item-magico.dto';
import { ItemMagico } from './entities/item-magico.entity';
import { TipoItem } from '../shared/enums/tipo-item.enum';

@Injectable()
export class ItemMagicoService {
  private itensMagicos: ItemMagico[] = [];

  create(createItemMagicoDto: CreateItemMagicoDto): ItemMagico {
    // Validação de força e defesa por tipo
    if (createItemMagicoDto.tipo === TipoItem.ARMA && createItemMagicoDto.defesa !== 0) {
      throw new BadRequestException('Armas não podem ter bônus de defesa');
    }

    if (createItemMagicoDto.tipo === TipoItem.ARMADURA && createItemMagicoDto.forca !== 0) {
      throw new BadRequestException('Armaduras não podem ter bônus de força');
    }

    if (createItemMagicoDto.forca === 0 && createItemMagicoDto.defesa === 0) {
      throw new BadRequestException('Item mágico deve ter pelo menos um bônus (força ou defesa)');
    }

    const item = new ItemMagico(createItemMagicoDto);
    this.itensMagicos.push(item);
    return item;
  }

  findAll(): ItemMagico[] {
    return this.itensMagicos;
  }

  findOne(id: string): ItemMagico {
    const item = this.itensMagicos.find(i => i.id === id);
    if (!item) {
      throw new NotFoundException(`Item mágico com ID ${id} não encontrado`);
    }
    return item;
  }

  remove(id: string): void {
    const index = this.itensMagicos.findIndex(i => i.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item mágico com ID ${id} não encontrado`);
    }
    this.itensMagicos.splice(index, 1);
  }

  assignToPersonagem(itemId: string, personagemId: string): ItemMagico {
    const item = this.findOne(itemId);
    if (item.personagemId) {
      throw new BadRequestException('Item já está atribuído a um personagem');
    }
    item.personagemId = personagemId;
    return item;
  }

  removeFromPersonagem(itemId: string): ItemMagico {
    const item = this.findOne(itemId);
    item.personagemId = undefined;
    return item;
  }
} 