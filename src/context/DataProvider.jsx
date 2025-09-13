import { createContext, useState, useEffect } from 'react';
import { widgetsData } from '../utils/data';

export const DataContext = createContext();

export function DataProvider({ children }) {
  const initialData = widgetsData;

  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem('appData');
    return storedData ? JSON.parse(storedData) : initialData;
  });

  useEffect(() => {
    if (!localStorage.getItem('appData')) {
      localStorage.setItem('appData', JSON.stringify(initialData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appData', JSON.stringify(data));
  }, [data]);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
}
