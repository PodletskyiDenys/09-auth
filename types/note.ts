export interface Note {
  id: string;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: Tag;
}

export type Tag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface Params {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}