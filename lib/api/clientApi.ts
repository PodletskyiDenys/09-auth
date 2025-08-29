import { User, AuthCredentials } from "@/types/user";
import { nextServer } from "./api";
import { CheckSession } from "@/types/response";
import type {
  FetchNotesResponse,
  NewNoteData,
  Note,
  Params,
} from "@/types/note";
import type { AxiosResponse } from "axios";

export const registration = async (user: AuthCredentials): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/register", user);
  return data;
};

export const login = async (user: AuthCredentials): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", user);
  return data;
};

export const logout = async () => {
  const { data } = await nextServer.post<{ success: boolean }>("/auth/logout");
  return data.success;
};

// ✅ для клієнта: повертає лише success (boolean)
export async function checkSessionClient(): Promise<boolean> {
  const { data } = await nextServer.get<CheckSession>("/auth/session");
  return data.success;
}

// ✅ для middleware: повертає весь об'єкт відповіді Axios
export async function checkSessionServer(): Promise<AxiosResponse<CheckSession>> {
  return await nextServer.get<CheckSession>("/auth/session");
}

export async function userInfoClient() {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

export async function updateUser(user: Partial<User>) {
  const { data } = await nextServer.patch<User>("/users/me", user);
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
