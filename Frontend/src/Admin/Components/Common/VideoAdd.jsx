import React, { useState } from 'react';
import { addVideoToCourse } from '../../../Services/adminService';

const VideoAdd = ({ courseId, closeModal, refreshCourses }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFiles, setVideoFiles] = useState([null, null, null]); // State for three video files
    const [loading, setLoading] = useState(false); // Loading state

    const handleFileChange = (index, file) => {
        const updatedFiles = [...videoFiles];
        updatedFiles[index] = file;
        setVideoFiles(updatedFiles);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const formData = new FormData();
            videoFiles.forEach((file, index) => {
                if (file) formData.append(`video${index + 1}`, file);
            });
            formData.append('title', title);
            formData.append('description', description);
            await addVideoToCourse(courseId, formData);
            setTitle('');
            setDescription('');
            setVideoFiles([null, null, null]);
            if (refreshCourses) refreshCourses();
            if (closeModal) closeModal();
        } catch (err) {
            console.error("Error adding video:", err.message);
        } finally {
            setLoading(false); // Set loading to false after submission is complete
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">Add New Video</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Video Title */}
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Video Title"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        disabled={loading} // Disable input while loading
                    />
                    {/* Video Description */}
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Video Description"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-24 resize-none"
                        disabled={loading} // Disable textarea while loading
                    />
                    {/* Video File Inputs */}
                    {[0, 1, 2].map((index) => (
                        <div key={index}>
                            <input
                                type="file"
                                onChange={(e) => handleFileChange(index, e.target.files[0])}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                disabled={loading} // Disable file input while loading
                            />
                        </div>
                    ))}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-red-400 text-white py-2 px-4 rounded-md hover:bg-red-600"
                            disabled={loading} // Disable button while loading
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-custom-cyan text-white py-2 px-4 rounded-md hover:bg-custom-cyan2"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0 8 8 0 01-16 0z"></path>
                                    </svg>
                                    Loading...
                                </span>
                            ) : (
                                'Add Video'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VideoAdd;
