import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/features/auth/jwt-payload.interface';

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext): JwtPayload => {
    const request = context.switchToHttp().getRequest();
    return request.user as JwtPayload;
  },
);
