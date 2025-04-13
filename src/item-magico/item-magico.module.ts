import { Module } from '@nestjs/common';
import { ItemMagicoService } from './item-magico.service';
import { ItemMagicoController } from './item-magico.controller';

@Module({
  controllers: [ItemMagicoController],
  providers: [ItemMagicoService],
  exports: [ItemMagicoService],
})
export class ItemMagicoModule {} 