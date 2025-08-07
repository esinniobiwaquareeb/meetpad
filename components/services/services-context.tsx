"use client";
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

type ServicesState = {
  services: Service[];
  selectedIds: string[];
  onSelectionMode: boolean;
};

interface ServiceInterface extends ServicesState {
  dispatch: Dispatch<ServiceAction>;
  getService: (id: string) => Service;
}

type ServiceAction =
  | { type: "store"; payload: Service[] }
  | { type: "select"; payload: string };

const ServicesContext = createContext<ServiceInterface>({} as ServiceInterface);

const initialState: ServicesState = {
  services: [],
  selectedIds: [],
  onSelectionMode: false,
};

type ProviderProps = {
  children: ReactNode;
  services: Service[];
};

function reducer(state: typeof initialState, action: ServiceAction) {
  switch (action.type) {
    case "store":
      return { ...state, services: action.payload };
    case "select":
      return {
        ...state,
        selectedIds: state.selectedIds.includes(action.payload)
          ? state.selectedIds.filter((id) => id !== action.payload)
          : [...state.selectedIds, action.payload],
        onSelectionMode: Boolean(state.selectedIds.length),
      };

    default:
      throw new Error("Unknown service action!");
  }
}

function ServicesProvider({ children, services }: ProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "store", payload: services });
  }, [services]);

  const getService = (serviceId: string) =>
    state.services.find((service) => service.id === serviceId) as Service;

  return (
    <ServicesContext.Provider value={{ ...state, dispatch, getService }}>
      {children}
    </ServicesContext.Provider>
  );
}

function useServices() {
  const context = useContext(ServicesContext);

  if (!context)
    throw new Error("ServicesContext used outside ServicesProvider!");

  return context;
}

export { ServicesProvider, useServices };
