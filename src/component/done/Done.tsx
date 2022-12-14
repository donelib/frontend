import TagInfo from "../../api/data/TagInfo";
import Tag from "../tag/Tag";
import styles from "./Done.module.scss";

export interface DoneProps {
  id: number;
  name: string;
  tags: TagInfo[];
  doneAt: Date;
  onClick?: (id: number) => void;
}

const Done = (props:  DoneProps) => {

  const onClick = () => {
    if (props.onClick)
      props.onClick(props.id);
  }

  return (
    <div className={styles.done} onClick={onClick}>
      <div className={styles.doneContent}>{props.name}</div>
      {
        props.tags &&
        <div className={styles.tagContainer}> 
        {
          props.tags.map((tag) => {
            return <Tag {...tag} hasDeleteButton={false} key={tag.id.toString()}/>
          })
        }
        </div>
      }
    </div>
  );
};

export default Done;