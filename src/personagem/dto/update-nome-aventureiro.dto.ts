import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateNomeAventureiroDto {
  @ApiProperty({ description: 'Novo nome de aventureiro do personagem' })
  @IsString()
  @IsNotEmpty()
  nomeAventureiro: string;
} 