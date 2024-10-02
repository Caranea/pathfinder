import { applyDecorators, UseGuards } from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

export function PublicApi(limit = 1, ttl = 1000) {
  return applyDecorators(
    Throttle({ default: { limit, ttl } }),
    UseGuards(ThrottlerGuard)
  );
}
