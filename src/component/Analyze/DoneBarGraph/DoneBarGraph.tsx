import { ResponsiveBar, BarDatum } from "@nivo/bar";
import { DoneBarGraphProps } from "./DoneBarGraph.type";
import { getDoneCountPerTagInMonth } from "./../../../api/analyze.repository";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  min-width: 512px;
  height: 200px;
`;

function DoneBarGraph(props: DoneBarGraphProps) {
  const [data, setData] = useState<BarDatum[]>([]);
  useEffect(() => {
    getDoneCountPerTagInMonth(new Date(props.date)).then((res) => {
      setData(res);
    });
  }, [props.date]);
  return (
    <Root>
      <ResponsiveBar
        data={data}
        colors={({ id, data }) => String(data["color"])}
        keys={["doneCount"]}
        indexBy="name"
        margin={{ top: 24, right: 24, bottom: 24, left: 24 }}
        padding={0.4}
        animate={false}
      />
    </Root>
  );
}

export default DoneBarGraph;
