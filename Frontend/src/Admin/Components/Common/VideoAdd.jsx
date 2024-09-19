import React, { useState, useEffect } from 'react';
import { addVideoToCourse, editLessonVideo } from '../../../Services/adminService'; // Ensure the correct service is imported

const VideoAdd = ({ courseId, lesson, closeModal, lessonIndex, refreshCourses }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFiles, setVideoFiles] = useState([]); // State for video files
    const [loading, setLoading] = useState(false); // Loading state
    const [editingVideoIndex, setEditingVideoIndex] = useState(null); // State to keep track of the editing video index
    const maxVideoCount = 3; // Maximum number of video inputs allowed

    useEffect(() => {
        if (lesson) {
            // Pre-fill form when editing
            setTitle(lesson.title);
            setDescription(lesson.description);
            setVideoFiles(
                // Populate the video files array based on the number of existing videos
                lesson.url.map((url, index) => ({ name: `Video ${index + 1}`, url }))
            );
        } else {
            // Initialize with a fixed number of input fields (up to 3) for new video addition
            setVideoFiles(new Array(maxVideoCount).fill(null));
        }
    }, [lesson]);

    const handleFileChange = (index, file) => {
        const updatedFiles = [...videoFiles];
        updatedFiles[index] = file;
        setVideoFiles(updatedFiles);
    };

    const handleFileClick = (index) => {
        setEditingVideoIndex(index);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            videoFiles.forEach((file, index) => {
                if (file && file.url === undefined) { // Only append new files
                    formData.append(`video${index + 1}`, file);
                }
            });
            formData.append('title', title);
            formData.append('description', description);
            formData.append('lessonIndex', lessonIndex);
            formData.append('editingVideoIndex', editingVideoIndex); // Pass the index of the video being edited

            if (lesson) {
                // Edit existing lesson
                await editLessonVideo(courseId, lesson._id, formData);
            } else {
                // Add new video
                await addVideoToCourse(courseId, formData);
            }

            // Reset form
            setTitle('');
            setDescription('');
            setVideoFiles(new Array(maxVideoCount).fill(null));

            if (refreshCourses) refreshCourses();
            if (closeModal) closeModal();
        } catch (err) {
            console.error("Error submitting video form:", err.message);
        } finally {
            setLoading(false); // Set loading to false after submission is complete
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">{lesson ? 'Edit Video' : 'Add New Video'}</h3>
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
                    {videoFiles.map((file, index) => (
                        <div key={index}>
                            <input
                                type="file"
                                onClick={() => handleFileClick(index)} // Track which file input is clicked
                                onChange={(e) => handleFileChange(index, e.target.files[0])}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                disabled={loading} // Disable file input while loading
                            />
                            {file?.url && <p className="text-sm text-gray-500">{file.name || `Existing Video ${index + 1}`}</p>}
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
                            ) : lesson ? 'Update Video' : 'Add Video'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VideoAdd;
