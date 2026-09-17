import { User } from "./userDTO";

export interface AuthState {
  isAuthenticated: boolean | null;
  isAuthLoading: boolean;
  token: string | null;
  user: User;
}
