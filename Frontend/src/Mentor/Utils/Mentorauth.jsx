import { useState, useEffect } from 'react';
import { getProfile } from '../../Services/mentorService';

const useAuthMentor = () => {
  const [mentorProfile, setMentorProfile] = useState(null);
  const [mentorIsAuth, setMentorIsAuth] = useState(false);
  const [mentorLoading, setMentorLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setMentorProfile(response?.mentor); // Assuming mentor data is in response.mentor
        setMentorIsAuth(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setMentorIsAuth(false); // Correcting from setStudentIsAuth to setMentorIsAuth
          setMentorProfile(null);
        } else {
          console.error('Error fetching mentor profile:', error);
        }
      } finally {
        setMentorLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { mentorProfile, mentorIsAuth, mentorLoading };
};

export default useAuthMentor;
