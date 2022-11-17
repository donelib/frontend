import TagInfo from "./TagInfo";

export interface DoneInfo {
  id: Number;
  name: String;
  tags: TagInfo[];
  doneAt: Date;
}

export default DoneInfo;
