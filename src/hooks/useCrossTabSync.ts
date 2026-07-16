import { useEffect, useCallback, useRef } from 'react';

type MessageHandler = (data: unknown) => void;

const CHANNEL_NAME = 'esifit-sync';

export function useCrossTabSync(key: string, handler: MessageHandler) {
  const handlerRef = useRef<MessageHandler>(handler);
  handlerRef.current = handler;

  useEffect(() => {
    // Listen for storage changes from other tabs
    const storageHandler = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          handlerRef.current(e.newValue ? JSON.parse(e.newValue) : null);
        } catch {
          handlerRef.current(null);
        }
      }
    };

    // Use BroadcastChannel for real-time cross-tab communication
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel(CHANNEL_NAME);
      channel.onmessage = (event) => {
        if (event.data?.key === key) {
          handlerRef.current(event.data.payload);
        }
      };
    } catch {
      // BroadcastChannel not supported, fall back to storage events only
    }

    window.addEventListener('storage', storageHandler);
    return () => {
      window.removeEventListener('storage', storageHandler);
      channel?.close();
    };
  }, [key]);
}

export function broadcastCrossTab(key: string, payload: unknown) {
  try {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage({ key, payload });
    channel.close();
  } catch {
    // BroadcastChannel not supported
  }
}

export function useDocumentVisibility(onVisible?: () => void) {
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === 'visible') {
      onVisible?.();
    }
  }, [onVisible]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [handleVisibilityChange]);
}
