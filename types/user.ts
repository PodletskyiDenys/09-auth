export type UserRequest = {
  email: string;
  password: string;
};

export interface UserMe {
  username: string;
  email: string;
  avatar: string;
}
