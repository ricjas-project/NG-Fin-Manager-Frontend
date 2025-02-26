import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CONFIG from '../config';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(CONFIG.AUTH.PROFILE);
        setUser(response.data);
        document.body.className = response.data.role;
      } catch (error) {
        logout();
      }
    };
    
    if (localStorage.getItem('token')) fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    document.body.className = '';
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);