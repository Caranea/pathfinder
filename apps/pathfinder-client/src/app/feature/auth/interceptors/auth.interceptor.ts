import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, lastValueFrom } from 'rxjs';
import { ClerkService } from '../data-access/services/clerk.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private clerkService: ClerkService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.handle(req, next));
  }

  async handle(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Promise<HttpEvent<any>> {
    const token = await this.clerkService.activeSession?.getToken();

    if (token) {
      const authReq = req.clone({
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      });
      return lastValueFrom(next.handle(authReq));
    }

    return lastValueFrom(next.handle(req));
  }
}
