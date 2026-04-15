// ScheduleContext — persists user's Weekend 2 schedule in localStorage
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { ScheduleArtist } from '@/lib/scheduleData';

interface ScheduleContextType {
  savedArtists: ScheduleArtist[];
  addArtist: (artist: ScheduleArtist) => void;
  removeArtist: (id: string) => void;
  isAdded: (id: string) => boolean;
  clearAll: () => void;
  count: number;
}

const ScheduleContext = createContext<ScheduleContextType | null>(null);

const STORAGE_KEY = 'coachella2026_schedule';

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const [savedArtists, setSavedArtists] = useState<ScheduleArtist[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedArtists));
  }, [savedArtists]);

  const addArtist = (artist: ScheduleArtist) => {
    setSavedArtists(prev => prev.find(a => a.id === artist.id) ? prev : [...prev, artist]);
  };

  const removeArtist = (id: string) => {
    setSavedArtists(prev => prev.filter(a => a.id !== id));
  };

  const isAdded = (id: string) => savedArtists.some(a => a.id === id);

  const clearAll = () => setSavedArtists([]);

  return (
    <ScheduleContext.Provider value={{ savedArtists, addArtist, removeArtist, isAdded, clearAll, count: savedArtists.length }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const ctx = useContext(ScheduleContext);
  if (!ctx) throw new Error('useSchedule must be used within ScheduleProvider');
  return ctx;
}
