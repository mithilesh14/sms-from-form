import { createContext, useContext, useState, ReactNode } from 'react';

export type IntentMode = 'live' | 'invest' | 'escape' | null;

interface IntentContextType {
  mode: IntentMode;
  setMode: (mode: IntentMode) => void;
  hasChosen: boolean;
}

const IntentContext = createContext<IntentContextType>({
  mode: null,
  setMode: () => {},
  hasChosen: false,
});

export function IntentProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<IntentMode>(() => {
    const stored = sessionStorage.getItem('verso-intent');
    return (stored as IntentMode) || null;
  });

  const handleSetMode = (newMode: IntentMode) => {
    setMode(newMode);
    if (newMode) sessionStorage.setItem('verso-intent', newMode);
  };

  return (
    <IntentContext.Provider value={{ mode, setMode: handleSetMode, hasChosen: mode !== null }}>
      {children}
    </IntentContext.Provider>
  );
}

export const useIntent = () => useContext(IntentContext);
