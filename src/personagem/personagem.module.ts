import { Module } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { PersonagemController } from './personagem.controller';
import { ItemMagicoModule } from '../item-magico/item-magico.module';

@Module({
  imports: [ItemMagicoModule],
  controllers: [PersonagemController],
  providers: [PersonagemService],
})
export class PersonagemModule {} 