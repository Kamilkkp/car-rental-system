import { Catch, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';
import mongoose from 'mongoose';

@Catch(mongoose.Error.ValidationError, mongoose.Error.CastError)
export class MongooseFilter implements ExceptionFilter {
  private readonly logger = new Logger('Mongoose-filter');

  catch(
    exception: mongoose.Error.ValidationError | mongoose.Error.CastError,
    host: ArgumentsHost
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    const statusCode = 400;
    const errorType = this.getErrorType(exception);
    const errorDetails = this.getErrorDetails(exception);

    this.logger.error({
      message: `Database error occurred`,
      context: {
        method: request.method,
        path: request.url,
        errorType,
        details: errorDetails
      },
      error: exception.stack
    });

    response.status(statusCode).json({
      statusCode,
      errorType,
      timestamp: new Date().toISOString(),
      path: request.url,
      details: errorDetails,
    });
  }

  private getErrorType(
    error: mongoose.Error.ValidationError | mongoose.Error.CastError
  ): string {
    return error instanceof mongoose.Error.ValidationError
      ? 'validation-error'
      : 'invalid-id-format';
  }

  private getErrorDetails(
    error: mongoose.Error.ValidationError | mongoose.Error.CastError
  ): object {
    if (error instanceof mongoose.Error.ValidationError) {
      return Object.entries(error.errors).reduce((acc, [path, err]) => {
        acc[path] = err.message;
        return acc;
      }, {});
    }
    return {
      path: error.path,
      value: error.value,
      kind: error.kind
    };
  }
}