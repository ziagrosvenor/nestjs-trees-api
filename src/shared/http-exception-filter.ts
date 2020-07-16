import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Used to extend default NestJS error handling.
 *
 * Also used to log errors.
 *
 * https://docs.nestjs.com/exception-filters#exception-filters-1
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const { method, url } = ctx.getRequest<Request>();
    const status = exception.getStatus
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const defaultResponse: any = exception.getResponse();
    const errorResponse = {
      ...defaultResponse,
      timestamp: new Date().toISOString(),
      path: url,
      method,
    };

    // Only log stack trace for internal server errors
    const logBody =
      status === HttpStatus.INTERNAL_SERVER_ERROR
        ? exception.stack
        : JSON.stringify(errorResponse);
    Logger.error(`${method} ${url}`, logBody, 'ExceptionFilter');

    response.status(status).json(errorResponse);
  }
}
