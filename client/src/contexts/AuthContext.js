// src/contexts/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
// import { heartbeatapi } from '../apis/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    //   checkTokenValidity(storedUser.token);
    }
  }, []);

//   const checkTokenValidity = (token) => {
//     heartbeatapi(token)
//       .then((data) => {
//         if (!data || !data.success) {
//           setUser(null);
//           localStorage.removeItem('user');
//         }
//       })
//       .catch((error) => {
//         console.error('Error checking token validity:', error);
//       });
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const storedUser = JSON.parse(localStorage.getItem('user'));
//       if (storedUser) {
//         checkTokenValidity(storedUser.token);
//       }
//     }, 60000);

//     return () => clearInterval(interval);
//   }, []);

  const setUserData = (userData) => {
    console.log('userData', userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Remove other localStorage items if needed
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, setUserData, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
