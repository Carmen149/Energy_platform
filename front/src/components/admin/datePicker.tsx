import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
interface Props {
  setTime: React.Dispatch<React.SetStateAction<Dayjs>>;
}
const BasicDatePicker: React.FC<Props> = ({ setTime: setTime }) => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        label="Date desktop"
        inputFormat="DD/MM/YYYY"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          setTime(newValue);
          //console.log(newValue.format("DD-MM-YYYY hh:mm"));
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};
export default BasicDatePicker;
