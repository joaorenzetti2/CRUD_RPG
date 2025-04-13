import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { UpdateNomeAventureiroDto } from './dto/update-nome-aventureiro.dto';
import { Personagem } from './entities/personagem.entity';
import { ItemMagico } from '../item-magico/entities/item-magico.entity';
import { TipoItem } from '../shared/enums/tipo-item.enum';

@Injectable()
export class PersonagemService {
  private personagens: Personagem[] = [];

  create(createPersonagemDto: CreatePersonagemDto): Personagem {
    if (createPersonagemDto.forcaBase + createPersonagemDto.defesaBase > 10) {
      throw new BadRequestException('A soma de força base e defesa base não pode ultrapassar 10 pontos');
    }

    const personagem = new Personagem(createPersonagemDto);
    this.personagens.push(personagem);
    return personagem;
  }

  findAll(): Personagem[] {
    return this.personagens;
  }

  findOne(id: string): Personagem {
    const personagem = this.personagens.find(p => p.id === id);
    if (!personagem) {
      throw new NotFoundException(`Personagem com ID ${id} não encontrado`);
    }
    return personagem;
  }

  updateNomeAventureiro(id: string, updateNomeAventureiroDto: UpdateNomeAventureiroDto): Personagem {
    const personagem = this.findOne(id);
    personagem.nomeAventureiro = updateNomeAventureiroDto.nomeAventureiro;
    return personagem;
  }

  remove(id: string): void {
    const index = this.personagens.findIndex(p => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Personagem com ID ${id} não encontrado`);
    }
    this.personagens.splice(index, 1);
  }

  addItem(personagemId: string, item: ItemMagico): Personagem {
    const personagem = this.findOne(personagemId);

    if (item.tipo === TipoItem.AMULETO) {
      const hasAmuleto = personagem.itensMagicos.some(i => i.tipo === TipoItem.AMULETO);
      if (hasAmuleto) {
        throw new BadRequestException('O personagem já possui um amuleto equipado');
      }
    }

    personagem.itensMagicos.push(item);
    return personagem;
  }

  removeItem(personagemId: string, itemId: string): Personagem {
    const personagem = this.findOne(personagemId);
    const itemIndex = personagem.itensMagicos.findIndex(i => i.id === itemId);
    
    if (itemIndex === -1) {
      throw new NotFoundException(`Item com ID ${itemId} não encontrado no personagem`);
    }

    personagem.itensMagicos.splice(itemIndex, 1);
    return personagem;
  }

  findItems(personagemId: string): ItemMagico[] {
    const personagem = this.findOne(personagemId);
    return personagem.itensMagicos;
  }

  findAmuleto(personagemId: string): ItemMagico | null {
    const personagem = this.findOne(personagemId);
    return personagem.itensMagicos.find(i => i.tipo === TipoItem.AMULETO) || null;
  }
} 