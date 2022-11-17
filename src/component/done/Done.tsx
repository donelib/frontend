import TagInfo from "../../api/data/TagInfo";
import Tag from "../tag/Tag";
import styles from "./Done.module.scss";

export interface DoneProps {
  id: Number;
  name: String;
  tags: TagInfo[];
  doneAt: Date;
}

const Done = (props:  DoneProps) => {
  return (
    <div className={styles.done}>
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