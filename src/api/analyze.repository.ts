import moment from "moment";
import { api } from "./apiConfig";
import DoneCountPerTag from "./data/DoneCountPerTag";
import { AxiosResponse } from "axios";
import { numToHexColor } from "../utils/Color";

class GetDoneCountPerTagInMonthRequest {
  month: string;

  constructor(date: Date) {
    this.month = moment(date).format("yyyy-MM-DD");
  }
}

interface GetDoneCountPerTagInMonthResponseItem {
  id: number;
  name: string;
  color: number;
  doneCount: number;
}

export const getDoneCountPerTagInMonth = async (date: Date) => {
  const res: AxiosResponse<GetDoneCountPerTagInMonthResponseItem[]> =
    await api.get("/api/done/analyze/done-count-per-tag", {
      params: new GetDoneCountPerTagInMonthRequest(date),
    });
  return res.data.map((d) => {
    return { ...d, color: numToHexColor(d.color) };
  });
};

class GetDoneCountPerDayInYearRequest {
  doneAtFrom: string;
  doneAtTo: string;

  constructor(year: number) {
    let fromDate = moment(`${year}0101`, "YYYYMMDD");
    this.doneAtFrom = fromDate.toISOString();
    this.doneAtTo = fromDate.add(1, "years").toISOString();
  }
}

interface GetDoneCountPerDayInYearResponseItem {
  dateTime: string;
  doneCount: number;
}

export const getDoneCountPerDayInYear = async (year: number) => {
  const res: AxiosResponse<GetDoneCountPerDayInYearResponseItem[]> =
    await api.get("/api/done/analyze/done-count-per-day", {
      params: new GetDoneCountPerDayInYearRequest(year),
    });
  return res.data.map((d) => {
    return { day: moment(d.dateTime).format("YYYY-MM-DD"), value: d.doneCount };
  });
};
