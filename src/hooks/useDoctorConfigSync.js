import { useState, useEffect, useContext, createContext } from 'react';

// Safe import — the hook checks if auth is available
let authContextRef = null;

export function setAuthContextRef(ref) {
  authContextRef = ref;
}

export function useDoctorConfigSync(configType, storageKey) {
  // Try to get the user from the auth context, but don't crash if unavailable
  let userId = null;
  try {
    if (authContextRef && authContextRef.current) {
      userId = authContextRef.current.user?.id || null;
    }
  } catch (e) {
    // Auth not available — offline mode
  }

  const localKey = `${configType}_${storageKey}`;

  const [extra, setExtraState] = useState(() => {
    if (storageKey && typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem(localKey);
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return [];
  });

  // Update local state and localStorage
  const setExtra = (updater) => {
    setExtraState(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;

      // Save locally immediately
      if (storageKey && typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.setItem(localKey, JSON.stringify(next));
        } catch (e) {}
      }

      // Cloud sync will be added when database tables are ready
      // For now, localStorage is the persistence layer
      return next;
    });
  };

  return [extra, setExtra];
}
