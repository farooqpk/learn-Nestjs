import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { HelloUserMiddleware } from './middleware';

@Module({
  controllers: [UserController]
})
export class UserModule implements NestModule {
  //NestModule for middleware
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HelloUserMiddleware)
      .forRoutes({
        method: RequestMethod.ALL,
        path: 'user',
      });
  }
}
