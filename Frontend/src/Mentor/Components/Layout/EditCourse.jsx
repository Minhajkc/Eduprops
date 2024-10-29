import React, { useState } from 'react';
import { X } from 'lucide-react';
import { editLessonVideo, updateLesson } from '../../../Services/mentorService'; // Import the new update function

const EditCourse = ({ lesson, onClose, courseId, onCourseUpdated }) => {
  const [newVideos, setNewVideos] = useState([null, null, null]);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(lesson.description);
  const [loading, setLoading] = useState(false);

  const handleVideoUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const updatedVideos = [...newVideos];
      updatedVideos[index] = file;
      setNewVideos(updatedVideos);
    }
  };

  const handleSubmit = async (index) => {
    if (newVideos[index] === null) {
      alert('Please select a video to upload');
      return;
    }

    setLoadingIndex(index);

    const formData = new FormData();
    formData.append('editingVideoIndex', index);
    formData.append('newVideo', newVideos[index]);

    try {
      await editLessonVideo(courseId, lesson._id, formData);
      onCourseUpdated();
      setNewVideos((prev) => {
        const updated = [...prev];
        updated[index] = null;
        return updated;
      });
    } catch (error) {
      console.error('Error updating lesson video:', error);
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = {
      title,
      description,
    };

    try {
      await updateLesson(courseId, lesson._id, updatedData); // Call the update service
      onCourseUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
      <div className="bg-white rounded-xl max-w-sm w-full p-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Edit Lesson Videos</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter lesson title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Enter lesson description"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center px-4 py-2 ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700 transition-colors`}
            >
              {loading ? 'Updating...' : 'Update Lesson'}
            </button>
          </form>
          <h4 className="text-lg font-semibold text-gray-700 mb-1">Existing Videos</h4>
          {lesson.url.map((video, index) => (
            <div key={index} className="flex items-center justify-between p-1 border border-gray-300 rounded-lg">
              <span className="text-gray-800 truncate max-w-[150px]" title={video}>{video}</span>
              <div className="flex items-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleVideoUpload(e, index)}
                  className="mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleSubmit(index)}
                  className={`text-blue-500 hover:underline ${loadingIndex === index ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loadingIndex === index}
                >
                  {loadingIndex === index ? 'Updating...' : 'Update'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditCourse;
