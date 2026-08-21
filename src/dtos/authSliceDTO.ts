import { User } from "./userDTO";

export interface AuthState {
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  token: string | null;
  user: User;
}
