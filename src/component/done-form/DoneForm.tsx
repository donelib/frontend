import Tag from "../tag/Tag";
import styles from "./DoneForm.module.scss";
import { ChangeEvent, MutableRefObject, useCallback, useEffect, useState } from "react";
import TagInfo from "../../api/data/TagInfo";
import { useTagList } from "./../../recoil/tagAtom";

export interface DoneFormData {
  name: string;
  tags: Array<number>;
  doneAt: Date;
}

export const defaultDoneFormData = {
  name: "",
  tags: [],
  doneAt: new Date(),
}

interface DoneFormProps {
  formRef: MutableRefObject<DoneFormData>;
}

const DoneForm = ({formRef}: DoneFormProps) => {
  const tagList = useTagList();
  const [done, setDone] = useState<DoneFormData>(formRef.current)
  
  useEffect(() => {
    formRef.current = done;
  }, [formRef, done]);

  const tagOnClick = (tagInfo: TagInfo, isAddMode: boolean) =>{
    return () => {
      const newTags = done.tags;
      if (isAddMode) {
        const exist = newTags.find(tag => tagInfo.id === tag)
        if (exist === undefined)
          newTags.push(tagInfo.id);
      } else {
        const idx = newTags.findIndex(tag => {
          return tag === tagInfo.id
        })
        if (idx > -1)
          newTags.splice(idx, 1);
      }
      setDone(prev => ({...prev, tags: newTags}))
    };
  } 
  
  const onChangeContent = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setDone(oldTag => ({...oldTag, name: e.target.value}));
  }, [setDone]);

  return (
    <div className={styles.formContainer}>
        <div>
          <div className={styles.label}>내용</div>
          <textarea className={styles.contentArea} placeholder="내용" onChange={onChangeContent} value={done.name} />
        </div>
        <div>
          <div className={styles.label}>태그</div>
          <div>
            <div>선택한 태그</div>
            <div className={styles.tagContainer}>
              {
                tagList.filter(tag => {
                  return done.tags.includes(tag.id)
                }).map(tagInfo => {
                  return <Tag {...tagInfo} key={tagInfo.id.toString()} onClick={tagOnClick(tagInfo, false)} hasDeleteButton={true}/>
                })
              }
            </div>
            <div>태그 목록</div>
            <div className={styles.tagContainer}>
              {
                tagList.filter(tag => {
                  return !done.tags.includes(tag.id)
                }).map(tagInfo => {
                  return <Tag {...tagInfo} key={tagInfo.id.toString()} onClick={tagOnClick(tagInfo, true)}/>
                })
              }
            </div>
          </div>
        </div>
      </div>
  );
}

export default DoneForm;