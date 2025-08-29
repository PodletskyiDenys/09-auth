import { AxiosError } from "axios";

export type CheckSession = {
  success: boolean;
};

export type ApiError = AxiosError<{ error: string }>