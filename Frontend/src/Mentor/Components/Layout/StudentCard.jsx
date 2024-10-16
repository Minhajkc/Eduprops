// components/StudentCard.js
import React, { useEffect, useState } from 'react';
import { Card, List, Avatar, Pagination } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { fetchStudentsByCourse } from '../../../Services/mentorService'; // Import the service function

const StudentCard = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(4); // Number of students per page
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const studentData = await fetchStudentsByCourse(); // Use the service function to fetch data
        setStudents(studentData);
        setTotalStudents(studentData.length);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <p>Loading students...</p>;
  }

  if (students.length === 0) {
    return <p>No students found for this course.</p>;
  }

  // Paginate students based on currentPage and pageSize
  const paginatedStudents = students.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
    <h1 className='text-2xl text-center font-bold pb-3 font-roboto'>Your Students </h1>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={paginatedStudents}
        renderItem={(student) => (
          <List.Item>
            <Card>
              <Card.Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={`Username: ${student.username}`}
                description={
                  <>
                    <a href={`mailto:${student.email}`}>{student.email}</a>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={totalStudents}
        onChange={handlePageChange}
        showSizeChanger={false} // Hide the page size changer, as we're using a fixed page size
        style={{ marginTop: '20px', textAlign: 'center' }}

      />
    </>
  );
};

export default StudentCard;
