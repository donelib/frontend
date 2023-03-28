import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AddDone from "./page/add-done/AddDone";
import AddTag from "./page/add-tag/AddTag";
import Login from "./page/login/Login";
import Main from "./page/main/Main";
import ModifyTag from "./page/modify-tag/ModifyTag";
import TagManage from "./page/tag-manage/TagManage";
import ModifyDone from "./page/modify-done/ModifyDone";
import styled from "styled-components";
import Analyze from "./page/analyze/Analyze";

const Root = styled.div`
  width: 100vw;
  min-width: 300px;
  min-height: 100vh;
  margin: 0 auto 0 auto;
`;

const App = () => {
  return (
    <Root>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/tag" element={<TagManage />} />
          <Route path="/tag/add" element={<AddTag />} />
          <Route path="/tag/modify/:tagId" element={<ModifyTag />} />
          <Route path="/done/add" element={<AddDone />} />
          <Route path="/done/modify/:doneId" element={<ModifyDone />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </Root>
  );
};

export default App;
