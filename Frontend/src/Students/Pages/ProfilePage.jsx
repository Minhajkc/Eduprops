import  { useEffect, useState } from 'react';
import { fetchStudentProfile,addReview} from '../../Services/studentService';
import Footer from '../Components/Layout/Footer'
import { FaComments } from 'react-icons/fa';
import {  Spin,Select, Modal, Badge,Button, Rate, Input} from 'antd';
import GroupChat from '../Components/Layout/GroupChat';
import { CalendarOutlined,MessageOutlined   } from '@ant-design/icons';
import { Calendar, Clock, Video, User } from 'lucide-react';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import CourseVideoModal from '../Components/Layout/CourseVideoModal';
import {  showToastInfo } from '../../utils/toastify';


// Extend dayjs with the isSameOrAfter plugin
dayjs.extend(isSameOrAfter);




const { Option } = Select;



const StudentPortal = () => {
    const [profile, setProfile] = useState(null);
    const [mentors,setMentors] = useState(null)
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('profile');
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [selectedCourseTitle, setSelectedCourseTitle] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [scheduleMeets, setScheduleMeets] = useState([]);
    const [currentTime, setCurrentTime] = useState(dayjs().format('HH:mm'))
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [isReviewModalVisible, setReviewModalVisible] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);
    console.log(mentors)
  
    const showReviewModal = () => {
      setReviewModalVisible(true);
  };

  const handleReviewSubmit = async () => {
  
      setReviewLoading(true); // Set loading to true when submitting
      try {
          const reviewPayload = {
              rating: reviewRating,
              reviewText: reviewText,
              userId: profile._id,
              userName: profile.username,
          };

          if (reviewPayload.rating === 0  ) {
            showToastInfo('Please provide a rating.');
            return;
          }

          await addReview(reviewPayload); // Call your addReview function
          setReviewRating(0); // Reset rating
          setReviewText(''); // Clear text area
          setReviewModalVisible(false); // Close the modal
      } catch (e) {
          console.error('Error submitting review:', e);
      } finally {
          setReviewLoading(false); // Reset loading state
      }
  };

    const openModal = (course) => {
        setSelectedCourse(course);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedCourse(null);
    };


    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentTime(dayjs().format('HH:mm')); // Update current time every minute
      }, 60000); // Update every 1 minute
      return () => clearInterval(timer);
    }, []);
  
    const formatTime = (timeString) => {
      return dayjs(timeString, 'HH:mm').format('HH:mm');
    };
  
    const isTimeAfterOrEqual = (meetTime) => {
      return dayjs(currentTime, 'HH:mm').isSameOrAfter(dayjs(meetTime, 'HH:mm'));
    };


    const formatDate = (date) => new Date(date).toISOString().split('T')[0];
  
    // Get today's date in 'YYYY-MM-DD' format
    const today = formatDate(new Date());


    // Function to show the modal
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    // Function to handle closing the modal
    const handleCancel = () => {
      setIsModalVisible(false);
    }

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
                console.log(profileData.student,'studentdata')
                setScheduleMeets(profileData.scheduleMeets);
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

    const handleAttendanceMark = (meetingId, userId) => {
        console.log(`Attendance marked for ${userId} in meeting ${meetingId}`);
      };

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
                    <div className="relative">
      {/* Notification Icon in the top-right */}
      <div className="absolute top-0 right-0 p-4 flex items-center gap-4">
            {/* Calendar Badge */}
            <Badge count={scheduleMeets.length} size="small">
                <CalendarOutlined 
                    className="text-2xl cursor-pointer text-gray-500" 
                    onClick={showModal} 
                />
            </Badge>
            
            {/* Review Icon */}
            <MessageOutlined 
                className="text-2xl cursor-pointer text-gray-500" 
                onClick={showReviewModal} 
            />

            {/* Review Modal */}
            <Modal
    title="Leave a Review"
    visible={isReviewModalVisible}
    onCancel={() => setReviewModalVisible(false)}
    footer={
        <Button 
            type="primary" 
            onClick={handleReviewSubmit} 
            loading={reviewLoading} // Use loading prop
            className="bg-custom-cyan hover:bg-custom-cyan2 " // Custom classes for button color
        >
            Submit Review
        </Button>
    }
    
>
  
    {/* Caution message */}
    
    
    <Rate allowHalf value={reviewRating} onChange={setReviewRating}/>
    <Input.TextArea 
        rows={4} 
        placeholder="Write your review here" 
        value={reviewText} 
        onChange={(e) => setReviewText(e.target.value)} 
        className="mt-4" 
        
    />
    <p className="text-orange-500 text-xs py-2 text-center">Caution: If you have already left a review, you do not need to submit another.</p>
</Modal>

        </div>

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
              <input
                type="text"
                value={profile.email}
                readOnly
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Membership Type</label>
              <div
                className={`flex items-center mt-1 block w-full border rounded-md shadow-sm py-2 px-3 sm:text-sm 
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

      {/* Ant Design Modal for Notifications */}
      <Modal
      title={<h2 className="text-2xl font-bold text-gray-800 font-roboto">Scheduled Live Sections</h2>}
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      width="100vw"
      className="max-w-5xl"
      centered
    >
      <div className="overflow-y-auto max-h-[70vh]">
        {scheduleMeets.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {scheduleMeets.map((course, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                {/* Course Header */}
                <div className="bg-custom-cyan2 p-4 rounded-t-lg">
                  <h3 className="text-lg font-medium text-white text-center">
                    {course.courseTitle}
                  </h3>
                </div>

                {/* Meetings Container */}
                <div className="p-4">
                  {course.meetings.map((meet, idx) => (
                    <div
                      key={idx}
                      className="mb-4 last:mb-0 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                    >
                      {/* Meeting Title */}
                      <div className="flex items-center text-gray-700 mb-3">
                        <Calendar className="w-4 h-4 mr-2 text-cyan-600" />
                        <span className="font-medium">{meet.name}</span>
                      </div>

                      {/* Meeting Details Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="w-3 h-3 mr-2 text-cyan-600" />
                          <span>{meet.date}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock className="w-3 h-3 mr-2 text-cyan-600" />
                          <span>{meet.startTime}</span>
                        </div>
                        
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock className="w-3 h-3 mr-2 text-cyan-600" />
                          <span>{meet.endTime}</span>
                        </div>
                      </div>

                      {/* Join Meeting Button or Message */}
                      {today === formatDate(meet.date) && isTimeAfterOrEqual(meet.startTime) ? (
                        <button
                          onClick={() => window.open(meet.link, '_blank')}
                          className="w-full mt-2 flex items-center justify-center gap-2 bg-custom-cyan text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
                        >
                          <Video className="w-4 h-4" />
                          Join Meeting
                        </button>
                      ) : (
                        <div className="mt-2 text-orange-500 text-xs text-center bg-orange-50 p-2 rounded-lg">
                          Link available at {meet.startTime} on meeting day
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No upcoming meetings scheduled for your Courses</p>
          </div>
        )}
      </div>
    </Modal>
    </div>

                          {activeTab === 'courses' && (
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Purchased Courses</h3>
                    <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
                        {profile.purchasedCourses.map((course) => (
                            <div key={course._id} className="flex flex-col p-4 bg-white rounded-lg shadow-xs dark:bg-custom-cyan2">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <img className="object-cover w-8 h-8 rounded-full" src={course.image} alt="Course" />
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{course.title}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-700 font-">{course.description}</p>
                                <div className="flex items-center align-middle mt-4">
                                 
                                    <button
                                        onClick={() => openModal(course)}
                                        className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-custom-cyan border border-transparent rounded-md  hover:bg-cyan-700 focus:outline-none focus:shadow-outline-blue"
                                    >
                                        Lessons
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isModalOpen && selectedCourse && (
                <CourseVideoModal
                    lessons={selectedCourse.lessons}
                    courseTitle={selectedCourse.title}
                    onClose={closeModal}
                />
            )}
{activeTab === 'subscription'  && profile.subscription && profile.subscription.length > 0 && (
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Subscribed Courses</h3>
                                <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
                                    {profile.subscription.map((course) => (
                                        <div key={course._id} className="flex flex-col p-4 bg-white rounded-lg shadow-xs dark:bg-custom-cyan2">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center">
                                                    <img className="object-cover w-8 h-8 rounded-full" src={course.image} alt="Course" />
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{course.title}</p>
                                                    </div>
                                                </div>
   
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-800">{course.description}</p>
                                            <div className="flex items-center justify-between mt-4">
                                           
                                                <button className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-custom-cyan border border-transparent rounded-md  hover:bg-cyan-800 focus:outline-none focus:shadow-outline-blue"      onClick={() => openModal(course)}>
                                                  
                                                    Lessons
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
            {mentors.map((mentor) => (
                <li key={mentor._id} className="col-span-1 flex flex-col items-center text-center bg-white rounded-lg shadow divide-y divide-gray-200 p-4 pt-10">
                    <div className="flex-1 flex flex-col items-center">
                        <User size={60} className="text-custom-cyan bg-gray-100 p-2 rounded-full" />
                        <h3 className="mt-4 text-gray-900 text-sm font-medium">{mentor.username}</h3>
                        <dl className="mt-1 flex-grow flex flex-col justify-between">
                            <dt className="sr-only">Title</dt>
                            <dd className="text-gray-500 text-sm">{mentor.degree}</dd>
                        </dl>
                    </div>
                    <div className="w-full border-t border-gray-200 mt-4">
                        <div className="flex divide-x divide-gray-200">
                            <div className="w-full">
                                <a href={`mailto:${mentor.email}`} className="inline-flex items-center justify-center w-full py-2 text-sm text-gray-700 font-medium hover:text-gray-500">
                                    Email
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
          <p className='text-xs  pb-5 '>Community Chat Will not Available for Subscribed Courses</p>
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