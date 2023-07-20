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

export interface IProject {
  id: number;
  name: string;
  description: string;
  workspace: IWorkspace[];
  workspaceId: number;
  tasks: any;
  projectAssignees: any;
}