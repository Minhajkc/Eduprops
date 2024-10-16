import React from 'react';
import { Table, Button, Modal, Spin, Tooltip } from 'antd';
import { deleteMeeting } from '../../../Services/mentorService';

const { confirm } = Modal;

const ScheduledMeetings = ({ scheduledMeets, loading, courseId, onEdit, handleDeleteSuccess }) => {

  const handleDelete = (meetingId) => {
    confirm({
      title: 'Are you sure you want to delete this meeting?',
      onOk: async () => {
        try {
          await deleteMeeting(courseId, meetingId);
          handleDeleteSuccess(); // Reload meetings after successful deletion
        } catch (error) {
          console.error('Error deleting meeting:', error);
        }
      },
      onCancel() {
        console.log('Deletion cancelled');
      },
    });
  };

  const columns = [
    {
      title: 'Meeting Name',
      dataIndex: 'name',
      render: (text, record) => (
        <Tooltip title={record.link} placement="top">
          <a href={record.link} target="_blank" rel="noopener noreferrer">{text}</a>
        </Tooltip>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'startTime',
      render: (text, record) => `${text} - ${record.endTime}`,
    },
    {
      title: 'Edit',
      render: (text, record) => (
        <>
          <Button onClick={() =>  onEdit(record)} >Edit</Button>
        </>
      ),
    },
    {
        title:'Delete',
        render: (text, record) => (
            <>
   
            <Button onClick={() => handleDelete(record._id)} danger style={{ marginLeft: '8px' }}>Delete</Button>
            </>
        )
    }
  ];

  return (
    <Spin spinning={loading}>
      <Table
        dataSource={scheduledMeets}
        columns={columns}
        rowKey="_id" // Use the unique identifier of the meeting
        pagination={{
          pageSize: 3, // Set the number of items per page
        }}
      />
    </Spin>
  );
};

export default ScheduledMeetings;
