"use client";
import { createContext, useContext, useState } from 'react';

const CursorContext = createContext();

export function CursorProvider({ children }) {
  const [is404Active, setIs404Active] = useState(false);

  return (
    <CursorContext.Provider value={{ is404Active, setIs404Active }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
} 