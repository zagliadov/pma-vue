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

export interface IPersonalInformation {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNumber: string;
  language: "English" | "French" | "Spanish";
  timezone: "CET" | "EET" | "GMT" | "IST" | "CST" | "JST" | "AEST";
  startOfTheCalendarWeek: "Monday" | "Sunday";
  timeFormat: "24 hour" | "12 hour";
  dateFormat: "mm/dd/yyyy" | "dd/mm/yyyy";
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
}
