import React, { useEffect, useState } from 'react';
import { ApproveMentor, GetMentors, RejectMentor } from '../../Services/adminService';
import Sidebar from '../Components/Layout/Sidebar';
import { FaDownload } from 'react-icons/fa'; 
import axios from 'axios';


const MentorListPage = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPending, setShowPending] = useState(false); 

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

    if (loading) return <p>Loading...</p>;
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

                {/* Table for Active Mentors */}
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
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {activeMentors.map((mentor) => (
                                        <tr key={mentor._id}>
                                            <td className="px-4 py-4 text-sm font-medium text-gray-900">{mentor.username}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{mentor.email}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{mentor.firstName}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{mentor.lastName}</td>
                                            <td className="px-4 py-4 text-sm text-gray-500">{mentor.degree}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No active mentors found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MentorListPage;
