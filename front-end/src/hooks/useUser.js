import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * It returns the user object from local storage
 * @returns The user object.
 */
export const useUser = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return [user, setUser];
};
