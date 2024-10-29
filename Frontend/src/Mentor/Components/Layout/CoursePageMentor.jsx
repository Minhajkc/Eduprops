import React, { useEffect, useState } from 'react';
import { Trash2, Edit3, PlusCircle, Video, Loader2 } from 'lucide-react';
import EditCourse from './EditCourse';
import { fetchCourseDetails, addVideoToCourse,deleteCourseLesson } from '../../../Services/mentorService';




const CoursePageMentor = ({ courseId }) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
  const [lessonData, setLessonData] = useState({
    title: '',
    description: '',
    videos: [null, null, null] // Array for 3 video slots
  });

  const loadCourseDetails = async () => {
    setLoading(true);
    try {
      const result = await fetchCourseDetails(courseId);
      if (result.success) {
        setCourse(result.course);
      }
    } catch (error) {
      console.error('Failed to load course:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (courseId) {
      loadCourseDetails(); // Call to load course details on component mount
    }
  }, [courseId]);


  const handleDeleteLesson = async (lessonIndex, courseId) => {
    if (window.confirm('Are you sure you want to delete this lesson?')) {
      try {
        await deleteCourseLesson(courseId, lessonIndex);
        
        // Optionally update the local state to reflect the deletion
        const updatedLessons = course.lessons.filter((_, index) => index !== lessonIndex);
        setCourse({ ...course, lessons: updatedLessons });
  
      } catch (error) {
        console.error('Failed to delete lesson:', error);
      }
    }
  };
  

  const handleVideoUpload = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const updatedVideos = [...lessonData.videos];
      updatedVideos[index] = file;
      setLessonData({ ...lessonData, videos: updatedVideos });
    }
  };

  const removeVideo = (index) => {
    const updatedVideos = [...lessonData.videos];
    updatedVideos[index] = null;
    setLessonData({ ...lessonData, videos: updatedVideos });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!lessonData.title || !lessonData.description) {
      alert('Please fill in all required fields');
      return;
    }
  
    const hasAtLeastOneVideo = lessonData.videos.some(video => video !== null);
    if (!hasAtLeastOneVideo) {
      alert('Please upload at least one video');
      return;
    }
  
    // Prepare the form data for video upload
    const formData = new FormData();
    formData.append('title', lessonData.title);
    formData.append('description', lessonData.description);
    lessonData.videos.forEach((video, index) => {
      if (video) {
        formData.append(`video${index + 1}`, video); // Append each video with a unique key
      }
    });
  
    try {
      // Call the addVideoToCourse function with the necessary parameters
      await addVideoToCourse(courseId, formData);

      loadCourseDetails()
      setLessonData({ title: '', description: '', videos: [null, null, null] });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add video to course:', error);
    }
  };
  

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const handleEditLesson = (index, lesson) => {
    setSelectedLesson(lesson);
    setSelectedLessonIndex(index); // Store the index
    setShowEditCourse(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Course Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8">
            <h1 className="text-3xl font-bold text-white mb-2">{course?.title}</h1>
            <p className="text-blue-100">{course?.description}</p>
          </div>

          {/* Lessons Section */}
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Course Lessons</h2>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Add New Lesson
              </button>
            </div>

            {/* Lessons List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {course?.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="bg-white border  border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-600 mb-3">{lesson.description}</p>
                      <div className="flex items-center text-sm text-blue-600">
                        <Video className="w-4 h-4 mr-2" />
                        {lesson.url.length} Video{lesson.url.length !== 1 ? 's' : ''} uploaded
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditLesson(index,lesson)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      >
                        <Edit3 className="w-5 h-5" />
                      </button>
                      <button
  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
  onClick={() => handleDeleteLesson(index, courseId)} // Correct placement of onClick
>
  <Trash2 className="w-5 h-5" />
</button>

                    </div>
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>

        {/* Add Lesson Modal */}
        {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-sm w-full p-4 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Add New Lesson</h3>
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lesson Title *
          </label>
          <input
            type="text"
            value={lessonData.title}
            onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter lesson title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Lesson Description *
          </label>
          <textarea
            value={lessonData.description}
            onChange={(e) => setLessonData({ ...lessonData, description: e.target.value })}
            className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows="3"
            placeholder="Enter lesson description"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Videos (Upload at least one video)
          </label>
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="border-2 border-dashed border-gray-300 rounded-lg p-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-gray-700">
                      Video {index + 1}
                    </h4>
                    {lessonData.videos[index] ? (
                      <p className="text-xs text-gray-500">
                        {lessonData.videos[index].name}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500">No file selected</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {lessonData.videos[index] ? (
                    <button
                      type="button"
                      onClick={() => removeVideo(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  ) : (
                    <label className="cursor-pointer px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs">
                      Upload
                      <input
                        type="file"
                        className="hidden"
                        accept="video/*"
                        onChange={(e) => handleVideoUpload(e, index)}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-xs"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs"
          >
            Add Lesson
          </button>
        </div>
      </form>
    </div>
  </div>
)}


        {/* Edit Course Component */}
        {showEditCourse && selectedLesson && (
          <EditCourse
            lesson={selectedLesson}
            indexforedit={selectedLessonIndex}
            courseId={courseId}
            onClose={() => {
              setShowEditCourse(false);
              setSelectedLesson(null);
            }}
            onCourseUpdated={ loadCourseDetails}
          />
        )}
      </div>
    </div>
  );
};

export default CoursePageMentor;