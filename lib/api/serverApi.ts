// lib/api/serverApi.ts
import { UserMe } from "@/types/user";
import { nextServer } from "./api";
import type { FetchNotesResponse, Note, Params } from "../../types/note";
import { cookies } from "next/headers";
import type { CheckSession } from "@/types/response";

// Простий чек чи є валідна сесія
export async function checkSessionServer(): Promise<boolean> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<CheckSession>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data.success;
}

// Оновлення сесії через refreshToken
export async function refreshSessionServer(refreshToken: string): Promise<Response | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/session`, {
      method: "GET",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      credentials: "include",
    });
    return res;
  } catch (err) {
    console.error("refreshSessionServer error:", err);
    return null;
  }
}

export async function userInfoServer() {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<UserMe>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchNotes(
  searchValue: string = "",
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

  const response = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
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
