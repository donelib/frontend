import styles from "./Main.module.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppBar from "../../component/appbar/AppBar";
import ToolBar from "../../component/appbar/toolbar/ToolBar";
import TabBar from "../../component/appbar/tabbar/TabBar";
import Tab from "../../component/appbar/tabbar/tab/Tab";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabOnClick = (destination: string) => {
    return () => {
      navigate(destination);
    }
  }

  return (
    <div className={styles.mainContainer}>
      <AppBar>
        <ToolBar />
        <TabBar>
          <Tab name={"Done"} isSelected={location.pathname === "/"} onClick={tabOnClick("/")}/>
          <Tab name={"Tag"} isSelected={location.pathname === "/tag"} onClick={tabOnClick("/tag")}/>
        </TabBar>
      </AppBar>
      {
        <Outlet/>
      }
    </div>
  );
};

export default Main;