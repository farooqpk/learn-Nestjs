import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateBookMarkDto,
  UpdateBookMarkDto,
} from '../dto';
import { BookMarkService } from '../services/bookmark.service';
import { JwtGuard } from 'src/auth/guard';
import { SampleInterceptor } from '../interceptors/sample.interceptor';

@Controller('bookmark')
export class BookmarkController {
  constructor(
    private readonly bookMarkServie: BookMarkService,
  ) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtGuard) // we can also import out own guard like BookMarkGuard
  createBookMark(
    @Body() bookmarkData: CreateBookMarkDto,
  ) {
    return this.bookMarkServie.createBookMark(
      bookmarkData,
    );
  }

  // interceptor only applicable for this route if we want all controller we can put this to top of the class
  @UseInterceptors(SampleInterceptor)
  @Get()
  @HttpCode(200)
  // @UseGuards(JwtGuard)
  getAllBookMark() {
    return this.bookMarkServie.getAllBookMark();
  }

  @Get('book/:id')
  @HttpCode(200)
  @UseGuards(JwtGuard)
  getABook(@Param('id') id: string) {
    return this.bookMarkServie.getABook(id);
  }

  @Put('book/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtGuard)
  updateBook(
    @Param('id') id: string,
    @Body() updateData: UpdateBookMarkDto,
  ) {
    return this.bookMarkServie.updateBook(
      id,
      updateData,
    );
  }

  @Delete('book/:id')
  @HttpCode(HttpStatus.OK)
  deleteBook(@Param('id') id: string) {
    console.log(id);
    return this.bookMarkServie.deleteBook(id);
  }
}
