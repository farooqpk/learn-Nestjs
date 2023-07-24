import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class BookMarkDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  authorId: string;

}
