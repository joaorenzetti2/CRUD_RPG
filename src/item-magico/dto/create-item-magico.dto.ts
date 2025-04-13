import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { TipoItem } from '../../shared/enums/tipo-item.enum';

export class CreateItemMagicoDto {
  @ApiProperty({ description: 'Nome do item mágico' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ enum: TipoItem, description: 'Tipo do item mágico' })
  @IsEnum(TipoItem)
  tipo: TipoItem;

  @ApiProperty({ description: 'Bônus de força do item', minimum: 0, maximum: 10 })
  @IsNumber()
  @Min(0)
  @Max(10)
  forca: number;

  @ApiProperty({ description: 'Bônus de defesa do item', minimum: 0, maximum: 10 })
  @IsNumber()
  @Min(0)
  @Max(10)
  defesa: number;
} 