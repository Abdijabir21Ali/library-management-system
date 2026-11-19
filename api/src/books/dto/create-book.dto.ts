import { IsString, IsInt, IsOptional, Min, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsString() @IsNotEmpty() title: string;
  @IsString() @IsNotEmpty() author: string;
  @IsString() @IsNotEmpty() isbn: string;
  @IsInt() @Min(1) totalCopies: number;
  @IsInt() genreId: number;
  @IsOptional() @IsString() coverImage?: string;
}
