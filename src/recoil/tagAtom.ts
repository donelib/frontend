import { atom, selector, selectorFamily, SetterOrUpdater, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { defaultTagFormData } from "../component/tag-form/TagForm";
import { TagInfo } from "../api/data/TagInfo";
import { numToHexColor } from "../utils/Color";
import { getTagList } from "../api/tag.repository";
import { useMemo } from "react";

export const tagListState = atom<Array<TagInfo>>({
  key: "tagListState",
  default: selector({
    key: 'CurrentUserID/Default',
    get: () => {
      return getTagList();
    },
  }),
});

export const getTagByIdToFormData = selectorFamily({
  key: "getTagByid",
  get: (tagId: number) => ({get}) => {
    const tagList = get(tagListState);
    const tag = tagList.find(tag => tag.id === tagId);
    if (tag === undefined) 
      return defaultTagFormData;
    const color = numToHexColor(tag.color);
    return {
      name: tag.name,
      color: color
    };
  },
});

export const useTagList: () => [TagInfo[], SetterOrUpdater<TagInfo[]>] = () => {
  const setTagList = useSetRecoilState(tagListState);
  const tagListLoadable = useRecoilValueLoadable(tagListState);
  const tagList = useMemo(() => {
    return tagListLoadable?.state === "hasValue" ? tagListLoadable.contents : [];
  }, [tagListLoadable]);
  return [tagList, setTagList];
}

export const useTagListValue = () => {
  const [tagList] = useTagList();
  return tagList;
}