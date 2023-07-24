import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SayHelloMiddleware } from './middlewares';


@Module({
  imports: [
    UserModule,
    BookmarkModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ]
})
export class AppModule implements NestModule {
  // for middlewares
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SayHelloMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.GET,
    });
  }
}
