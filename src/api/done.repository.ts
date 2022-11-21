import axios from "axios";
import { DoneInfo } from "./data/DoneInfo";

class GetDoneListRequest {
    doneAtFrom: string;
    doneAtTo: string;

    constructor(doneAtFrom: Date, doneAtTo: Date) {
        this.doneAtFrom = doneAtFrom.toISOString()
        this.doneAtTo = doneAtTo.toISOString();
    }
}

export const getDoneList = async (from: Date, to: Date) : Promise<DoneInfo[]> => {
    const res = await axios.get("/api/done",{
        params: new GetDoneListRequest(from, to)
    });
    return res.data;
}
class AddDoneRequest {
    name: string;
    doneAt: string;
    tagList: number[];

    constructor(name: string, doneAt: Date, tagList: number[]) {
        this.name = name;
        this.doneAt = doneAt.toISOString();
        this.tagList = tagList; 
    }
}

export const postAddDone = async (name: string, doneAt: Date, tagList: number[]) : Promise<DoneInfo> => {
    const body = new AddDoneRequest(name, doneAt, tagList);
    const res = await axios.post("/api/done", body); 
    return res.data;
}