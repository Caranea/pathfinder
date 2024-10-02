import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./auth.state";

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');

export const selectSignUpPrepare = createSelector(
  selectAuthFeature,
  (authState: AuthState) => authState.signUpPrepare
);

export const selectSignUpAttempt = createSelector(
    selectAuthFeature,
    (authState: AuthState) => authState.signUpAttempt
  );