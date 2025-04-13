import { ApiProperty } from '@nestjs/swagger';
import { TipoItem } from '../../shared/enums/tipo-item.enum';
import { v4 as uuidv4 } from 'uuid';

export class ItemMagico {
  @ApiProperty({ description: 'ID único do item mágico' })
  id: string;

  @ApiProperty({ description: 'Nome do item mágico' })
  nome: string;

  @ApiProperty({ enum: TipoItem, description: 'Tipo do item mágico' })
  tipo: TipoItem;

  @ApiProperty({ description: 'Bônus de força do item' })
  forca: number;

  @ApiProperty({ description: 'Bônus de defesa do item' })
  defesa: number;

  @ApiProperty({ description: 'ID do personagem que possui o item', required: false })
  personagemId?: string;

  constructor(partial: Partial<ItemMagico>) {
    Object.assign(this, partial);
    this.id = this.id || uuidv4();
  }
} 