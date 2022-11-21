import {useState, useEffect, useCallback} from "react";
import { useNavigate } from "react-router-dom";
import TagInfo from "../../api/data/TagInfo";
import * as tagRepository from "../../api/tag.repository";
import Button from "../../component/button/Button";
import Modal from "../../component/modal/Modal";
import TagDetail from "../../component/tag-detail/TagDetail";
import styles from "./TagManage.module.scss";

const TagManage = () => {
  const [tagList, setTagList] = useState<TagInfo[]>([]);
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState<number | null>(null);

  const initTagList = async () => {
    const res = await tagRepository.getTagList();
    setTagList(res);
  };

  const deleteButtonOnClick = (id: number) => {
    setSelectedTag(id);
  }

  const deleteTag = async (id: number) => {
    await tagRepository.deleteTag(id);
    setTagList(prev => {
      return prev.filter((tag)=>{ return tag.id !== id });
    });
  };

  const deleteSelectedTag = useCallback(() => {
    if (selectedTag) {
      deleteTag(selectedTag);
      setSelectedTag(null);
    }
  }, [selectedTag]);

  useEffect(() => {
    initTagList();
  }, []);

  return (
    <div> 
      <div className={styles.tagDetailContainer}>
      {
        tagList.map((tag) => {
          return <TagDetail key={tag.id.toString()} {...tag} deleteOnClick={()=>{deleteButtonOnClick(tag.id)}}/>
        })
      }
      </div>
      <Button onClick={() => {navigate("/add-tag")}}>
        태그 추가하기
      </Button>
      <Modal isShow={selectedTag != null}>
        <div className={styles.modalContainer}>
          <div className={styles.modalTitle}>태그 삭제</div>
          <div className={styles.modalDescription}>모든 done에서 해당 태그가 삭제됩니다.</div>
          <div className={styles.modalActionContainer}>
            <Button className={styles.modalActionButton} onClick={deleteSelectedTag}>삭제</Button>
            <Button className={styles.modalActionButton} onClick={() => {setSelectedTag(null);}}>취소</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TagManage;