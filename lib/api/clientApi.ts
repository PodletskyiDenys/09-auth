import { UserMe, UserRequest } from '@/types/user';
import { CheckSession } from '@/types/response';
import { nextServer } from './api';
import type { FetchNotesResponse, NewNoteData, Note, Params } from '../../types/note';

export const registration = async (user: UserRequest): Promise<UserMe> => {
  const {data}= await nextServer.post<UserMe>(`/auth/register`, user);
  return data;
};

export const login = async (user: UserRequest): Promise<UserMe> => {
  const {data}= await nextServer.post<UserMe>(`/auth/login`, user);
  return data;
};

export const logout = async () => {
  const {data}= await nextServer.post(`/auth/logout`);
  return data.success;   
};

export async function checkSessionClient() {
  const {data}= await nextServer.get<CheckSession>('/auth/session');
  return data.success;
}

export async function userInfoClient() {
  const {data} = await nextServer.get<UserMe>('/users/me');
  return data;
}

export async function updateUser(user: Partial<UserMe>) {
  const {data} = await nextServer.patch<UserMe>('/users/me', user);
  return data;
}

export async function fetchNotes(
  searchValue: string = '',
  page: number = 1,
  tag?: string,
  perPage: number = 12
): Promise<FetchNotesResponse> {
  const params: Params = {
    page,
    perPage,
    tag,
  };

  if (searchValue) {
    params.search = searchValue;
  }

  const response = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params,    
  });
  return response.data;
}

export const addNote = async (noteData: NewNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>(`/notes`, noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
};

export async function fetchGetNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

