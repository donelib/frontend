import { useState, ChangeEvent } from"react";
import { useNavigate } from "react-router-dom";
import { postAddTag } from "../../api/tag.repository";
import AppBar from "../../component/appbar/AppBar";
import BackButtonToolBar from "../../component/appbar/toolbar/BackButtonToolBar";
import Button from "../../component/button/Button";
import styles from "./AddTag.module.scss";

const AddTag = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const [isIdleAddTag, setIsIdleAddTag] = useState<boolean>(true);

  const addTag = async () => {
    try {
      setIsIdleAddTag(false);
      const data = await postAddTag({name: name, color: 10337444});
      console.log(data);
      navigate("/tag-manage");
    } catch (error) {
      alert(error);
    } finally {
      setIsIdleAddTag(true);
    }
  };

  const submitOnClick = () => {
    if (name.length === 0) {
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
      <div className={styles.formContainer}>
        <div>
          <div className={styles.label}>태그명</div>
          <input className={styles.nameArea} placeholder="태그명" onChange={onChangeName} value={name} />
        </div>
        <Button className={styles.submitButton} onClick={submitOnClick}>
          추가하기
        </Button>
      </div>
    </div>
  );
};

export default AddTag;