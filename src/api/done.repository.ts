import { api } from "./apiConfig";
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
    const res = await api.get("/api/done",{
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
    const res = await api.post("/api/done", body); 
    return res.data;
}

export const deleteDone = async (id: number) => {
    return api.delete(`/api/done` + id);
}

export interface PutDoneRequest {
    name: string;
    tagList: number[];
    doneAt: Date;
} 

export const putDone = async (id: number, body: PutDoneRequest) => {
    const res =  await api.put(`/api/done/` + id, body);
    return res.data;
}