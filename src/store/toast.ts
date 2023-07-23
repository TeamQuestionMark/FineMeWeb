import { create } from 'zustand';

interface ToastStore {
  message: string;
  isVisible: boolean;
  setToast: (message: string) => void;
  close: () => void;
}

export const TOAST_DURATION = 3000;
export const useToastStore = create<ToastStore>()(set => ({
  message: '',
  isVisible: false,
  setToast: message =>
    set(() => {
      setTimeout(
        () => set(() => ({ message: '', isVisible: false })),
        TOAST_DURATION,
      );
      return { message, isVisible: true };
    }),
  close: () => set(() => ({ message: '', isVisible: false })),
}));
