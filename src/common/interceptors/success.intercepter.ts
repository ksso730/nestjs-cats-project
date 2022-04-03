import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    return next.handle().pipe(
      // data: 컨트롤러에서 리턴한 데이터. 데이터 형식을 유지하면서 보낼 수 있다.
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
