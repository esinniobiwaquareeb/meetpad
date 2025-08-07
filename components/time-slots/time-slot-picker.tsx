"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { TimeSlots } from "./time-slots";

type WeeklyDays = {
  sun: { startTime: string; endTime: string }[];
  mon: { startTime: string; endTime: string }[];
  tue: { startTime: string; endTime: string }[];
  wed: { startTime: string; endTime: string }[];
  thu: { startTime: string; endTime: string }[];
  fri: { startTime: string; endTime: string }[];
  sat: { startTime: string; endTime: string }[];
};

type TimeSlot = {
  startSlots: string[];
  endSlots: string[];
  startTime: string;
  endTime: string;
};

interface TimeContext {
  weekDays: {
    sun: TimeSlot[];
    mon: TimeSlot[];
    tue: TimeSlot[];
    wed: TimeSlot[];
    thu: TimeSlot[];
    fri: TimeSlot[];
    sat: TimeSlot[];
  };
  canAddSlot: (day: Day) => boolean;
  isOffDay: (day: Day) => boolean;
  timeFormat: "12" | "24";
  dispatch: Dispatch<Action>;
}

const TimeContext = createContext<TimeContext>({} as TimeContext);

type Day = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

const WEEK_DAYs: Day[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

type WEEKS = {
  sun: TimeSlot[];
  mon: TimeSlot[];
  tue: TimeSlot[];
  wed: TimeSlot[];
  thu: TimeSlot[];
  fri: TimeSlot[];
  sat: TimeSlot[];
};

type State = {
  weekDays: WEEKS;
  timeFormat: "12" | "24";
  duration: number;
};

type Action =
  | {
      type: "init";
      payload: {
        weeklyDays: WeeklyDays;
        duration: number;
      };
    }
  | {
      type: "set/startTime";
      payload: { startTime: string; index: number; day: Day };
    }
  | {
      type: "set/endTime";
      payload: { endTime: string; index: number; day: Day };
    }
  | { type: "add/slot"; payload: { index: number; day: Day } }
  | { type: "delete/slot"; payload: { index: number; day: Day } }
  | { type: "toggle/offDay"; payload: Day }
  | { type: "set/time-format"; payload: "12" | "24" }
  | { type: "set/weekDays" };

const initialState: State = {
  weekDays: {
    sun: [
      {
        startSlots: [],
        endSlots: [],
        startTime: "",
        endTime: "",
      },
    ],
    mon: [
      {
        startSlots: [],
        endSlots: [],
        startTime: "",
        endTime: "",
      },
    ],
    tue: [
      {
        startSlots: [],
        endSlots: [],
        startTime: "",
        endTime: "",
      },
    ],
    wed: [
      {
        startSlots: [],
        endSlots: [],
        startTime: "",
        endTime: "",
      },
    ],
    thu: [
      {
        startSlots: [],
        endSlots: [],
        startTime: "",
        endTime: "",
      },
    ],
    fri: [
      {
        startSlots: [],
        endSlots: [],
        startTime: "",
        endTime: "",
      },
    ],
    sat: [
      {
        startSlots: [],
        endSlots: [],
        startTime: "",
        endTime: "",
      },
    ],
  },
  timeFormat: "12",
  duration: 30,
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "init":
      const weekDays = state.weekDays;
      WEEK_DAYs.forEach(
        (day) =>
          (weekDays[day] = init(
            action.payload.weeklyDays[day],
            action.payload.duration
          ))
      );

      return {
        ...state,
        weekDays,
        duration: action.payload.duration,
      };
    case "add/slot": {
      const weekDays = structuredClone(state.weekDays);
      const { day } = action.payload;
      weekDays[day] = [
        ...state.weekDays[day],
        {
          startTime:
            state.weekDays[day][state.weekDays[day].length - 1].endTime,
          endTime: "24:00",
          startSlots: [],
          endSlots: [],
        },
      ];

      return {
        ...state,
        weekDays: reg(weekDays, state.duration),
      };
    }
    case "delete/slot": {
      const weekDays = structuredClone(state.weekDays);
      const { day, index } = action.payload;
      weekDays[day] = state.weekDays[day].filter((_, i) => i !== index);

      return {
        ...state,
        weekDays: reg(weekDays, state.duration),
      };
    }
    case "set/endTime": {
      const weekDays = structuredClone(state.weekDays);
      const { day, index, endTime } = action.payload;
      weekDays[day][index].endTime = endTime;

      return {
        ...state,
        weekDays: reg(weekDays, state.duration),
      };
    }
    case "set/startTime": {
      const weekDays = structuredClone(state.weekDays);
      const { day, index, startTime } = action.payload;
      weekDays[day][index].startTime = startTime;

      return { ...state, weekDays: reg(weekDays, state.duration) };
    }
    case "toggle/offDay": {
      const weekDays = structuredClone(state.weekDays);
      weekDays[action.payload] = weekDays[action.payload].length
        ? []
        : init([{ startTime: "07:00", endTime: "17:00" }], state.duration);
      return {
        ...state,
        weekDays: reg(weekDays, state.duration),
      };
    }
    case "set/time-format":
      return {
        ...state,
        timeFormat: action.payload,
      };

    default:
      throw new Error("Unknown action!");
  }
}

interface Props {
  data: WeeklyDays;
  duration: number;
  onChange: Dispatch<SetStateAction<WeeklyDays>>;
}

function TimeSlotPicker({ data, onChange, duration }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (() =>
      dispatch({
        type: "init",
        payload: { weeklyDays: data, duration },
      }))();
  }, [data, duration]);

  useEffect(() => {
    (() => onChange(convert(state.weekDays)))();
  }, [state.weekDays, onChange]);

  const canAddSlot = (day: Day) =>
    state.weekDays[day][state.weekDays[day].length - 1].endTime !== "24:00";

  const isOffDay = (day: Day) => Boolean(state.weekDays[day].length == 0);

  return (
    <TimeContext.Provider value={{ ...state, dispatch, canAddSlot, isOffDay }}>
      <TimeSlots />
    </TimeContext.Provider>
  );
}

function useTimeSlot() {
  const context = useContext(TimeContext);

  if (context === undefined || !context)
    throw new Error("Time Slot context is used outside of Time Provider!");

  return context;
}

export { useTimeSlot, TimeSlotPicker };

function generateTimeSlots2(
  intervalMinutes: number,
  startTime: string,
  endTime: string
): string[] {
  const timeSlots: string[] = [];

  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);

  let currentHour = startHour;
  let currentMinute = startMinute;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinute <= endMinute)
  ) {
    const timeSlot = `${String(currentHour).padStart(2, "0")}:${String(
      currentMinute
    ).padStart(2, "0")}`;
    timeSlots.push(timeSlot);

    currentMinute += intervalMinutes;
    if (currentMinute >= 60) {
      currentHour++;
      currentMinute -= 60;
    }
  }

  return timeSlots;
}

function init(
  timeSlots: { startTime: string; endTime: string }[],
  duration: number
) {
  const TimeSlots = timeSlots.map((timeSlot, i, timeSlots) => {
    const { startTime, endTime } = timeSlot;

    const [_, ...endSlots] = generateTimeSlots2(
      duration,
      startTime,
      Boolean(timeSlots[i + 1]) ? timeSlots[i + 1].startTime : "24:00"
    );

    return {
      startTime,
      endTime,
      startSlots: generateTimeSlots2(
        duration,
        Boolean(timeSlots[i - 1]) ? timeSlots[i - 1].endTime : "00:00",
        endTime
      ).slice(0, -1),
      endSlots: i === timeSlots.length - 1 ? endSlots : endSlots.slice(0, -1),
    };
  });

  return TimeSlots;
}

function convert(wkds: WEEKS) {
  const days: WeeklyDays = [] as unknown as WeeklyDays;

  WEEK_DAYs.forEach((day) => {
    days[day] = wkds[day].map(({ startTime, endTime }) => ({
      startTime,
      endTime,
    }));
  });

  return days;
}
function reg(weekDays: WEEKS, duration: number) {
  WEEK_DAYs.forEach((day) => (weekDays[day] = init(weekDays[day], duration)));
  return weekDays;
}
