import { Module } from '@nestjs/common';
import { BookmarkController } from './controllers/bookmark.controller';
import { BookMarkService } from './services/bookmark.service';

@Module({
  controllers: [BookmarkController],
  providers:[BookMarkService]
})
export class BookmarkModule {}
