import { NoteTag } from '@/lib/api';

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag; 
  createdAt: string;
  updatedAt: string;
}
