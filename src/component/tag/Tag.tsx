import styles from "./Tag.module.scss";
import iconClose from "../../assets/icon_close.svg";

export interface TagProps {
  name: String;
  color: Number;
  hasDeleteButton?: Boolean;
  onClick?: () => void;
}

const Tag = (props: TagProps) => {
  return (
    // color -> trans to hex code
    // text color -> by backgroundColor
    <div className={styles.tag} style={{backgroundColor:"aqua"}} onClick={props.onClick}> 
      <div className={`${styles.tagName} ${props.hasDeleteButton && styles.hasButton}`}>{props.name}</div>
      {
        props.hasDeleteButton && <img className={styles.tagButton} src={iconClose} alt="delete"/>
      }
    </div>
  );
};

export default Tag;