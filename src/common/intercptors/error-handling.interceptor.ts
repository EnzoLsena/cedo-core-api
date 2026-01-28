import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  HttpException,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorHandlingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpException) {
          this.logger.warn(
            {
              method: request?.method,
              url: request?.url,
              statusCode: error.getStatus(),
              message: error.message,
            },
            'HTTP Exception',
          );
        } else if (error instanceof Error) {
          this.logger.error(
            {
              method: request?.method,
              url: request?.url,
              message: error.message,
              stack: error.stack,
            },
            'Unhandled Exception',
          );
        } else {
          this.logger.error(
            {
              method: request?.method,
              url: request?.url,
              error,
            },
            'Unknown thrown value',
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
