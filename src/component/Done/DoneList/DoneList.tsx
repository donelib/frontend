import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DoneInfo } from "../../../api/data/DoneInfo";
import { useSetRecoilState } from "recoil";
import { modifyDoneState } from "../../../recoil/doneAtom";
import { getDoneList } from "../../../api/done.repository";
import Done from "../Done";
import { Button, Divider, List } from "@mui/material";
import styled from "styled-components";
import { TDoneListProps } from "./DoneList.type";

const Root = styled.div`
  padding: 0px 24px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 48px);
`;

const Title = styled.h2`
  margin: 0px 0px 12px 0px;
`;

function DoneList({ date }: TDoneListProps) {
  const navigate = useNavigate();
  const [doneList, setDoneList] = useState<DoneInfo[]>([]);
  const setModifyDone = useSetRecoilState(modifyDoneState);

  const fetchDoneList = useCallback(async (selectDate: Date) => {
    const from = new Date(selectDate.toDateString());
    const to = new Date(from);
    to.setDate(from.getDate() + 1);
    to.setSeconds(-1);
    const res = await getDoneList(from, to);
    setDoneList(res);
  }, []);

  useEffect(() => {
    fetchDoneList(date);
  }, [fetchDoneList, date]);

  const addButtonOnClick = () => {
    navigate("done/add", {
      state: date.toISOString(),
    });
  };

  const doneOnClick = (done: DoneInfo) => {
    setModifyDone(done);
    navigate("done/modify/" + done.id);
  };

  return (
    <Root>
      <Title>Done</Title>
      <List>
        {doneList.map((done) => {
          return (
            <>
              <Done
                {...done}
                key={done.id.toString()}
                onClick={() => {
                  doneOnClick(done);
                }}
              />
              <Divider />
            </>
          );
        })}
      </List>
      <Button
        color="primary"
        size="large"
        variant="outlined"
        onClick={addButtonOnClick}
      >
        Done 추가하기
      </Button>
    </Root>
  );
}

export default DoneList;
