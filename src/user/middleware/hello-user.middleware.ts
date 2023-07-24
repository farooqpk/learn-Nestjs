import { NestMiddleware } from '@nestjs/common';
import {
  NextFunction,
  Request,
  Response,
} from 'express';

export class HelloUserMiddleware
  implements NestMiddleware
{
  use(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    console.log(req.hostname);
    next();
  }
}
