import { numToHexColor } from "../../utils/Color";
import Tag from "../tag/Tag";
import styles from "./TagDetail.module.scss";

interface TagDetailProps {
  id: number;
  name: string;
  color: number;
  onClick?: (id: number)=>void;
};

const TagDetail = (props: TagDetailProps) => {
  const onClick = () => {
    if (props.onClick) {
      props.onClick(props.id);
    }
  };

  return (
    <div className={styles.tagDetail} onClick={onClick}>
      <div className={styles.tagExample}>
        <Tag name={props.name} color={props.color}/>
      </div>
      <div className={styles.tagDetailBox}>
        <div className={styles.tagInfo}>
          <div className={styles.tagName}>
            태그명: {props.name}
          </div>
          <div className={styles.tagColor}>
            색상: {numToHexColor(props.color)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagDetail;