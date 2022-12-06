import { ChangeEvent, useState } from "react";
import { CirclePicker, ColorResult } from "react-color";
import internal from "stream";
import TagInfo from "../../api/data/TagInfo";
import { hexColorToNum } from "../../utils/Color";
import Tag from "../tag/Tag";
import styles from "./TagForm.module.scss";

interface TagFormProps {
  tag: TagFormData
  setTag: React.Dispatch<React.SetStateAction<TagFormData>>
}

export interface TagFormData {
  name: string;
  color: string;
}

export const defualtTagFormData = {
  name: "",
  color: "#f44336"
}

const TagForm = ({tag, setTag}: TagFormProps) => {
  
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setTag(oldTag => ({...oldTag, name: e.target.value}));
  };
  const onChangeColor = (color: ColorResult) => {
    setTag(oldTag => ({...oldTag, color: color.hex}))
  }

  return (
    <div className={styles.formContainer}>
      <div>
        <div className={styles.label}>태그명</div>
        <input className={styles.nameArea} placeholder="태그명" onChange={onChangeName} value={tag.name} />
        <div className={styles.label}>태그 색상</div>
        <CirclePicker width="auto" circleSize={32} circleSpacing={16} onChange={onChangeColor} color={tag.color} />
      </div>
      <div className={styles.example}>
        <Tag name={tag.name} color={hexColorToNum(tag.color)}/>
      </div>
    </div>
  );
};

export default TagForm;