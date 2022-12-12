import TagDetail from "./../../component/tag-detail/TagDetail";
import styles from "./TagDetailList.module.scss";
import { useNavigate } from "react-router-dom";
import React, { useCallback } from "react";
import TagInfo from "../../api/data/TagInfo";

const TagDetailList = ({ tagList }: {tagList: TagInfo[]}) => {
  const navigate = useNavigate();

  const onClick = useCallback((tagId: number) => {
    navigate("/tag/modify/" + tagId);
  }, [navigate]);

  return (
    <div className={styles.tagDetailContainer}>
      {
        tagList.map((tag) => {
          return <TagDetail key={tag.id.toString()} {...tag} onClick={onClick} />
        })
      }
    </div>
  );
}

export default React.memo(TagDetailList);