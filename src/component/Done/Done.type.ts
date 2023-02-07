import { TagInfo } from "./../../api/data/TagInfo";

export interface DoneProps {
  id: number;
  name: string;
  tags: TagInfo[];
  doneAt: Date;
  onClick?: (id: number) => void;
}
