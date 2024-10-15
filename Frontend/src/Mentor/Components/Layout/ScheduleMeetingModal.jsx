import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, DatePicker, TimePicker, message, Spin } from 'antd';
import moment from 'moment';

const ScheduleMeetingModal = ({ isVisible, onClose, courseId }) => {
  const [meetingName, setMeetingName] = useState('');
  const [meetingDate, setMeetingDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [scheduledMeets, setScheduledMeets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId && isVisible) {
      fetchScheduledMeets();
    }
  }, [courseId, isVisible]);

  // Fetch the previously scheduled meets (optional, use your own logic)
  const fetchScheduledMeets = () => {
    // In a real-world app, you could fetch this from a server or database
    setLoading(true);
    setTimeout(() => {
      // Simulating a fetch call
      setLoading(false);
    }, 1000);
  };

  // Function to generate a unique Jitsi meeting link
  const generateJitsiMeetingLink = (meetingId) => {
    const baseUrl = 'https://meet.jit.si/';
    return `${baseUrl}${meetingId}`;
  };

  // Generate a unique meeting ID and schedule the meeting
  const handleSchedule = () => {
    if (!meetingName || !meetingDate || !startTime || !endTime) {
      message.error('Please fill all fields');
      return;
    }

    setLoading(true);
    setError(null);

    // Generate a unique meeting ID using timestamp and courseId
    const meetingId = `${courseId}-${Date.now()}`;
    const meetingLink = generateJitsiMeetingLink(meetingId);

    const meetingData = {
      name: meetingName,
      date: meetingDate.format('YYYY-MM-DD'),
      startTime: startTime.format('HH:mm'),
      endTime: endTime.format('HH:mm'),
      meetingLink: meetingLink,
    };

    // Add the new meeting to the scheduled meetings list
    setScheduledMeets((prevMeets) => [...prevMeets, meetingData]);
    message.success('Meeting scheduled successfully');
    onClose(); // Close modal after scheduling
    setLoading(false);
  };

  // Function to delete a scheduled meeting
  const handleDeleteMeet = (meetingIndex) => {
    setScheduledMeets((prevMeets) => prevMeets.filter((_, index) => index !== meetingIndex));
    message.success('Meeting deleted successfully');
  };

  return (
    <Modal
      title="Schedule Jitsi Meet"
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSchedule} loading={loading}>
          Schedule
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Input
          placeholder="Meeting Name"
          value={meetingName}
          onChange={(e) => setMeetingName(e.target.value)}
        />
        <DatePicker
          placeholder="Select Date"
          onChange={(date) => setMeetingDate(date)}
          style={{ width: '100%', marginTop: 10 }}
        />
        <TimePicker
          placeholder="Start Time"
          onChange={(time) => setStartTime(time)}
          style={{ width: '100%', marginTop: 10 }}
        />
        <TimePicker
          placeholder="End Time"
          onChange={(time) => setEndTime(time)}
          style={{ width: '100%', marginTop: 10 }}
        />
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
        <div style={{ marginTop: 20 }}>
          <h3>Scheduled Meetings:</h3>
          {scheduledMeets.length === 0 ? (
            <p>No meetings scheduled yet.</p>
          ) : (
            <ul>
              {scheduledMeets.map((meet, index) => (
                <li key={index}>
                  <strong>{meet.name}</strong> - {meet.date} {meet.startTime} - {meet.endTime}
                  <br />
                  <a href={meet.meetingLink} target="_blank" rel="noopener noreferrer">
                    Join Meeting
                  </a>
                  <Button type="link" onClick={() => handleDeleteMeet(index)}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Spin>
    </Modal>
  );
};

export default ScheduleMeetingModal;
