import { useNavigate } from "react-router-dom";
import Button from "../../component/button/Button";
import TagDetailList from "./TagDetailList";

const TagManage = () => {
  const navigate = useNavigate();
 
  return (
    <div> 
      <TagDetailList /> 
      <Button onClick={() => {navigate("/tag/add")}}>
        태그 추가하기
      </Button>
    </div>
  );
};

export default TagManage;