import React, { useEffect, useState } from 'react';
import { ApproveMentor, GetMentors, RejectMentor,coursedetailsmentor, setCourseInstructor } from '../../Services/adminService';
import Sidebar from '../Components/Layout/Sidebar';
import { FaDownload } from 'react-icons/fa'; 
import Modal from 'react-modal';
import { Spin } from 'antd';


const MentorListPage = () => {
    const [mentors, setMentors] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPending, setShowPending] = useState(false); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const [selectedMentorId, setSelectedMentorId] = useState(null);

    const openModal = (mentorId) => {
      setSelectedMentorId(mentorId);
      setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
  
    const handleCourseSelect = (course) => {
      setSelectedCourse(course);
    };
  
    const handleSubmit = async () => {
        if (selectedCourse) {
          try {
            await setCourseInstructor(selectedCourse.courseId, selectedMentorId); // Assign the course to the mentor
            await fetchMentors();
            closeModal(); 
            setSelectedCourse('');
          } catch (error) {
            console.error('Error assigning instructor:', error);
          }
        }
      };
      

      const fetchMentors = async () => {
        try {
          setLoading(true); 
          const response = await GetMentors();
          setMentors(response.data); // Update mentors in state
      
          const courseResponse = await coursedetailsmentor(); // Fetch course details
          setCourses(courseResponse); 
        } catch (err) {
          setError('Failed to load mentors');
          console.error('Error fetching mentors:', err);
        } finally {
          setLoading(false); // Hide loading spinner after fetching
        }
      };
      
      useEffect(() => {
  
        fetchMentors();
      }, [])

    const handleApprove = async (mentorId) => {
        try {
            await ApproveMentor(mentorId);
            const response = await GetMentors()
            setMentors(response.data);
            setShowPending(true)
        } catch (err) {
            console.error('Error approving mentor:', err);
            setError('Failed to approve mentor');
        }
    };

    const handleReject = async (mentorId) =>{
        try {
            await RejectMentor(mentorId);
            const response = await GetMentors()
            setMentors(response.data);
            setShowPending(true)
        } catch (err) {
            console.error('Error approving mentor:', err);
            setError('Failed to approve mentor');
        }
    }

    const handleDownload = async (resumeUrl,mentorname) => {
        try {
            const response = await fetch(resumeUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.download = `${mentorname.replace(/\s+/g, '_')}.pdf`; // Specify the desired filename with .pdf extension
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <Spin  size='large'/>;
        </div>;
    }
    if (error) return <p>{error}</p>;

    const pendingMentors = mentors.filter(mentor => mentor.isActive === 'pending');
    const activeMentors = mentors.filter(mentor => mentor.isActive === 'active');

    return (
        <div className="flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Mentors List</h1>

   
                <button
                    onClick={() => setShowPending(!showPending)}
                    className="mb-6 bg-custom-cyan2 text-white px-4 py-2 rounded"
                >
                    {showPending ? `Hide Pending Mentors (${pendingMentors.length})` : `Show Pending Mentors (${pendingMentors.length})`}
                </button>

                {showPending && (
                    <div className="mb-6 overflow-x-auto">
                        <h2 className="text-xl font-semibold mb-4">Pending Mentors</h2>
                        {pendingMentors.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approve</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reject</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {pendingMentors.map((mentor) => (
                                        <tr key={mentor._id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{mentor.username}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{mentor.email}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{mentor.firstName}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{mentor.lastName}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{mentor.degree}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">
                                                <a
                                                    onClick={() => handleDownload(mentor.resume,mentor.firstName)}
                                                    className="text-blue-500 flex items-center cursor-pointer"
                                                >
                                                    <FaDownload className="mr-2" />
                                                    Download CV
                                                </a>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium">
                                                <button
                                                    onClick={() => handleApprove(mentor._id)}
                                                    className="bg-custom-cyan text-white px-4 py-2 rounded"
                                                >
                                                    Approve
                                                </button>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium">
                                                <button
                                                    onClick={() => handleReject(mentor._id)}
                                                    className="bg-red-400 text-white px-4 py-2 rounded"
                                                >
                                                    Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No pending mentors found</p>
                        )}
                    </div>
                )}

                <div>
                    <h2 className="text-xl font-semibold mb-4">Active Mentors</h2>
                    {activeMentors.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor For</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor For</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enroll</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {activeMentors.map((mentor) => (
                                        <tr key={mentor._id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{mentor.username}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{mentor.email}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{mentor.firstName}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">
          {mentor.assignedCourses.length > 0
            ? mentor.assignedCourses.map((course) => course.title).join(', ')
            : 'No course assigned'}
        </td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{mentor.degree}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{mentor.degree}</td>
                                            <td>
        <button
              className="bg-custom-cyan text-white px-4 py-2 rounded"
              onClick={() => openModal(mentor._id)} // Pass the mentor._id to the handler
            >
              Enroll a Course
            </button>
      </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No active mentors found</p>
                    )}
                </div>
                <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Select Course"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-lg shadow-xl p-6 max-w-md w-full"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Select an Available Course</h2>

        <div className="mb-4 max-h-60 overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <div className="space-y-2">
              {courses.map((course) => (
                <div
                  key={course.courseId}
                  className={`p-3 border rounded-md cursor-pointer transition-colors duration-200 ${
                    selectedCourse?._id === course.courseId
                      ? 'bg-blue-100 border-blue-300'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleCourseSelect(course)}
                >
                  <h3 className="text-sm font-medium text-gray-800">{course.title}</h3>
                  <p className="text-xs text-gray-500">Category: {course.categoryName}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          {selectedCourse ? (
            <div className="text-sm text-gray-700">
              <p className="font-semibold">{selectedCourse.title}</p>
              <p className="text-xs">{selectedCourse.categoryName}</p>
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">No course selected</div>
          )}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSubmit}
            disabled={!selectedCourse}
          >
            Set Course 
          </button>
        </div>
      </div>
    </Modal>
            </div>
        </div>
    );
};

export default MentorListPage;
