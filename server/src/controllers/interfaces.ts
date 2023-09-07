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
  id?: number;
  userId: number;
  email: string;
  projectId: number;
  projectCreator: boolean;
  isEmailConfirmed: boolean;
}

export interface ITaskAssignee {
  id: number;
  email: string;
  userId: number;
  projectCreator: boolean;
  isEmailConfirmed: boolean;
  avatar_filename?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
}

export interface ITask {
  id: number;
  name: string;
  status: string;
  description: string;
  taskFiles: any;
  task_goal_start: boolean | null;
  task_goal_end: boolean | null;
  projectId: number;
  subtasks: any;
  blockedBy: any;
  blockedById: number | null;
  blockingTasks: any;
  taskAssignee: ITaskAssignee[];
}

export interface IProject {
  id: number;
  name: string;
  description: string;
  workspaceId: number;
  tasks: ITask[];
  projectAssignees: IProjectAssignees[]
}