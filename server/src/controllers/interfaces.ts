export interface IDecodedToken {
  id: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

export interface IUserData {
  firstName?: string;
  lastName?: string;
  name?: string;
  phoneNumber?: string;
  language?: string;
  timezone?: string;
  startOfTheCalendarWeek?: string;
  timeFormat?: string;
  dateFormat?: string;
}

export interface IUserCreate {
  username: string;
  workspace: string;
  email: string;
  password: string;
}

export interface CreateUserInput {
  username: string;
  email: string;
  bcrypt_password: string;
}

export interface CreateUserOutput {
  userId: number;
}

export interface IProjectAssignees {
  userId: number;
  email: string;
  projectId: number;
  projectCreator: boolean;
  isEmailConfirmed: boolean;
}