
import { atom } from "recoil";
import { DoneInfo } from "./../api/data/DoneInfo";

export const modifyDoneState = atom<DoneInfo>({
  key: "modifyDoneState",
  default: { 
    id: -1, 
    name: "", 
    tags: [], 
    doneAt: new Date(),
  },
});