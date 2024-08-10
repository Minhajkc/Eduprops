import { useState, useEffect } from 'react';
import { AdminInstance } from '../../Services/apiInstances'; 

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await AdminInstance.get('checkAuth');
        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false); 
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, loading }; 
};

export default useAuth;
