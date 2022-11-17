
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import styles from "./Main.module.scss";
import iconSetting from "../../assets/icon_settings.svg";
import Done from "../../component/done/Done";
import { getDoneList } from "../../api/done.repository";
import DoneInfo from "../../api/data/DoneInfo";
import { useNavigate } from "react-router-dom";
import Header from "../../component/header/Header";
import Button from "../../component/button/Button";
import Calendar from "react-calendar";
import { AxiosError } from "axios";

const Main = () => {
  const [doneList, setDoneList] = useState<DoneInfo[]>([]);
  const [selectDate, setSelectDate] = useState(new Date());
  const navigate = useNavigate();

  const fetchDoneList = async (selectDate: Date) => {
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
  }

  useEffect(() => {
    fetchDoneList(selectDate);
  }, [selectDate]);

  const addButtonOnClick = () => {
    navigate("add-done");
  }

  return (
    <div className={styles.mainContainer}>
      <Header imgSrc={iconSetting}/>
      <Calendar onChange={setSelectDate} tileClassName={() => {return "highlight"}} locale={"ko-kr"}/>
      <div className={styles.doneContainer}> 
        {/* list view -> doneInfo(+tagList) */}
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
    </div>
  );
};

export default Main;