import React, { useEffect, useState } from 'react';
import { fetchStudentProfile } from '../../Services/studentService';


const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
            try {
                const profileData = await fetchStudentProfile();
                
                setProfile(profileData.student); 
                console.log(profileData.student,'prfaf')// Access the nested data object
            } catch (error) {
               
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
        <div className="profile-page">
            <h1>Profile</h1>
            <div className="profile-details">
                <p><strong>Name:</strong> {profile.firstName} {profile.student?.lastName}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Membership Type:</strong> {profile.membershipType}</p>
              
            </div>
        </div>
    );
};

export default ProfilePage;
