import React, { useEffect } from 'react';

const Alert = ({ message,status, onClose }) => {
    console.log(message)
    console.log(status)
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Automatically close after 3 seconds
    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4  text-white p-2 rounded shadow-lg w-[200px] flex" style={{backgroundColor:status=="success"?"var(--primary-color)":"var(--secondary-color)"}}>
      <p>{message}</p>
      <button className="ml-4 text-lg" onClick={onClose}>X</button>
    </div>
  );
};

export default Alert;
