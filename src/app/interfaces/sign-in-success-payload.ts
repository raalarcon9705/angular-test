import { User } from './user';

export interface SignInSuccessPayload {
  accessToken: string;
  user: User;
}
