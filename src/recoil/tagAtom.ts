import { atom, selectorFamily } from "recoil";
import { defualtTagFormData } from "../component/tag-form/TagForm";
import { TagInfo } from "../api/data/TagInfo";
import { numToHexColor } from "../utils/Color";

export const tagListState = atom<Array<TagInfo>>({
  key: "tagListState",
  default: [],
});

export const getTagByIdToFormData = selectorFamily({
  key: "getTagByid",
  get: (tagId: number) => ({get}) => {
    const tagList = get(tagListState);
    const tag = tagList.find(tag => tag.id === tagId);
    if (tag === undefined) 
      return defualtTagFormData;
    const color = numToHexColor(tag.color);
    return {
      name: tag.name,
      color: color
    };
  },
});
