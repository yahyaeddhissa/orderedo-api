export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  isVerified: boolean;
  isMember: boolean;
}

export interface CreateUserInput {
  name: string;
  username: string;
  email: string;
}
