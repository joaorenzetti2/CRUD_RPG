import { ApiProperty } from '@nestjs/swagger';
import { Classe } from '../../shared/enums/classe.enum';
import { v4 as uuidv4 } from 'uuid';
import { ItemMagico } from '../../item-magico/entities/item-magico.entity';

export class Personagem {
  @ApiProperty({ description: 'ID único do personagem' })
  id: string;

  @ApiProperty({ description: 'Nome do personagem' })
  nome: string;

  @ApiProperty({ description: 'Nome de aventureiro do personagem' })
  nomeAventureiro: string;

  @ApiProperty({ enum: Classe, description: 'Classe do personagem' })
  classe: Classe;

  @ApiProperty({ description: 'Nível do personagem', default: 1 })
  level: number;

  @ApiProperty({ description: 'Força base do personagem' })
  forcaBase: number;

  @ApiProperty({ description: 'Defesa base do personagem' })
  defesaBase: number;

  @ApiProperty({ description: 'Lista de itens mágicos do personagem', type: [ItemMagico] })
  itensMagicos: ItemMagico[];

  constructor(partial: Partial<Personagem>) {
    Object.assign(this, partial);
    this.id = this.id || uuidv4();
    this.level = this.level || 1;
    this.itensMagicos = this.itensMagicos || [];
  }

  getForcaTotal(): number {
    const bonusForca = this.itensMagicos.reduce((sum, item) => sum + (item.forca || 0), 0);
    return this.forcaBase + bonusForca;
  }

  getDefesaTotal(): number {
    const bonusDefesa = this.itensMagicos.reduce((sum, item) => sum + (item.defesa || 0), 0);
    return this.defesaBase + bonusDefesa;
  }
} 