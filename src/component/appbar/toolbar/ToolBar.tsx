import styles from "./ToolBar.module.scss";

interface ToolBarProps {
  imgSrc?: string;
  onClick?: ()=>void;
};

const ToolBar = (props: ToolBarProps) => {
  return (
   <div className={styles.toolBar}>
      <div className={styles.title}>Donelib</div>
      {
        props.imgSrc ? <img src={props.imgSrc} alt="tag settings" onClick={props.onClick} />
          :<div className={styles.space}/>
      }
   </div>
  );
};

export default ToolBar;