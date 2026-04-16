import axios from 'axios';
import { Note } from '@/types/note';

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'all';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export type CreateNoteData = {
  title: string;
  content: string;
  tag: Exclude<NoteTag, 'all'>; 
};

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api', 
  headers: {
    ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
    'Content-Type': 'application/json',
  },
});

export const fetchNotes = async ({
  page = 1,
  perPage = 10,
  search = '',
  tag = 'all',
}: FetchParams = {}): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };

  if (search.trim()) {
    params.search = search;
  }

  if (tag && tag !== 'all') {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>('/notes', { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response = await api.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export default api;