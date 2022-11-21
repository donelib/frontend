import Button from "../button/Button";
import Tag from "../tag/Tag";
import styles from "./TagDetail.module.scss";

interface TagDetailProps {
  id: number;
  name: string;
  color: number;
  deleteOnClick?: (id: number)=>void;
  modifyOnClick?: (id: number)=>void;
};

const TagDetail = (props: TagDetailProps) => {
  const deleteOnClick = () => {
    if (props.deleteOnClick) {
      props.deleteOnClick(props.id);
    }
  };

  const modifyOnClick = () => {
    if (props.modifyOnClick) {
      props.modifyOnClick(props.id);
    }
  };

  return (
    <div className={styles.tagDetail}>
      <div className={styles.tagExample}>
        <Tag {...props}/>
      </div>
      <div className={styles.tagDetailBox}>
        <div className={styles.tagInfo}>
          <div className={styles.tagName}>
            태그명: {props.name}
          </div>
          <div className={styles.tagColor}>
            색상: #{props.color.toString()}
          </div>
        </div>
        <div className={styles.actionBox}>
          <Button className={styles.actionButton} onClick={modifyOnClick}>수정</Button>
          <Button className={styles.actionButton} onClick={deleteOnClick}>삭제</Button>
        </div>
      </div>
    </div>
  );
};

export default TagDetail;