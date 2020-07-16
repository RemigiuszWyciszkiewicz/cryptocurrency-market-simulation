export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
}

export interface SignIn {
  email: string;
  password: string;
}
