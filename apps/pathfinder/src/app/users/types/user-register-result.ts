import { User } from "../entities/user.entity";

export interface CanCreateUserResult {
  canRegister: boolean;
  status?: CreateUserStatus;
}

export interface CreateUserResult {
  user?: User
  message: CreateUserStatus;
}

export enum CreateUserStatus {
  COMPLETE = 'Registration complete',
  USER_EXISTS = 'Email or username is already taken',
  USER_CREATION_FAILED = 'Unexpected error happened during user creation',
}
