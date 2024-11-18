//where i got the calendar : https://mui.com/x/react-date-pickers/date-calendar/#uncontrolled-vs-controlled-value

import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import { user } from "./tempDB";
interface TimerProps {
  z: number;
}
export default function Calendar({ z }: TimerProps) {
  const [currentDate, setCurrentDate] = useState(dayjs(Date.now()));
  const [dateFormatted, setDateFormatted] = useState(
    currentDate.format("MM-DD-YYYY")
  );

  useEffect(() => {
    setDateFormatted(currentDate.format("MM-DD-YYYY"));
  }, [currentDate]);

  const [testString, setTestString] = useState("");

  //search for the exact day linking to the user
  //|recieve the day return the user info for that day
  function searchDate(currentDay: string) {
    return user.workdays.find((day) => {
      if (currentDay == day.date) {
        return day;
      }
    });
  }
  console.log(dateFormatted);

  return (
    <div
      className="h-full flex justify-center items-center  z-[2] absolute"
      style={{ zIndex: z }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          //needs to be an entire date object
          value={currentDate}
          onChange={(newDate) => setCurrentDate(newDate)}
        />
      </LocalizationProvider>
      <div className="info-board bg-gray-200 h-64 p-4 text-center mb-8">
        <p className="text-lg font-bold">{dateFormatted}</p>

        <p>
          morning hours: <br />
          {searchDate(dateFormatted)?.morningHours || "No hours"}
        </p>
        <p>
          evening hours: <br />
          {searchDate(dateFormatted)?.eveningHours || "No hours "}
        </p>

        <p>
          late hours: <br />
          {searchDate(dateFormatted)?.lateHours || "No hours "}
        </p>
        <p>
          total hours: <br />
          {searchDate(dateFormatted)?.totalHours || "No hours "}
        </p>
      </div>
    </div>
  );
}
