import axios from "axios";
import TagInfo from "./data/TagInfo";

export const getTagList = async () : Promise<TagInfo[]> => {
    const res = await axios.get(`/api/tag`);
    return res.data;
}

export const deleteTag = async (id: number) => {
    await axios.delete(`/api/tag/${id}`);
}