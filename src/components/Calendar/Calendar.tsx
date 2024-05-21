import Calendar from "react-calendar";
import "./Calendar.css";

interface ICalendarProps {
  setDate: any;
  date: any;
}

const CustomCalendar = (props: ICalendarProps) => {
  const { setDate, date } = props;
  return (
    <div>
      <Calendar
        onChange={setDate}
        value={date}
        view="month"
        next2Label={null}
        prev2Label={null}
      />
    </div>
  );
};

export default CustomCalendar;
