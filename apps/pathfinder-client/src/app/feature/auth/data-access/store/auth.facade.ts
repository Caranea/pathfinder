
import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectSignUpPrepare, selectSignUpAttempt } from './auth.selectors';
import { saveSignUpPrepare, saveVerificationAttempt } from './auth.actions';
import { AttemptVerificationFunction, PrepareVerificationFunction } from './auth.state';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
    private readonly store: Store = inject(Store);

    public saveSignUpPrepare(signUpPrepare: PrepareVerificationFunction) {
        console.log('facade', signUpPrepare)
        return this.store.dispatch(saveSignUpPrepare({ signUpPrepare }));
    }

    public saveVerificationAttempt(signUpAttempt: AttemptVerificationFunction) {
        return this.store.dispatch(saveVerificationAttempt({ signUpAttempt }));
    }

    public signUpPrepare$ = this.store.pipe(select(selectSignUpPrepare));
    public signUpAttempt$ = this.store.pipe(select(selectSignUpAttempt));
}
