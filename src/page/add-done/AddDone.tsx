
import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import iconBack from "../../assets/icon_back.svg";
import Button from "../../component/button/Button";
import { getTagList } from "../../api/tag.repository";
import TagInfo from "../../api/data/TagInfo";
import Tag from "../../component/tag/Tag";
import { postAddDone } from "../../api/done.repository";
import styles from "./AddDone.module.scss";
import ToolBar from "../../component/appbar/toolbar/ToolBar";
import AppBar from "../../component/appbar/AppBar";

const AddDone = () => {
  const [content, setContent] = useState("");
  const [tagList, setTagList] = useState<TagInfo[]>([]);
  const [selectedTagSet, setSelectedTagSet] = useState<Set<number>>(new Set());
  const [isIdleAddDone, setIsIdleAddDone] = useState<boolean>(true);
  const navigate = useNavigate();

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const fetchTagList = async () => {
    const data = await getTagList();
    setTagList(data);
  };

  const tagOnClick = (tagInfo: TagInfo, isAddMode: boolean) =>{
    return () => {
      if (isAddMode) {
        setSelectedTagSet(prev => new Set(prev.add(tagInfo.id)));
      } else {
        setSelectedTagSet(prev => {
          const next = new Set(prev);
          next.delete(tagInfo.id);
          return next;
        });
      }
    };
  } 

  const addDone = async () => {
    try {
      setIsIdleAddDone(false);
      const data = await postAddDone(content, new Date(), Array.from(selectedTagSet));
      console.log(data);
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setIsIdleAddDone(true);
    }
  }

  const submitOnClick = () => {
    if (content.length === 0) {
      alert("내용이 필요합니다.");
      return;
    }
    if (isIdleAddDone) {
      addDone();
    } else {
      alert("이미 요청중입니다");
    }
  } 

  useEffect(() => {
    fetchTagList();
  },[]);

  return (
    <div className={styles.container}>
      <AppBar>
        <ToolBar imgSrc={iconBack} onClick={()=>{navigate(-1)}}/>
      </AppBar>
      <div className={styles.formContainer}>
        <div>
          <div className={styles.label}>내용</div>
          <textarea className={styles.contentArea} placeholder="내용" onChange={onChangeContent} value={content} />
        </div>
        <div>
          <div className={styles.label}>태그</div>
          <div>
            <div>선택한 태그</div>
            <div className={styles.tagContainer}>
              {
                tagList.filter(tag => {
                  return selectedTagSet.has(tag.id)
                }).map(tagInfo => {
                  return <Tag {...tagInfo} key={tagInfo.id.toString()} onClick={tagOnClick(tagInfo, false)} hasDeleteButton={true}/>
                })
              }
            </div>
            <div>태그 목록</div>
            <div className={styles.tagContainer}>
              {
                tagList.filter(tag => {
                  return !selectedTagSet.has(tag.id)
                }).map(tagInfo => {
                  return <Tag {...tagInfo} key={tagInfo.id.toString()} onClick={tagOnClick(tagInfo, true)}/>
                })
              }
            </div>
          </div>
        </div>
        <Button className={styles.submitButton} onClick={submitOnClick}>
          추가하기
        </Button>
      </div>
    </div>
  );
};

export default AddDone;