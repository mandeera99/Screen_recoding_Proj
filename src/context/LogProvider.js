import React, { createContext, useContext, useState } from 'react';

const LogContext = createContext();

export const useLog = () => {
  return useContext(LogContext);
};

export const LogProvider = ({ children }) => {
  const [logs, setLogs] = useState([]);

  const logEvent = (event) => {
    setLogs((prevLogs) => [...prevLogs, event]);
  };

  return (
    <LogContext.Provider value={{ logs, logEvent }}>
      {children}
    </LogContext.Provider>
  );
};
