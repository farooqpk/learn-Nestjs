import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import {
  CreateBookMarkDto,
  UpdateBookMarkDto,
} from '../dto';

@Injectable()
export class BookMarkService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async createBookMark(
    bookmarkData: CreateBookMarkDto,
  ) {
    try {
      await this.prisma.bookmark.create({
        data: {
          title: bookmarkData.title,
          authorId: bookmarkData.authorId,
        },
      });
      return 'bookmark created';
    } catch (error) {
      throw new InternalServerErrorException(
        error.message,
      );
    }
  }

  async getAllBookMark() {
    try {
      const bookmarks =
        await this.prisma.bookmark.findMany({
          include: {
            author: {
              select: {
                email: true,
                id: true,
                name: true,
              },
            },
          },
        });
      if (!bookmarks) {
        throw new NotFoundException(
          'there is no bookmark',
        );
      } else {
        return bookmarks;
      }
    } catch (error) {
      throw error;
    }
  }

  async getABook(id: string) {
    try {
      const book =
        await this.prisma.bookmark.findFirst({
          where: { id: id },
          distinct: 'title',
          include: {
            author: {
              select: { email: true, name: true },
            },
          },
        });
      if (!book) {
        throw new NotFoundException(
          'this book is doesnt exist',
        );
      } else {
        return book;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateBook(
    id: string,
    updateData: UpdateBookMarkDto,
  ) {
    try {
      await this.prisma.bookmark.update({
        where: { id: id },
        data: updateData,
      });
      return 'updated successfully';
    } catch (error) {
      throw new InternalServerErrorException(
        error.message,
      );
    }
  }

  async deleteBook(id: string) {
    try {
      await this.prisma.bookmark.delete({
        where: { id: id },
      });
      return 'deleted';
    } catch (error) {
      throw new InternalServerErrorException(
        error.message,
      );
    }
  }
}
