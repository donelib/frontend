import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.scss";
import AddDone from "./page/add-done/AddDone";
import AddTag from "./page/add-tag/AddTag";
import DoneList from "./page/done-list/DoneList";
import Login from "./page/login/Login";
import Main from "./page/main/Main";
import ModifyTag from "./page/modify-tag/ModifyTag";
import TagManage from "./page/tag-manage/TagManage";

const App = () => {
  return (
    <div className={styles.container}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<DoneList/>}/>
          <Route path="/tag" element={<TagManage/>}/>
        </Route>
        <Route path="/tag/modify/:tagId" element={<ModifyTag />}/>
        <Route path="/done/add" element={<AddDone />}/>
        <Route path="/tag/add" element={<AddTag />}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
