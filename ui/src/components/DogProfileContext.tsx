import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getDogProfiles } from '../api/dogs';

export interface DogProfile {
  id: string;
  owner_id: string;
  name: string;
  breed?: string;
  age?: number;
  photo_url?: string;
  bio?: string;
}

interface DogProfileContextType {
  profiles: DogProfile[];
  loading: boolean;
  error: string;
  refresh: () => void;
}

const DogProfileContext = createContext<DogProfileContextType | undefined>(undefined);

export const useDogProfiles = () => {
  const ctx = useContext(DogProfileContext);
  if (!ctx) throw new Error('useDogProfiles must be used within a DogProfileProvider');
  return ctx;
};

export const DogProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<DogProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProfiles = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getDogProfiles();
      setProfiles(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch dog profiles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <DogProfileContext.Provider value={{ profiles, loading, error, refresh: fetchProfiles }}>
      {children}
    </DogProfileContext.Provider>
  );
};
