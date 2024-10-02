import { SignUpResource, PrepareEmailAddressVerificationParams, AttemptEmailAddressVerificationParams } from "@clerk/types";

export type PrepareVerificationFunction = (params?: PrepareEmailAddressVerificationParams) => Promise<SignUpResource>
export type AttemptVerificationFunction = (params: AttemptEmailAddressVerificationParams) => Promise<SignUpResource>;

export interface AuthState {
    signUpPrepare: undefined | PrepareVerificationFunction
    signUpAttempt: undefined | AttemptVerificationFunction
}

export const initialState: AuthState = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth')!)
    : {
        signUpPrepare: undefined,
        signUpAttempt: undefined
    };