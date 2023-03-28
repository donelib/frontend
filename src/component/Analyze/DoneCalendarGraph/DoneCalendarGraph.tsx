import {
  DoneCalendarGraphProps,
  CalendarGraphItem,
} from "./DoneCalendarGraph.type";
import { ResponsiveCalendar } from "@nivo/calendar";
import { getDoneCountPerDayInYear } from "../../../api/analyze.repository";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  min-width: 512px;
  height: 160px;
`;

function DoneCalendarGraph(props: DoneCalendarGraphProps) {
  const [data, setData] = useState<CalendarGraphItem[]>([]);

  useEffect(() => {
    getDoneCountPerDayInYear(props.date.getFullYear()).then((res) => {
      setData(res);
    });
  }, [props.date]);
  return (
    <Root>
      <ResponsiveCalendar
        from={`${props.date.getFullYear()}-01-01`}
        to={`${props.date.getFullYear()}-12-31`}
        data={data}
        emptyColor="#eeeeee"
        colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
      />
    </Root>
  );
}

export default DoneCalendarGraph;
