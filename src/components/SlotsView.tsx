import { IconCheckCircle } from "../icons";
import { SelectedSlot, Slots, formatDateWithDay, formatTime } from "../utils";
import Loader from "./Loader";

const options = [
  { label: "60 min", value: 2 },
  { label: "30 min", value: 1 },
  // { label: "90 min", value: 3 },
];

interface ISlotsViewProps {
  slots: Slots[];
  date: Date;
  loading: boolean;
  selectedSlot: SelectedSlot;
  handleSelectSlot: (idx: number) => void;
}

const SlotsView = (props: ISlotsViewProps) => {
  const { slots, date, loading, selectedSlot, handleSelectSlot } = props;

  const currDate = formatDateWithDay(date);

  const renderLoading = (
    <div className="flex h-full items-center  justify-center gap-2">
      <span>Finding Available Slots</span>
      <Loader />
    </div>
  );

  const renderNoSlots = (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="rounded-md border bg-gray-50 p-4">
        <div>No Slots Available</div>
        <div className="text-sm text-gray-500">Select different date</div>
      </div>
    </div>
  );

  return (
    <div className="flex w-full flex-col items-start pt-6">
      <div className="flex w-full flex-col gap-1 px-4">
        <label className="flex justify-start text-xs font-semibold uppercase text-gray-600">
          Select from varients
        </label>
        <div>
          <select className=" text-primary h-12 w-full rounded-lg border bg-gray-50 px-2 font-semibold outline-none">
            {options.map((o) => (
              <option key={o.value} value={o.value} className="bg-white">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex w-full border" />

      <div className="w-full">
        <div className="flex items-start px-4 py-4 text-xs font-semibold uppercase text-gray-600">
          {currDate} - Available Slots
        </div>

        <div className="flex h-[30vh] w-full justify-center">
          {loading ? (
            renderLoading
          ) : (
            <div className="flex w-full flex-col gap-4 overflow-auto px-4">
              {slots && slots.length > 0
                ? slots.map((s, idx) =>
                    idx.toString() === selectedSlot.id ? (
                      <div
                        key={idx}
                        className={
                          "bg-primary flex min-h-12 cursor-pointer items-center justify-between rounded-lg px-4 font-semibold uppercase text-white"
                        }
                      >
                        <div>
                          {formatTime(s.start_time)}
                          {" - "}
                          {formatTime(s.end_time)}
                        </div>
                        <div>
                          <IconCheckCircle height={"24px"} width={"24px"} />
                        </div>
                      </div>
                    ) : (
                      <div
                        key={idx}
                        className={
                          "border-primary text-primary flex min-h-12 w-full cursor-pointer items-center justify-center rounded-lg border font-semibold uppercase"
                        }
                        onClick={() => handleSelectSlot(idx)}
                      >
                        {formatTime(s.start_time)}
                        {" - "}
                        {formatTime(s.end_time)}
                      </div>
                    ),
                  )
                : renderNoSlots}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotsView;
