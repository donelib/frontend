import { api } from "./apiConfig";
import TagInfo from "./data/TagInfo";

export const getTagList = async () : Promise<TagInfo[]> => {
    const res = await api.get(`/api/tag`);
    return res.data;
}

export const deleteTag = async (id: number) => {
    await api.delete(`/api/tag/${id}`);
}

export interface AddTagRequest {
    name: string;
    color: number;
} 

export const postAddTag = async (body: AddTagRequest) => {
    const res = await api.post(`/api/tag`, body);
    return res.data;
}

export interface PutTagRequest {
    name: string;
    color: number;
} 

export const putTagById = async (id: number, body: PutTagRequest) => {
    const res = await api.put(`/api/tag/${id}`, body);
    return res.data;
}