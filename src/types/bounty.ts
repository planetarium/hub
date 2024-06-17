export enum BountyStatus {
  "TODO" = "todo",
  "IN_PROGRESS" = "in-progress",
  "DONE" = "done",
}

export type BountyData = {
  id: string;
  price: number;
  status: BountyStatus;
  assignee: string | undefined;
  writer: string;
  title: string;
  summary: string;
  githubIssue: string;
  tags: Array<string>;
};
