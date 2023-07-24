import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookMarkDto } from '../dto';
import { BookMarkService } from '../services/bookmark.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('bookmark')
export class BookmarkController {
  constructor(
    private readonly bookMarkServie: BookMarkService,
  ) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtGuard) // we can also import out own guard like BookMarkGuard
  createBookMark(
    @Body() bookmarkData: BookMarkDto,
  ) {
    return this.bookMarkServie.createBookMark(
      bookmarkData,
    );
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtGuard)
  getAllBookMark() {
    return this.bookMarkServie.getAllBookMark();
  }


  @Get('book/:id')
  @HttpCode(200)
  getABook(@Param('id') id:string){
   return this.bookMarkServie.getABook(id)
  }
}
