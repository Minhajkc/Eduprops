import  { useEffect, useState } from 'react';
import { fetchStudentProfile} from '../../Services/studentService';
import Footer from '../Components/Layout/Footer'
import { FaComments } from 'react-icons/fa';
import {  Spin,Select } from 'antd';
import GroupChat from '../Components/Layout/GroupChat';


const { Option } = Select;



const StudentPortal = () => {
    const [profile, setProfile] = useState(null);
    const [mentors,setMentors] = useState(null)
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedCourseTitle, setSelectedCourseTitle] = useState('');

    const handleCourseChange = (value) => {
        setSelectedCourseId(value);
        const selectedCourse = profile.purchasedCourses.find((course) => course._id === value);
        setSelectedCourseTitle(selectedCourse.title);

        console.log("Selected Course ID:", value);
    }


    useEffect(() => {
        const getProfile = async () => {
            try {
                const profileData = await fetchStudentProfile();
                 console.log(profileData)
                setProfile(profileData.student);
                setMentors(profileData.mentors)
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } finally {
                setLoading(false);
            }
        };

        getProfile();
    }, []);


 

    if (loading) {
        return <div className="flex items-center justify-center h-screen bg-gray-100">
            <Spin  size='large'/>;
        </div>;
    }

    if (!profile) {
        return <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-2xl font-semibold text-gray-700">No profile data available.</div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 font-roboto">
            

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 ">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Student Portal</h1>
                        <div className="flex  bg-gray-300 p-1 rounded-xl ">
                            {['Profile', 'Courses', 'Teachers', 'Chat','Subscription'].map((tab) => (
                                 (tab !== 'Subscription' || profile.subscription?.length > 0) &&(
                                <button
                                    key={tab.toLowerCase()}
                                    className={`py-2  px-3 rounded-lg lg:text-sm text-xs font-medium transition-colors duration-150 ${
                                        activeTab === tab.toLowerCase()
                                            ? 'bg-white text-custom-cyan shadow'
                                            : 'text-gray-600 hover:text-gray-900'
                                    }`}
                                    onClick={() => setActiveTab(tab.toLowerCase())}
                                >
                                    {tab}
                                </button>
                                 )
                            ))}
                        </div>
                    </div>

                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    {activeTab === 'profile' && (
    <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center space-x-5 mb-5">
            <div className="flex-shrink-0">
                <div className="relative">
                <div className="w-20 h-20 bg-custom-cyan rounded-full flex items-center justify-center text-custom-cyan2">
          <span className="text-4xl font-bold">
            {profile.username.charAt(0).toUpperCase()}
            {profile.email.charAt(0).toUpperCase()}

          </span>
        </div>
                  
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                    {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-sm font-medium text-gray-500">{profile.username}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="text" value={profile.email} readOnly className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Membership Type</label>
                <div className={`flex items-center mt-1 block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm 
                    ${profile.membershipType === 'gold' ? 'border-yellow-500 bg-yellow-100' :
                        profile.membershipType === 'platinum' ? 'border-purple-500 bg-purple-100' :
                        profile.membershipType === 'silver' ? 'border-gray-500 bg-gray-100' : 'border-gray-300'}`}>
                    {profile.membershipType === 'gold' && (
                        <>
                            <span className="text-yellow-500 mr-2">
                                <i className="fas fa-crown"></i> {/* Crown icon for Gold */}
                            </span>
                            <span>Gold Membership</span>
                        </>
                    )}
                    {profile.membershipType === 'platinum' && (
                        <>
                            <span className="text-purple-500 mr-2">
                                <i className="fas fa-gem"></i> {/* Gem icon for Platinum */}
                            </span>
                            <span>Platinum Membership</span>
                        </>
                    )}
                    {profile.membershipType === 'silver' && (
                        <>
                            <span className="text-gray-500 mr-2">
                                <i className="fas fa-medal"></i> {/* Medal icon for Silver */}
                            </span>
                            <span>Silver Membership</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
)}

                        {activeTab === 'courses' && (
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Purchased Courses</h3>
                                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
                                    {profile.purchasedCourses.map((course) => (
                                        <div key={course._id} className="flex flex-col p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center">
                                                    <img className="object-cover w-8 h-8 rounded-full" src={course.image} alt="Course" />
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{course.title}</p>
                                                    </div>
                                                </div>
                                                <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">{course.completionRate}% Complete</span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{course.description}</p>
                                            <div className="flex items-center justify-between mt-4">
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Rating: {course.rating}/5</span>
                                                <button className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

{activeTab === 'subscription'  && profile.subscription && profile.subscription.length > 0 && (
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Subscribed Courses</h3>
                                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
                                    {profile.subscription.map((course) => (
                                        <div key={course._id} className="flex flex-col p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center">
                                                    <img className="object-cover w-8 h-8 rounded-full" src={course.image} alt="Course" />
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{course.title}</p>
                                                    </div>
                                                </div>
                                                <span className="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">{course.completionRate}% Complete</span>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{course.description}</p>
                                            <div className="flex items-center justify-between mt-4">
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Rating: {course.rating}/5</span>
                                                <button className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue">
                                                    Continue
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'teachers' && (
    <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Your Teachers</h3>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {mentors.map((mentor, index) => (
                <li key={mentor._id} className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                    <div className="flex-1 flex flex-col p-8">
                        <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={`/placeholder-teacher-${index + 1}.jpg`} alt="" />
                        <h3 className="mt-6 text-gray-900 text-sm font-medium">{mentor.username}</h3>
                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                            <dt className="sr-only">Title</dt>
                            <dd className="text-gray-500 text-sm">Professor</dd>
                        </dl>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="w-0 flex-1 flex">
                                <a href={`mailto:${mentor.email}`} className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                                    <span className="ml-3">Email</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
)}

{activeTab === 'chat' && (
        <div className='p-5'>
          {selectedCourseId ? (
            <div className='flex items-center justify-center mb-4'>
              <FaComments className='text-custom-cyan text-3xl mr-2' />
              <h2 className='text-2xl text-center font-bold'>
                <span className='text-black'>Community Chat: </span>
                <span className='text-custom-cyan'>{selectedCourseTitle}</span>
              </h2>
            </div>
          ) : null}
          <div className='border-b w-full mb-4 text-center'>
            <Select
              placeholder="Select a course"
              onChange={(value) => handleCourseChange(value)}
              style={{ width: '100%', maxWidth: 300, marginBottom: 20 }}
            >
              {profile.purchasedCourses.map((course) => (
                <Option key={course._id} value={course._id}>
                  <div className="flex items-center">
                    <img className="object-cover w-8 h-8 rounded-full" src={course.image} alt="Course" />
                    <span className="ml-2">{course.title}</span>
                  </div>
                </Option>
              ))}
            </Select>
          </div>
         
          {selectedCourseId ? (
            <div>
              <GroupChat courseId={selectedCourseId} userName={profile.username} />
            </div>
          ) : (
            <p className='p-2 text-center text-gray-600'>
              <FaComments className='inline-block mr-2 text-xl' />
              Please select a course to start the community chat.
            </p>
          )}
        </div>
      )}
                    </div>
                </div>
                
            
            </div>
            <Footer/>
        </div>
    );
};

export default StudentPortal;