import { useState, ChangeEvent } from"react";
import { CirclePicker } from "react-color";
import { useNavigate } from "react-router-dom";
import { postAddTag } from "../../api/tag.repository";
import AppBar from "../../component/appbar/AppBar";
import BackButtonToolBar from "../../component/appbar/toolbar/BackButtonToolBar";
import Button from "../../component/button/Button";
import Tag from "../../component/tag/Tag";
import { hexColorToNum } from "../../utils/Color";
import styles from "./AddTag.module.scss";

const AddTag = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#f44336");
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const [isIdleAddTag, setIsIdleAddTag] = useState<boolean>(true);

  const addTag = async () => {
    try {
      setIsIdleAddTag(false);
      const data = await postAddTag({name: name, color: hexColorToNum(color)});
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
          <div className={styles.label}>태그 색상</div>
          <CirclePicker width="auto" circleSize={32} circleSpacing={16} onChange={(color) => {setColor(color.hex)}} color={color} />
        </div>
        <div className={styles.example}>
          <Tag name={name} color={hexColorToNum(color)}/>
        </div>
        <Button className={styles.submitButton} onClick={submitOnClick}>
          추가하기
        </Button>
      </div>
    </div>
  );
};

export default AddTag;