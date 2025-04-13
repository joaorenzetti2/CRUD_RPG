import { Module } from '@nestjs/common';
import { PersonagemModule } from './personagem/personagem.module';
import { ItemMagicoModule } from './item-magico/item-magico.module';

@Module({
  imports: [
    PersonagemModule,
    ItemMagicoModule,
  ],
})
export class AppModule {} 