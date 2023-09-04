export interface IAddNewProjectData {
  workspaceId: number;
  projectName: string;
  projectMembers: string[];
  projectDescription: string;
}
export interface IWorkspace {
  id: number;
  name: string;
  author: any;
  authorId: number;
  projects: IProject[];
}

export interface IProjectAssignees {
  id: number;
  userId: number;
  email: string;
  project: IProject[];
  projectId: number;
  projectCreator: boolean;
  isEmailConfirmed: boolean;
}

export interface ITasks {}

export interface ITaskAssignee {
  email: string;
  avatar_filename?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  id?: number;
}
export interface ICreateTask {
  taskName: string;
  taskDescription: string;
  taskColor: string;
  taskStatus: string;
  taskAssignee: ITaskAssignee[];
}

export interface IPersonalInformation {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  language: string;
  timezone: string;
  startOfTheCalendarWeek: string;
  timeFormat: string;
  dateFormat: string;
}
export interface IProject {
  id: number;
  name: string;
  description: string;
  workspace: IWorkspace[];
  workspaceId: number;
  tasks: any;
  projectAssignees: IProjectAssignees[];
}

export interface IExistingUser {
  avatar_filename: string | null;
  id: number;
  name: string;
  email: string;
  password: string;
  workspace: IWorkspace[];
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  language?: string;
  timezone?: string;
  startOfTheCalendarWeek?: string;
  timeFormat?: string;
  dateFormat?: string;
}

export interface IMembers {
  id: number;
  userId: number;
  projectCreator: boolean;
  isEmailConfirmed: boolean;
  avatar_filename?: string | null;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  name?: string | null;
}