import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class SampleInterceptor
  implements NestInterceptor
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // before completing req / before going to route handler like middleware

    console.log(
      'i will run before going to route handler',
    );

    // run before response and after the route handler
    return next.handle().pipe(
      tap(() => {
        console.log(
          'i will run before response and after the route handler',
        );
      }),
    );
  }
}
