import React, { useEffect, useState } from 'react';
import { fetchStudentProfile, logoutStudent } from '../../Services/studentService'; 
import { useNavigate } from 'react-router-dom';
import { logoutStudentRedux } from '../../Redux/studentSlice';
import { useDispatch } from 'react-redux';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const handleLogout = () => {
        dispatch(logoutStudentRedux());
        logoutStudent(); // Call your logout service
        navigate('/login'); // Redirect to login page
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!profile) {
        return <div className="no-profile">No profile data available.</div>;
    }

    return (
        <div className="profile-page max-w-8xl  p-4 m-5 bg-gray-100 shadow-md rounded-lg font-roboto overflow-scroll">
            <h1 className="text-2xl font-bold mb-6">Student Panel</h1>
            
            <div className="tabs flex space-x-4 mb-6">
                <button 
                    className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    Profile
                </button>
                <button 
                    className={`tab ${activeTab === 'purchasedCourses' ? 'active' : ''}`}
                    onClick={() => setActiveTab('purchasedCourses')}
                >
                    Purchased Courses
                </button>
            </div>
            
            {activeTab === 'profile' && (
                <div className="profile-details p-4 bg-white rounded-lg shadow-md">
                    <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Membership Type:</strong> {profile.membershipType}</p>
                </div>
            )}
            
            {activeTab === 'purchasedCourses' && (
                <div className="purchased-courses p-4 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Purchased Courses</h2>
                    {profile.purchasedCourses.length > 0 ? (
                        <ul>
                            {profile.purchasedCourses.map((course) => (
                                <li key={course._id} className="mb-4">
                                    <div className="course-item p-4 border rounded-lg flex gap-4 bg-gray-50">
                                        <img src={course.image} alt={course.title} className="w-32 h-32 object-cover rounded-lg" />
                                        <div className="course-details flex-1">
                                            <p><strong>Course Title:</strong> {course.title}</p>
                                            <p><strong>Description:</strong> {course.description}</p>
                                            <p><strong>Price:</strong> ₹{course.price}</p>
                                            <p><strong>Instructor:</strong> {course.instructor.join(', ')}</p>
                                            <p><strong>Duration:</strong> {course.duration} minutes</p>
                                            <p><strong>Category:</strong> {course.category}</p>
                                            <p><strong>What You'll Learn:</strong> {course.whatYouLearn}</p>
                                            <p><strong>Rating:</strong> {course.rating} / 5</p>
                                            <p><strong>Completion Rate:</strong> {course.completionRate}%</p>
                                            <p><strong>Created At:</strong> {new Date(course.createdAt).toLocaleDateString()}</p>
                                            <p><strong>Updated At:</strong> {new Date(course.updatedAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No purchased courses found.</p>
                    )}
                </div>
            )}
            
            
        </div>
    );
};

export default ProfilePage;
