import styles from "./ToolBar.module.scss";

interface ToolBarProps {
  imgSrc?: string;
  onClick?: ()=>void;
};

const ToolBar = (props: ToolBarProps) => {
  return (
   <div className={styles.toolBar}>
      <div className={styles.title}>Donelib</div>
      <img src={props.imgSrc} alt="tag settings" onClick={props.onClick} />
   </div>
  );
};

export default ToolBar;