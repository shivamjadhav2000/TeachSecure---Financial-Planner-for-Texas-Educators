import React, { createContext, useContext, useState } from 'react';
import Alert from '../components/Alert';
// Create a context for Alerts
const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [messageQueue, setMessageQueue] = useState([]);

  const addAlert = (message,status) => {
    setMessageQueue((prev) => [...prev, {message,status}]);
  };

  const removeAlert = () => {
    setMessageQueue((prev) => prev.slice(1));
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      {messageQueue.length > 0 && (
        <Alert message={messageQueue[0].message} status={messageQueue[0].status} onClose={removeAlert} />
      )}
    </AlertContext.Provider>
  );
};


