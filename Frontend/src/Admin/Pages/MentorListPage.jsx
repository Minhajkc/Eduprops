import React, { useEffect, useState } from 'react';
import { GetMentors } from '../../Services/adminService';
import Sidebar from '../Components/Layout/Sidebar';
import { FaEye } from 'react-icons/fa'; // Eye icon for viewing resumes
import Modal from 'react-modal'; // Ensure you install react-modal

Modal.setAppElement('#root'); // For accessibility reasons

const MentorListPage = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedResume, setSelectedResume] = useState(null); // State to hold the selected resume URL
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [showPending, setShowPending] = useState(false); // State to toggle visibility of pending mentors

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await GetMentors();
                setMentors(response.data);
            } catch (err) {
                setError('Failed to load mentors');
                console.error('Error fetching mentors:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    const openModal = (resumeUrl) => {
        setSelectedResume(resumeUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedResume(null);
    };

    const handleApprove = async (mentorId) => {
        try {
            // Call API to approve mentor
            await axios.patch(`your-api-endpoint/mentors/${mentorId}/approve`);
            // Fetch mentors again to refresh the list
            const response = await GetMentors();
            setMentors(response.data);
        } catch (err) {
            console.error('Error approving mentor:', err);
            setError('Failed to approve mentor');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const pendingMentors = mentors.filter(mentor => mentor.isActive === 'pending');
    const activeMentors = mentors.filter(mentor => mentor.isActive !== 'pending');

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-4">
                <h1 className="text-2xl font-bold mb-4">Mentors List</h1>

                {/* Toggle Button for Pending Mentors */}
                <button
                    onClick={() => setShowPending(!showPending)}
                    className="mb-6 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {showPending ? 'Hide Pending Mentors' : 'Show Pending Mentors'}
                </button>

                {/* Pending Mentors Section */}
                {showPending && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Pending Mentors</h2>
                        {pendingMentors.length > 0 ? (
                            <ul className="list-disc pl-5">
                                {pendingMentors.map((mentor) => (
                                    <li key={mentor._id} className="flex justify-between items-center mb-4">
                                        <span className="font-semibold">{mentor.firstName} {mentor.lastName}</span>
                                        <div className="flex items-center">
                                            <button onClick={() => openModal(mentor.resume)} className="text-blue-500">
                                                <FaEye />
                                            </button>
                                            <button
                                                onClick={() => handleApprove(mentor._id)}
                                                className="ml-4 bg-green-500 text-white px-4 py-2 rounded"
                                            >
                                                Approve
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No pending mentors found</p>
                        )}
                    </div>
                )}

                {/* Active Mentors Section */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Active Mentors</h2>
                    {activeMentors.length > 0 ? (
                        <ul className="list-disc pl-5">
                            {activeMentors.map((mentor) => (
                                <li key={mentor._id} className="mb-2">
                                    <span className="font-semibold">{mentor.firstName} {mentor.lastName}</span> - {mentor.degree}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No active mentors found</p>
                    )}
                </div>
            </div>

            {/* Resume Modal */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Resume Modal"
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                overlayClassName="fixed inset-0"
            >
                <div className="bg-white p-6 rounded">
                    <button onClick={closeModal} className="text-red-500 mb-4">Close</button>
                    {selectedResume && (
                        <iframe
                            src={selectedResume}
                            title="Mentor Resume"
                            className="w-full"
                            frameBorder="0"
                        />
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default MentorListPage;
