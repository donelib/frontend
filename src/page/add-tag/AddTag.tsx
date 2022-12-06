import { useState } from"react";
import { useNavigate } from "react-router-dom";
import { postAddTag } from "../../api/tag.repository";
import AppBar from "../../component/appbar/AppBar";
import BackButtonToolBar from "../../component/appbar/toolbar/BackButtonToolBar";
import Button from "../../component/button/Button";
import TagForm, { defualtTagFormData, TagFormData } from "../../component/tag-form/TagForm";
import { hexColorToNum } from "../../utils/Color";
import styles from "./AddTag.module.scss";

const AddTag = () => {
  const navigate = useNavigate();
  const [tagFormData, setTagFormData] = useState<TagFormData>(defualtTagFormData);
  const [isIdleAddTag, setIsIdleAddTag] = useState<boolean>(true);

  const addTag = async () => {
    try {
      setIsIdleAddTag(false);
      const data = await postAddTag({name: tagFormData.name, color: hexColorToNum(tagFormData.color)});
      console.log(data);
      navigate("/tag-manage");
    } catch (error) {
      alert(error);
    } finally {
      setIsIdleAddTag(true);
    }
  };

  const submitOnClick = () => {
    if (tagFormData.name.length === 0) {
      alert("태그명을 입력해주세요");
      return;
    }
    if (isIdleAddTag) {
      addTag();
    } else {
      alert("이미 요청중입니다");
    }
  } 

  return (
    <div>
      <AppBar>
        <BackButtonToolBar/>
      </AppBar>
      <TagForm tag={tagFormData} setTag={setTagFormData}/>
      <Button className={styles.submitButton} onClick={submitOnClick}>
        추가하기
      </Button>
    </div>
  );
};

export default AddTag;