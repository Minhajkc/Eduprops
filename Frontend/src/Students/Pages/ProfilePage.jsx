import React, { useEffect, useState } from 'react';
import { fetchStudentProfile, logoutStudent } from '../../Services/studentService'; 
import { useNavigate } from 'react-router-dom';
import { logoutStudentRedux } from '../../Redux/studentSlice';
import { useDispatch } from 'react-redux';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch()
  
    useEffect(() => {
        const getProfile = async () => {
            try {
                const profileData = await fetchStudentProfile();
                setProfile(profileData.student); 
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, []);

   

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!profile) {
        return <div>No profile data available.</div>;
    }

    return (
        <div className="profile-page max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Profile</h1>
            <div className="profile-details space-y-4">
                <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Membership Type:</strong> {profile.membershipType}</p>
            </div>
           
        </div>
    );
};

export default ProfilePage;
