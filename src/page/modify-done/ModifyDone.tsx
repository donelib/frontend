import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { modifyDoneState } from "./../../recoil/doneAtom";
import DoneForm, { DoneFormData } from "./../../component/done-form/DoneForm";
import { useEffect, useRef, useState } from "react";
import { DoneInfo } from "./../../api/data/DoneInfo";
import AppBar from "../../component/appbar/AppBar";
import BackButtonToolBar from "../../component/appbar/toolbar/BackButtonToolBar";
import Button from "./../../component/button/Button";
import ConfirmModal from "./../../component/modal/confirm-modal/ConfirmModal";
import * as doneApi from "../../api/done.repository";

const doneToDoneFormData = (done: DoneInfo) => {
  return {
    name: done.name,
    tags: done.tags.map(tag => tag.id),
    doneAt: done.doneAt,
  }
}

const ModifyDone = () => {
  const navigate = useNavigate();
  const [isShowDeleteModal, setShowDeleteModal] = useState(false)
  const defaultDone = useRecoilValue(modifyDoneState);
  const formRef = useRef<DoneFormData>(doneToDoneFormData(defaultDone));
  const { doneId } = useParams();

  useEffect(() => {
    if (defaultDone.id === -1)
      navigate("/");
  }, [defaultDone, navigate]);
  
  const navigateToMain = () => {
    navigate("/");
  }

  const showDeleteModal = () => {
    setShowDeleteModal(true);
  }

  const deleteOnClick = async () => {
    await deleteTag();
    navigateToMain();
  }

  const updateOnClick = () => {
    const func = async() => {
      console.log(formRef.current)
      const body = {
        name: formRef.current.name,
        tagList: formRef.current.tags,
        doneAt: formRef.current.doneAt
      };
      if (body.name.length === 0) {
        alert("내용을 입력해주세요");
        return;
      }
      await doneApi.putDone(Number(doneId), body);
      navigateToMain();
    };
    func();
  }

  const deleteTag = async () => {
    await doneApi.deleteDone(Number(doneId));
  }
  
  return (
    <div>
      <AppBar>  
        <BackButtonToolBar/>
      </AppBar>
      <DoneForm formRef={formRef} />
      <Button onClick={showDeleteModal}>
        삭제하기
      </Button>
      <Button onClick={updateOnClick}>
        수정완료
      </Button>
      <ConfirmModal isShow={isShowDeleteModal} 
                    title={"Done 삭제"} 
                    description={"정말 삭제하시겠습니까?"}
                    positiveOnClick={deleteOnClick}
                    negativeOnClick={() => {setShowDeleteModal(false)}} />  
    </div>
  );
}

export default ModifyDone;