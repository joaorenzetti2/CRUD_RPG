import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { Classe } from '../../shared/enums/classe.enum';

export class CreatePersonagemDto {
  @ApiProperty({ description: 'Nome do personagem' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ description: 'Nome de aventureiro do personagem' })
  @IsString()
  @IsNotEmpty()
  nomeAventureiro: string;

  @ApiProperty({ enum: Classe, description: 'Classe do personagem' })
  @IsEnum(Classe)
  classe: Classe;

  @ApiProperty({ description: 'Força base do personagem', minimum: 0, maximum: 10 })
  @IsNumber()
  @Min(0)
  @Max(10)
  forcaBase: number;

  @ApiProperty({ description: 'Defesa base do personagem', minimum: 0, maximum: 10 })
  @IsNumber()
  @Min(0)
  @Max(10)
  defesaBase: number;
} 