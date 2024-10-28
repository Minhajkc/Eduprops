import React, { useState } from 'react';
import { Play, BookOpen, PlayCircle, X } from 'lucide-react';
import { Modal, Button } from 'antd';

const CourseVideoModal = ({ lessons, courseTitle, onClose }) => {
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const openVideoInFullscreen = (url, lesson) => {
    setCurrentVideo(url);
    setSelectedLesson(lesson);
    setVideoModalVisible(true);
  };

  return (
    <>
      {/* Main Course Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-custom-cyan2" />
            <h2 className="text-lg font-bold">{courseTitle}</h2>
          </div>
        }
        visible={true}
        onCancel={onClose}
        footer={null}
        width="80%"
        bodyStyle={{ maxHeight: '70vh', overflowY: 'auto' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson, lessonIndex) => (
            <div
              key={lesson._id}
              className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-3">
                {/* Play Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-custom-cyan2/10 group-hover:bg-custom-cyan2/20 transition-colors flex-shrink-0">
                  <Play className="w-6 h-6 text-custom-cyan" />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Lesson Header */}
                  <div className="mb-2">
                    <span className="px-2 py-0.5 bg-custom-cyan2/10 text-custom-cyan2 text-xs rounded-full">
                      Lesson {lessonIndex + 1}
                    </span>
                  </div>

                  {/* Lesson Title & Description */}
                  <h3 className="text-sm font-semibold mb-1.5 group-hover:text-custom-cyan2 transition-colors truncate">
                    {lesson.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-2.5 line-clamp-2">
                    {lesson.description}
                  </p>

                  {/* Video Buttons */}
                  <div className="flex flex-wrap gap-1.5">
                    {lesson.url.map((url, index) => (
                      <Button
                        key={index}
                        onClick={() => openVideoInFullscreen(url, lesson)}
                        icon={<PlayCircle className="w-3.5 h-3.5" />}
                        className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-custom-cyan2/10 hover:border-custom-cyan2 hover:text-custom-cyan2 transition-colors"
                      >
                        Video {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Video Modal */}
      <Modal
        visible={isVideoModalVisible}
        onCancel={() => setVideoModalVisible(false)}
        footer={null}
        width="90%"
        centered
        bodyStyle={{ padding: 0, backgroundColor: 'black' }}
      >
        <div className="relative aspect-video bg-black">
          {currentVideo && (
            <video controls autoPlay src={currentVideo} className="w-full h-full" />
          )}
        </div>
      </Modal>
    </>
  );
};

export default CourseVideoModal;
