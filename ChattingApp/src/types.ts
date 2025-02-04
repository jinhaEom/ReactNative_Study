export type RootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

export interface User {
  userId: string;
  email: string;
  name: string;
}

export enum Collections {
  USERS = 'users',
}
