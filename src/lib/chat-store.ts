import { create } from "zustand";

interface ChatState {
  open: boolean;
  unread: number;
  setOpen: (v: boolean) => void;
  toggle: () => void;
  bumpUnread: () => void;
  clearUnread: () => void;
}

/**
 * Global chat-widget open state. Any component (navbar, hero, footer, etc.)
 * can open the AI agent without prop drilling.
 */
export const useChat = create<ChatState>((set) => ({
  open: false,
  unread: 0,
  setOpen: (v) => set({ open: v, unread: v ? 0 : 0 }),
  toggle: () => set((s) => ({ open: !s.open, unread: 0 })),
  bumpUnread: () => set((s) => (s.open ? s : { unread: s.unread + 1 })),
  clearUnread: () => set({ unread: 0 }),
}));
