interface IUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
  address: unknown;
  company: unknown;
}

interface IUsersListInitialState {
  usersList: IUser[];
}

export type { IUser, IUsersListInitialState };
