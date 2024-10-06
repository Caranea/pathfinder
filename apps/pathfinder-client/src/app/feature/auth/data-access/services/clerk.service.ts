import { Injectable } from '@angular/core';
import { Clerk } from '@clerk/clerk-js';
import { plPL } from '@clerk/localizations';
import { SessionResource, UserResource, GoogleOauthProvider, FacebookOauthProvider} from '@clerk/types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClerkService {
  public clerk!: Clerk;
  public isReady$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get currentUser(): UserResource | undefined | null {
    return this.clerk?.user;
  }

  get activeSession(): SessionResource | undefined {
    return this.clerk?.client?.sessions.find(
      (session) => session.status === 'active'
    );
  }

  get isAuthenthicated(): boolean {
    return !!this.activeSession?.user;
  }

  async load(apiKey: string, language = plPL) {
    if (this.clerk) {
      return;
    }

    this.clerk = new Clerk(apiKey);
    await this.clerk.load({
      localization: language,
    });

    this.clerk.addListener((emission) => {
      if (emission.client) {
        this.isReady$.next(true);
      }
    });
  }

  public signUp(
    emailAddress: string, username: string, password: string
  ) {
    return this.clerk.client?.signUp.create({
      emailAddress, username, password
    })
  }

  public signIn(
    identifier: string, password: string
  ) {
    return this.clerk.client?.signIn.create({
      identifier, strategy: 'password', password
    })
  }

  public socialSSO(
    provider: GoogleOauthProvider | FacebookOauthProvider,
    action: 'signIn' | 'signUp'
  ) {
    return this.clerk.client?.[action].authenticateWithRedirect({
      redirectUrl: window.location.href,
      continueSignUp: true,
      redirectUrlComplete: window.origin,
      strategy: `oauth_${provider}`
    })
  }

  public signOut() {
    this.activeSession?.end();
    window.location.reload();
  }
}
