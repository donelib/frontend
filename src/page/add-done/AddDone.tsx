
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../component/button/Button";
import { postAddDone } from "../../api/done.repository";
import styles from "./AddDone.module.scss";
import AppBar from "../../component/appbar/AppBar";
import BackButtonToolBar from "../../component/appbar/toolbar/BackButtonToolBar";
import DoneForm, { defaultDoneFormData } from "../../component/done-form/DoneForm";

const AddDone = () => {
  const formRef = useRef(defaultDoneFormData);
  const [isIdleAddDone, setIsIdleAddDone] = useState<boolean>(true);
  const navigate = useNavigate();


  const addDone = async () => {
    try {
      setIsIdleAddDone(false);
      const data = await postAddDone(formRef.current.name, new Date(), formRef.current.tags);
      console.log(data);
      navigate("/");
    } catch (error) {
      alert(error);
    } finally {
      setIsIdleAddDone(true);
    }
  }

  const submitOnClick = () => {
    if (formRef.current.name.length === 0) {
      alert("내용이 필요합니다.");
      return;
    }
    if (isIdleAddDone) {
      addDone();
    } else {
      alert("이미 요청중입니다");
    }
  } 

  return (
    <div className={styles.container}>
      <AppBar>
        <BackButtonToolBar/>
      </AppBar>
      <DoneForm formRef={formRef} />
      <Button className={styles.submitButton} onClick={submitOnClick}>
        추가하기
      </Button>
    </div>
  );
};

export default AddDone;