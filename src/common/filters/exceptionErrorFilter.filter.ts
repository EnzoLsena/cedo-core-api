import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  private getStatus(exception: unknown): number {
    return exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getMessage(exception: unknown): string | string[] {
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      if (typeof response === 'string') {
        return response;
      }
      if (response && typeof response === 'object' && 'message' in response) {
        return (response as any).message;
      }
      return exception.message;
    }
    return 'Ocorreu um erro no sistema!';
  }

  private buildResponse(
    status: number,
    message: string | string[],
    request: Request,
  ) {
    const formattedMessage = Array.isArray(message) ? message : [message];
    return {
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      errors: formattedMessage,
    };
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = this.getStatus(exception);
    const message = this.getMessage(exception);

    if (!(exception instanceof HttpException)) {
      Logger.error(message, (exception as any)?.stack);
    }

    const errorResponse = this.buildResponse(status, message, request);

    response.status(status).json(errorResponse);
  }
}
