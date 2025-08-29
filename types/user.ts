export interface User {
  username: string;
  email: string;
  avatar: string;
}

export type AuthCredentials = {
  email: string;
  password: string;
};
