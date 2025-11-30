import { create } from 'zustand';

interface EnvStore {
  hasLogged: boolean;
  setHasLogged: () => void;
}

export const useEnvStore = create<EnvStore>((set) => ({
  hasLogged: false,
  setHasLogged: () => set({ hasLogged: true }),
}));

