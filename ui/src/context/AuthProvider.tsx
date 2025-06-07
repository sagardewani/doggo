import { useCallback, useEffect, useState, type ReactNode } from 'react';
import AuthContext, { type AuthingState, type Profile } from './authContext';
import { verifyAuthToken } from '../api/auth';
import { getAuthToken } from '../api/utils';
import { getDogProfile } from '../api/dogs';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [authingState, setAuthingState] = useState<AuthingState>('idle');
  const [isAuthed, setIsAuthed] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const authToken = getAuthToken();

  const updateLoading = (state: boolean) => {
    setLoading(state);
  }

  const authenticateUser = useCallback(async () => {
    if (!authToken) {
      return;
    }
    setAuthingState('authenticating');
    setLoading(true);
    try {
      const isValid = await verifyAuthToken(authToken!);
      if (isValid) {
        setIsAuthed(true);
        fetchProfile();
      } else {
        setIsAuthed(false);
      }
    } catch (error) {
      setIsAuthed(false);
    } finally {
      setTimeout(() => setLoading(false), 1000); // Simulate a delay for better UX
      setAuthingState('done');
    }
  }, [authToken]);
  
  const fetchProfile = async (id?: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await getDogProfile(id);
      setProfile(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch doggo profile');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return (
    <AuthContext.Provider value={{ 
        loading,
        isAuthed,
        profile,
        error,
        authingState,
        refreshProfile: fetchProfile,
        updateLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
