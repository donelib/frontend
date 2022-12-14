import "react-calendar/dist/Calendar.css";
import { useEffect, useState, useCallback } from "react";
import { Calendar } from "react-calendar";
import Button from "../../component/button/Button";
import Done from "../../component/done/Done";
import { getDoneList } from "../../api/done.repository";
import DoneInfo from "../../api/data/DoneInfo";
import { useNavigate } from "react-router-dom";
import styles from "./DoneList.module.scss";
import { useSetRecoilState } from "recoil";
import { modifyDoneState } from "../../recoil/doneAtom";

const DoneList = () => {
  const navigate = useNavigate();
  const [doneList, setDoneList] = useState<DoneInfo[]>([]);
  const [selectDate, setSelectDate] = useState(new Date());
  const setModifyDone = useSetRecoilState(modifyDoneState);

  const fetchDoneList = useCallback(async (selectDate: Date) => {
    const from = new Date(selectDate.getFullYear(), selectDate.getMonth(), selectDate.getDate());
    const to = new Date(from);
    to.setDate(from.getDate() + 1);
    const res = await getDoneList(from, to);
    setDoneList(res);
  }, []);

  useEffect(() => {
    fetchDoneList(selectDate);
  }, [fetchDoneList, selectDate]);

  const addButtonOnClick = () => {
    navigate("done/add");
  }

  const doneOnClick = (done: DoneInfo) => {
    setModifyDone(done);
    navigate("done/modify/" + done.id);
  }

  return (
  <div>
    <Calendar className={styles.calendar} value={selectDate} onChange={setSelectDate} tileClassName={() => {return "highlight"}} locale={"ko-kr"}/>
    <div className={styles.doneContainer}> 
      { 
        doneList.map((done) => {
          return <Done {...done} key={done.id.toString()} onClick={() => { doneOnClick(done) }}/>
        })
      }
    </div>
    <Button onClick={addButtonOnClick}>
      add done
    </Button>
  </div>);
};

export default DoneList;