import { User } from "./userDTO";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User;
}
