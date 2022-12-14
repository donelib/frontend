import React, { useCallback, ChangeEvent, useState, useEffect, MutableRefObject } from "react";
import { CirclePicker, ColorResult } from "react-color";
import { hexColorToNum } from "../../utils/Color";
import Tag from "../tag/Tag";
import styles from "./TagForm.module.scss";

interface TagFormProps {
  formRef: MutableRefObject<TagFormData>;
}

export interface TagFormData {
  name: string;
  color: string;
}

export const defaultTagFormData = {
  name: "",
  color: "#f44336"
}

const TagForm = ({formRef}: TagFormProps) => {
  const [tag, setTag] = useState<TagFormData>(formRef.current);

  useEffect(() => {
    formRef.current = tag;
  }, [formRef, tag]);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTag(oldTag => ({...oldTag, name: e.target.value}));
  }, [setTag]);

  const onChangeColor = useCallback((color: ColorResult) => {
    setTag(oldTag => ({...oldTag, color: color.hex}))
  }, [setTag]);

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

export default React.memo(TagForm);