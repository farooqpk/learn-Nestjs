import { Module } from '@nestjs/common';
import { BookmarkController } from './controllers/bookmark.controller';
import { BookMarkService } from './services/bookmark.service';
import { SampleInterceptor } from './interceptors/sample.interceptor';

@Module({
  controllers: [BookmarkController],
  providers:[BookMarkService,SampleInterceptor]
})
export class BookmarkModule {}
