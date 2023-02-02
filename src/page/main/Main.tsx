import { AppBar } from "@mui/material";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useState } from "react";
import Box from "@mui/material/Box";
import DoneList from "./../../component/done/DoneList";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState(Date.now());
  const tabOnClick = (destination: string) => {
    return () => {
      navigate(destination);
    };
  };

  return (
    <Root>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap", justifyContent: "flex-end" }}>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Search
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="/tag"
              sx={{ my: 1, mx: 1.5 }}
            >
              Tags
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Settings
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
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
