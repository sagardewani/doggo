import { createContext } from "react";

export interface Profile {
  id: string;
  owner_id: string;
  name: string;
  breed?: string;
  age?: number;
  photo_url?: string;
  bio?: string;
}

export type AuthingState = 'idle' | 'authenticating' | 'done';

export interface IAuthContext {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => void;
  isAuthed: boolean;
  authingState: AuthingState;
  updateLoading: (state: boolean) => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export default AuthContext;