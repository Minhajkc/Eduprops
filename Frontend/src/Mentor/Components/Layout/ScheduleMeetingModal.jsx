import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, DatePicker, TimePicker, Spin } from 'antd';
import { scheduleMeeting, updateMeeting } from '../../../Services/mentorService';
import moment from 'moment';

const ScheduleMeetingModal = ({ isVisible, onClose, courseId, meetingToEdit, onScheduleSuccess }) => {
  const [meetingName, setMeetingName] = useState('');
  const [meetingDate, setMeetingDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Pre-fill the modal if editing an existing meeting
    if (meetingToEdit) {
      setMeetingName(meetingToEdit.name);
      setMeetingDate(moment(meetingToEdit.date));
      setStartTime(moment(meetingToEdit.startTime, 'HH:mm'));
      setEndTime(moment(meetingToEdit.endTime, 'HH:mm'));
    } else {
      clearForm(); // Clear form if adding a new meeting
    }
  }, [meetingToEdit]);

  const handleSchedule = async () => {
    if (!meetingName || !meetingDate || !startTime || !endTime) {
      return;
    }

    setLoading(true);
    const meetingData = {
      name: meetingName,
      date: meetingDate.format('YYYY-MM-DD'),
      startTime: startTime.format('HH:mm'),
      endTime: endTime.format('HH:mm'),
    };

    try {
      if (meetingToEdit) {
        await updateMeeting(courseId, meetingToEdit._id, meetingData);
      } else {
        // Create a new meeting
        const meetingId = `${courseId}-${Date.now()}`;
        const meetingLink = `https://meet.jit.si/${meetingId}`;
        meetingData.meetingLink = meetingLink;
        await scheduleMeeting(courseId, meetingData);
      }
      onScheduleSuccess(); // Trigger the callback after success
      onClose(); // Close the modal
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setMeetingName('');
    setMeetingDate(null);
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <Modal
      title={meetingToEdit ? "Edit Meeting" : "Schedule Jitsi Meet"}
      visible={isVisible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleSchedule} loading={loading}>
          {meetingToEdit ? "Update" : "Schedule"}
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
          value={meetingDate}
          onChange={setMeetingDate}
          style={{ width: '100%', marginTop: 10 }}
          disabledDate={(current) => current && current < moment().startOf('day')} // Prevent past dates
        />
        <TimePicker
          placeholder="Start Time"
          value={startTime}
          onChange={setStartTime}
          format="HH:mm" // Remove seconds
          style={{ width: '100%', marginTop: 10 }}
        />
        <TimePicker
          placeholder="End Time"
          value={endTime}
          onChange={setEndTime}
          format="HH:mm" // Remove seconds
          style={{ width: '100%', marginTop: 10 }}
        />
      </Spin>
    </Modal>
  );
};

export default ScheduleMeetingModal;
