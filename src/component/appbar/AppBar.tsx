import { ReactElement } from "react";
import TabBar from "./tabbar/TabBar";
import ToolBar from "./toolbar/ToolBar";
import styles from "./AppBar.module.scss";

type child = (ReactElement<typeof ToolBar>| ReactElement<typeof TabBar>);

interface AppBarProps {
  children: child | child[] 
}

const AppBar = (props: AppBarProps) => {
  return (
   <div className={styles.appBar}>
      {
        props.children
      }
   </div>
  );
};

export default AppBar;