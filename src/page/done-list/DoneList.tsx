import "react-calendar/dist/Calendar.css";
import { useEffect, useState, useCallback } from "react";
import { AxiosError } from "axios";
import { Calendar } from "react-calendar";
import Button from "../../component/button/Button";
import Done from "../../component/done/Done";
import { getDoneList } from "../../api/done.repository";
import DoneInfo from "../../api/data/DoneInfo";
import { useNavigate } from "react-router-dom";
import styles from "./DoneList.module.scss";

const DoneList = () => {
  const [doneList, setDoneList] = useState<DoneInfo[]>([]);
  const [selectDate, setSelectDate] = useState(new Date());
  const navigate = useNavigate();

  const fetchDoneList = useCallback(async (selectDate: Date) => {
    const from = new Date(selectDate.getFullYear(), selectDate.getMonth(), selectDate.getDate());
    const to = new Date(from);
    to.setDate(from.getDate() + 1);
    try {
      const res = await getDoneList(from, to);
      setDoneList(res);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const res = error.response;
        if (res?.status === 401) {
          navigate("/login");
        }
      }
      console.log(error);
    }
  }, [navigate]);

  useEffect(() => {
    fetchDoneList(selectDate);
  }, [fetchDoneList, selectDate]);

  const addButtonOnClick = () => {
    navigate("done/add");
  }

  return (
  <div>
    <Calendar className={styles.calendar} value={selectDate} onChange={setSelectDate} tileClassName={() => {return "highlight"}} locale={"ko-kr"}/>
    <div className={styles.doneContainer}> 
      {/* select -> modify done */}
      { 
        doneList.map((done) => {
          return <Done {...done} key={done.id.toString()}/>
        })
      }
    </div>
    <Button onClick={addButtonOnClick}>
      add done
    </Button>
  </div>);
};

export default DoneList;