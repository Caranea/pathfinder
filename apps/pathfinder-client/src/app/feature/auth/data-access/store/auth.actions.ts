import { createAction, props } from '@ngrx/store';
import { AttemptVerificationFunction, PrepareVerificationFunction } from './auth.state';

export const saveSignUpPrepare = createAction(
    '[auth] save sign up prepare',
    props<{ signUpPrepare: PrepareVerificationFunction }>()
);

export const saveVerificationAttempt = createAction(
    '[auth] save sign up attempt',
    props<{ signUpAttempt: AttemptVerificationFunction }>()
);