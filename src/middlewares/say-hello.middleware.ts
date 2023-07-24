import {
  NestMiddleware,
} from '@nestjs/common';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

export class SayHelloMiddleware
  implements NestMiddleware
{
  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    console.log('from global middleware');
    next();
  }
}
