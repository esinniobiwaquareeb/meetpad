"use client";

import { getClientCountryCode } from "@/lib/services";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

type WeekDay = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

const weekDays: WeekDay[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

interface IUser extends User {
  services: Service[];
}

type IGuest = Pick<
  Guest,
  "fullName" | "email" | "phoneNumber" | "country_code" | "note"
>;

type Action =
  | { type: "init"; payload: IUser }
  | { type: "step/prev" }
  | { type: "step/next" }
  | { type: "step/goto"; payload: number }
  | { type: "set/date"; payload: string }
  | { type: "set/service"; payload: string }
  | { type: "set/time"; payload: string }
  | { type: "set/day"; payload: WeekDay }
  | { type: "guest"; payload: IGuest }
  | { type: "guest/country"; payload: string | null }
  | { type: "guest/validate"; payload: boolean }
  | { type: "booking/loading" }
  | { type: "booking/error" }
  | { type: "booking/success" }
  | { type: "toggle/terms" };

interface BookingState {
  formStep: number;
  user: IUser;
  guest: IGuest;
  selectedService: Service;
  selectedDate: string;
  selectedTime: string;
  selectedDay: WeekDay;
  unAvailableDays: number[];
  guestValidated: boolean;
  bookingMade: boolean;
  termsAccepted: boolean;
  isBooking: boolean;
}

interface IBooking extends BookingState {
  dispatch: Dispatch<Action>;
  selectedService: Service;
  selectedDate: string;
  selectedTime: string;
  selectedDay: WeekDay;
  unAvailableDays: number[];
}

const initialState: BookingState = {
  formStep: 1,
  user: {} as IUser,
  guest: {} as IGuest,
  selectedDate: "",
  selectedTime: "",
  selectedDay: "" as WeekDay,
  unAvailableDays: [],
  selectedService: {} as Service,
  guestValidated: false,
  bookingMade: false,
  termsAccepted: false,
  isBooking: false,
};

function init(state: BookingState, user: IUser): BookingState {
  const defaultSelectedService = computeDefaultService(user.services);

  const defaultAvailableDay = computeAvailableDay(defaultSelectedService);

  const defaultAvailableTime = computeAvailableTime(
    defaultSelectedService,
    defaultAvailableDay
  );

  const unAvailableDays = computeUnavailableDays(defaultSelectedService);

  const defaultSelectedDate = computeFirstAvailableDate(unAvailableDays);

  return {
    ...state,
    user,
    selectedDay: defaultAvailableDay,
    selectedDate: defaultSelectedDate,
    selectedService: defaultSelectedService,
    selectedTime: defaultAvailableTime,
    unAvailableDays,
  };
}

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case "init":
      return init(state, action.payload);
    case "step/prev":
      return {
        ...state,
        formStep: state.formStep == 1 ? state.formStep : state.formStep - 1,
      };
    case "step/next":
      return {
        ...state,
        formStep: state.formStep === 4 ? state.formStep : state.formStep + 1,
      };
    case "step/goto":
      return {
        ...state,
        formStep: action.payload,
      };
    case "set/service":
      const selectedService = state.user.services.find(
        (service) => service.title === action.payload
      ) as Service;

      const selectedDay = computeAvailableDay(selectedService);

      const unAvailableDays = computeUnavailableDays(selectedService);

      const selectedTime = computeAvailableTime(selectedService, selectedDay);

      const selectedDate = computeFirstAvailableDate(unAvailableDays);

      return {
        ...state,
        selectedService,
        unAvailableDays,
        selectedDay,
        selectedTime,
        selectedDate,
      };
    case "set/date":
      return {
        ...state,
        selectedDate: action.payload,
      };
    case "set/time":
      return {
        ...state,
        selectedTime: action.payload,
      };
    case "set/day":
      return {
        ...state,
        selectedDay: action.payload,
      };
    case "guest":
      return { ...state, guest: action.payload };
    case "guest/country":
      return {
        ...state,
        guest: { ...state.guest, country_code: action.payload as string },
      };
    case "guest/validate":
      return { ...state, guestValidated: action.payload };
    case "booking/success":
      return { ...state, isBooking: false, bookingMade: true };

    case "booking/loading":
      return { ...state, isBooking: true };

    case "booking/error":
      return { ...state };

    case "toggle/terms":
      return { ...state, termsAccepted: !state.termsAccepted };

    default:
      throw new Error("Unknown Action!");
  }
}

const BookingContext = createContext<IBooking>({} as IBooking);

type ProviderProps = {
  children: ReactNode;
  userApi: IUser;
};

function BookingProvider({ children, userApi: user }: ProviderProps) {
  const [bookingState, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "init", payload: user });
  }, [user]);

  useEffect(() => {
    (async () => {
      const countryCode = await getClientCountryCode();
      dispatch({ type: "guest/country", payload: countryCode });
    })();
  }, []);

  return (
    <BookingContext.Provider value={{ ...bookingState, dispatch, user }}>
      {children}
    </BookingContext.Provider>
  );
}

function useBookingState() {
  const context = useContext(BookingContext);

  if (!context)
    throw new Error("BookingContext is used outside Consult Provider");

  return context;
}

export { BookingProvider, useBookingState };

const getIndexofDay = (day: string) => {
  return new Map()
    .set("sun", 0)
    .set("mon", 1)
    .set("tue", 2)
    .set("wed", 3)
    .set("thu", 4)
    .set("fri", 5)
    .set("sat", 6)
    .get(day);
};

const getDayByIndex = (
  index: number
): "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" => {
  return new Map()
    .set(0, "sun")
    .set(1, "mon")
    .set(2, "tue")
    .set(3, "wed")
    .set(4, "thu")
    .set(5, "fri")
    .set(6, "sun")
    .get(index);
};

function computeDefaultService(services: Service[]) {
  const serviceId = window.location.href.split("?service=").at(1);

  const defaultService = services.find(
    (service) => Number(service.id) === Number(serviceId)
  );

  return defaultService ? defaultService : services[0];
}

function computeAvailableDay(service: Service) {
  return weekDays.find(
    (day) => service.availability[day].length !== 0
  ) as WeekDay;
}

function computeAvailableTime(service: Service, day: WeekDay) {
  return service.availability[day][0].split("-")[0];
}

function computeUnavailableDays(service: Service) {
  return weekDays
    .filter((day) => service.availability[day].length === 0)
    .map(getIndexofDay);
}

function computeFirstAvailableDate(unAvailableDays: number[]) {
  const today = new Date();
  // const tomorrow = new Date(today.setDate(today.getDate() + 1));

  // const firstAvailableDay = weekDays.find(
  //   (day) =>
  //     day !== getDayByIndex(tomorrow.getDay()) &&
  //     !unAvailableDays.includes(getIndexofDay(day))
  // );

  // const next7Days = Array.from(
  //   { length: 7 },
  //   (_, i) => new Date(new Date().setDate(new Date().getDate() + i))
  // );

  // const firstAvailableDate = next7Days.find((day, _) => {
  //   return day.toDateString().slice(0, 3).toLowerCase() === firstAvailableDay;
  // }) as Date;

  // const [month, day, year] = firstAvailableDate.toLocaleDateString().split("/");
  const [month, day, year] = today.toLocaleDateString().split("/");
  console.log(month, day, year);
  console.log(new Date().toISOString());

  return `${year}-${month.padStart(2, "0")}-${day}`;
}
