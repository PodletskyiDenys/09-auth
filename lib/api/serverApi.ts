import { User } from '@/types/user';
import { nextServer } from './api';
import type { FetchNotesResponse, Note, Params } from '../../types/note';
import { cookies } from 'next/headers';

export async function checkSessionServer() {
  const cookieStore = await cookies();
  const {data}= await nextServer.get('/auth/session', {
    headers: {

      Cookie: cookieStore.toString(),
    },
  });
  return data.success;
}

export async function userInfoServer() {
  const cookieStore = await cookies();
  const {data} = await nextServer.get<User>('/users/me', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchNotes(
  searchValue: string = '',
  page: number = 1,
  tag?: string,
  perPage: number = 12
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const params: Params = {
    page,
    perPage,
    tag,
  };

  if (searchValue) {
    params.search = searchValue;
  }
  const headers = {
    Cookie: cookieStore.toString(),
  };

  const response = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params,
    headers,
  });
  return response.data;
}

export async function fetchGetNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

