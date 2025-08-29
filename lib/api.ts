import axios from "axios";
import type { NewNoteData, Note } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface Params {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

const notesUrl = process.env.NEXT_PUBLIC_BASE_URL;
const myKey = process.env.NEXT_PUBLIC_NOTES_TOKEN;

if (!notesUrl) {
  throw new Error("❌ NEXT_PUBLIC_BASE_URL is not defined");
}
if (!myKey) {
  throw new Error("❌ NEXT_PUBLIC_NOTES_TOKEN is not defined");
}

// axios instance з базовим URL і токеном
const api = axios.create({
  baseURL: notesUrl,
  headers: {
    Authorization: `Bearer ${myKey}`,
  },
});

export async function fetchNotes(
  searchValue = "",
  page = 1,
  tag?: string,
  perPage = 12
): Promise<FetchNotesResponse> {
  const params: Params = { page, perPage, tag };

  if (searchValue) {
    params.search = searchValue;
  }

 const response = await api.get<FetchNotesResponse>("/notes", { params });

  return response.data;
}

export async function addNote(noteData: NewNoteData): Promise<Note> {
  const response = await api.post<Note>("/notes", noteData);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchGetNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
}
export default function getBaseUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL; 
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000'; 
}