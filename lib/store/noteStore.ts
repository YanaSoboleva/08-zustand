import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { NoteTag } from '@/lib/api';

interface NoteDraft {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialDraft: NoteDraft = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteState {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (newFields) =>
        set((state) => ({
          draft: { ...state.draft, ...newFields },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-hub-draft', 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);