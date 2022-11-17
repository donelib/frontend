import axios from "axios";
import { DoneInfo } from "./data/DoneInfo";

class GetDoneListRequest {
    doneAtFrom: String;
    doneAtTo: String;

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
    name: String;
    doneAt: String;
    tagList: Number[];

    constructor(name: String, doneAt: Date, tagList: Number[]) {
        this.name = name;
        this.doneAt = doneAt.toISOString();
        this.tagList = tagList; 
    }
}

export const postAddDone = async (name: String, doneAt: Date, tagList: Number[]) : Promise<DoneInfo> => {
    const body = new AddDoneRequest(name, doneAt, tagList);
    const res = await axios.post("/api/done", body); 
    return res.data;
}