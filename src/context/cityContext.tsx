import React, { useEffect } from "react";
import { storeData } from "../storage";

interface CityContextValue {
  newCity: Object;
  setNewCity: React.Dispatch<React.SetStateAction<Object>>;
}

const CityContext = React.createContext<CityContextValue>({
  newCity: "",
  setNewCity: () => {},
});

export const useCity = () => React.useContext(CityContext);

export const CityContextProvider = ({ children }: any) => {
  const [newCity, setNewCity] = React.useState({});
  
  return (
    <CityContext.Provider
      value={{
        newCity,
        setNewCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};
