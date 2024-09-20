import { useState, useEffect } from 'react';
import { AdminInstance } from '../../Services/apiInstances';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await AdminInstance.get('checkAuth');
        setIsAuthenticated(true);  
      } catch (error) {
        if (error.response && error.response.status === 401) {

          setIsAuthenticated(false); 

        } else {
          console.error('Error checking authentication:', error);
        }
      } finally {
        setLoading(false); 
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
