import { useContext } from "react";
import AuthContext, { type IAuthContext } from "../context/authContext";


export const useAuth = (): IAuthContext => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within a AuthProvider');
  return ctx;
};