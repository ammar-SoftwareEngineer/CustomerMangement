import { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import TransactionsTable from "../Tables/TransactionsTable/TransactionsTable";
import moment from 'moment';

function Calender() {
  const [date, setDate] = useState<string>(new Date().toLocaleDateString());
  moment().format();

  const dateCalender = moment(new Date(date)).format('YYYY-MM-DD')



  return (

    <div className="">
      <div className="calender bg-white shadow-sm p-3 rounded-3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={["DateCalendar", "DateCalendar", "DateCalendar"]}
          >
            <DemoItem>
              <DateCalendar
                defaultValue={dayjs()}
                views={["year", "month", "day"]}
                onChange={(newDate) => {
                  setDate(newDate.$d);
                }}
                sx={{ width: "100%", height: "260px",overflowX:"auto" }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className="transaction mt-4">
        <TransactionsTable date={dateCalender} />
      </div>
    </div>

  );
}

export default Calender;
