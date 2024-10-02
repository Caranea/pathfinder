import { Action, createReducer, on } from "@ngrx/store";
import * as authActions from './auth.actions';
import * as authState from './auth.state';

const internalReducer = createReducer(
    authState.initialState,

    on(authActions.saveSignUpPrepare, (state, props) => {
        console.log('redu', props.signUpPrepare)

        return {
            ...state,
            signUpPrepare: props.signUpPrepare,
        };
    }),

    on(authActions.saveVerificationAttempt, (state, props) => {
        return {
            ...state,
            signUpAttempt: props.signUpAttempt,
        };
    })
)

export function authReducer(
    state: authState.AuthState | undefined,
    action: Action
) {
    return internalReducer(state, action);
}