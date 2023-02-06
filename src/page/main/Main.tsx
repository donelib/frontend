import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import styled from "styled-components";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useState } from "react";
import Box from "@mui/material/Box";
import DefaultAppBar from "../../component/appbar/DefaultAppBar";
import DoneList from "../../component/Done/DoneList";

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Box)`
  display: flex;
  flex-basis: 0;
  flex-direction: row;
  justify: space-around;
  padding: 24px;
  @media (max-width: 700px) {
    flex-direction: column;
    padding: 24px 0;
  }
`;

const Main = () => {
  const [date, setDate] = useState(Date.now());

  return (
    <Root>
      <DefaultAppBar />
      <Container>
        {/* Calendar view */}
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            label="Week picker"
            value={date}
            onChange={(newValue) => {
              if (newValue === null) setDate(Date.now());
              else setDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            inputFormat="'Week of' MMM d"
          />
        </LocalizationProvider>
        <DoneList date={new Date(date)} />
      </Container>
    </Root>
  );
};

export default Main;
