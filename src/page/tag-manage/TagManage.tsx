import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import * as tagRepository from "../../api/tag.repository";
import Button from "../../component/button/Button";
import TagDetailList from "./TagDetailList";
import { tagListState } from "./../../recoil/tagAtom";

const TagManage = () => {
  const [tagList, setTagList] = useRecoilState(tagListState);
  const navigate = useNavigate();
 
  useEffect(() => {
    const initTagList = async () => {
      const res = await tagRepository.getTagList();
      setTagList(res);
    };
    initTagList();
  }, [setTagList]);

  return (
    <div> 
      <TagDetailList tagList={tagList} /> 
      <Button onClick={() => {navigate("/add-tag")}}>
        태그 추가하기
      </Button>
    </div>
  );
};

export default TagManage;