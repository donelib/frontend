import styles from "./Tag.module.scss";
import iconClose from "../../assets/icon_close.svg";
import iconCloseWhite from "../../assets/icon_close_white.svg";
import { isDarker, numToHexColor } from "../../utils/Color";

export interface TagProps {
  name: string;
  color: number;
  hasDeleteButton?: boolean;
  onClick?: () => void;
}

const Tag = (props: TagProps) => {
  const textColorByBackgroundColor = (color: number) => {
    return isDarker(color) ? "#ffffff" : "#000000";
  }
  const iconByBackgroundColor = (color: number) => {
    return isDarker(color) ? iconCloseWhite : iconClose;
  }
  return (
    <div className={styles.tag} 
        style={{backgroundColor: numToHexColor(props.color), 
              color: textColorByBackgroundColor(props.color)}} 
        onClick={props.onClick}> 
      <div className={`${styles.tagName} ${props.hasDeleteButton && styles.hasButton}`}>{props.name}</div>
      {
        props.hasDeleteButton && <img className={styles.tagButton} src={iconByBackgroundColor(props.color)} alt="delete"/>
      }
    </div>
  );
};

export default Tag;