import { useEffect, useState } from "react";
import {
  APIResponse,
  SelectedSlot,
  Slots,
  formatDate,
  formatDateWithDay,
  formatTime,
} from "../utils";
import CalenderView from "./CalenderView";
import SlotsView from "./SlotsView";

const SlotSelector = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<Slots[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot>({
    id: null,
    start_time: null,
    end_time: null,
  });

  const fetchData = async (date: Date) => {
    const start_date = date;
    let end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + 1); // add 1 day

    const formatStartDate = formatDate(start_date);
    const formatEndDate = formatDate(end_date);

    const url = `https://app.appointo.me/scripttag/mock_timeslots?start_date=${formatStartDate}&end_date=${formatEndDate}`;
    try {
      setLoading(true);
      const response = await fetch(url);
      const jsonData: APIResponse[] = await response.json();
      setSlots(jsonData[0].slots);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSlots([]);
    setSelectedSlot((prev) => ({ ...prev, id: null }));
    fetchData(date);
  }, [date]);

  const handleSelectSlot = (idx: number) => {
    const obj: SelectedSlot = {
      id: idx.toString(),
      start_time: formatTime(slots[idx].start_time),
      end_time: formatTime(slots[idx].end_time),
    };
    setSelectedSlot(obj);
  };

  const handleNextClick = () => {
    window.alert(
      `Appointment for ${formatDateWithDay(date)}, (${selectedSlot.start_time as string} - ${selectedSlot.end_time as string}) has been booked.`,
    );
  };

  const renderFooter = (
    <div className="flex h-20 items-center justify-between rounded-b-lg bg-primary px-10">
      <div className="text-xs font-bold uppercase text-white">
        Powered by <span className="cursor-pointer underline">Appointo</span>
      </div>
      <button
        className="flex h-10 w-24 items-center justify-center gap-2 rounded-lg bg-white px-4 text-sm text-black"
        onClick={handleNextClick}
        disabled={!selectedSlot.id}
      >
        <span>Next</span>
        <span className="text-primary">{">"}</span>
      </button>
    </div>
  );

  return (
    <div className="flex h-full flex-col items-center bg-gradient-to-r from-white to-[#EFF4F3] lg:justify-center ">
      <div className="flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row">
          <div className="flex min-w-[450px] justify-center rounded-ss-lg bg-gray-150 p-4">
            <CalenderView date={date} setDate={setDate} />
          </div>

          <div className="min-w-[450px] rounded-se-lg bg-white p-4">
            <SlotsView
              slots={slots}
              date={date}
              loading={loading}
              selectedSlot={selectedSlot}
              handleSelectSlot={handleSelectSlot}
            />
          </div>
        </div>

        {renderFooter}
      </div>
    </div>
  );
};

export default SlotSelector;
