import axios from "axios";
import { UserMe, UserRequest } from "@/types/user";
import { CheckSession } from "@/types/response";
import type {
  FetchNotesResponse,
  NewNoteData,
  Note,
  Params,
} from "@/types/note";

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // зміни на свій бекенд
  withCredentials: true,
});

export const registration = async (user: UserRequest): Promise<UserMe> => {
  const { data } = await nextServer.post<UserMe>("/auth/register", user);
  return data;
};

export const login = async (user: UserRequest): Promise<UserMe> => {
  const { data } = await nextServer.post<UserMe>("/auth/login", user);
  return data;
};

export const logout = async () => {
  const { data } = await nextServer.post<{ success: boolean }>("/auth/logout");
  return data.success;
};

export async function checkSessionClient() {
  const { data } = await nextServer.get<CheckSession>("/auth/session");
  return data.success;
}

export async function userInfoClient() {
  const { data } = await nextServer.get<UserMe>("/users/me");
  return data;
}

export async function updateUser(user: Partial<UserMe>) {
  const { data } = await nextServer.patch<UserMe>("/users/me", user);
  return data;
}

export async function fetchNotes(
  searchValue: string = "",
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

  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
  });
  return data;
}

export const addNote = async (noteData: NewNoteData): Promise<Note> => {
  const { data } = await nextServer.post<Note>("/notes", noteData);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);
  return data;
};

export async function fetchGetNoteById(id: string): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}
