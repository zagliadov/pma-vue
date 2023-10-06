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
  avatar_filename?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}

export interface ISubtask {
  id: number;
  name: string;
  status: string;
  subtask_goal_start: Date;
  subtask_goal_end: Date;
  file_name: string[];
  description: string;
  task: ITask[];
  taskId: number;
  blockedBy: ISubtask[];
  blockedById: number;
  blockingSubtasks: ISubtask[];
  subtaskAssignee: any;
}
export interface ITask {
  id: number;
  name: string;
  status: string;
  description: string;
  taskFiles: string[];
  task_goal_start: Date | null;
  task_goal_end: Date | null;
  projectId: number;
  subtasks: any;
  blockedBy: ITask[];
  blockedById: number | null;
  blockingTasks: ITask[];
  taskAssignee: ITaskAssignee[];
}

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

export interface IAssigneeProjects {
  description: string;
  id: number;
  name: string;
  workspaceId: number;
}
export interface IProject extends IAssigneeProjects {
  workspace: IWorkspace[];
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

export interface ICreateAccountRequest {
  username: string;
  workspace: string;
  email: string;
  password: string;
}