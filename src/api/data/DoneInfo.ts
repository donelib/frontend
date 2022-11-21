import TagInfo from "./TagInfo";

export interface DoneInfo {
  id: number;
  name: string;
  tags: TagInfo[];
  doneAt: Date;
}

export default DoneInfo;
