import { ReactElement } from "react"
import Tab from "./tab/Tab";
import styles from "./TabBar.module.scss";

interface TabBarProps {
  children: ReactElement<typeof Tab> | ReactElement<typeof Tab>[]
}

const TabBar = (props: TabBarProps) => {
  return (
   <div className={styles.tabBar}>
      {
        props.children
      }
   </div>
  );
};

export default TabBar;