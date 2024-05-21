export interface Slots {
  start_time: Date;
  end_time: Date;
}

export interface APIResponse {
  date: string;
  slots: Slots[];
}

export interface SelectedSlot {
  id: string | null;
  start_time: string | null;
  end_time: string | null;
}
