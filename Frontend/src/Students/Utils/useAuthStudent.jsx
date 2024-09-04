import { useState, useEffect } from 'react';
import { StudentInstance } from '../../Services/apiInstances';

const useAuthStudent = () => {
  const [profile, setProfile] = useState(null); 
  const [studentIsAuth, setStudentIsAuth] = useState(false); 
  const [studentLoading, setStudentLoading] = useState(true); 

  useEffect(() => {
   
    const fetchProfile = async () => {
        
      try {
        const response = await StudentInstance.get('profile');
        setProfile(response.data); 
        setStudentIsAuth(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setStudentIsAuth(false);
          setProfile(null);
        } else {
          console.error('Error fetching profile:', error);
        }
      } finally {
        setStudentLoading(false); 
      }
    };

    fetchProfile();
  }, []);

  return { profile, studentIsAuth, studentLoading }; // Return the updated state names
};

export default useAuthStudent;
