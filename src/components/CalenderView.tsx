import { formatDate } from "../utils";
import CustomCalendar from "./Calendar/Calendar";

interface ICalendarViewProps {
  setDate: any;
  date: any;
}

const CalenderView = (props: ICalendarViewProps) => {
  const { date, setDate } = props;
  const handleSelectDate = (d: any) => {
    if (formatDate(d) !== formatDate(date)) {
      setDate(d);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start pt-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-start gap-1">
          <span className="text-lg font-bold">Test Service</span>
          <span className="text-sm font-bold text-gray-600">
            Timezone: <span className="font-normal">Asia/Calcutta</span>
          </span>
        </div>

        <CustomCalendar date={date} setDate={handleSelectDate} />
      </div>
    </div>
  );
};

export default CalenderView;
