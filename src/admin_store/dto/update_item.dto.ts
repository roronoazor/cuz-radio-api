import { IsOptional, IsString, IsInt, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UpdateItemDto {
  @Expose()
  @IsOptional()
  @IsString()
  name?: string;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsOptional()
  @IsInt()
  quantity?: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  price?: number;

  @Expose()
  @IsOptional()
  @IsString()
  category?: string;
}