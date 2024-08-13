import React, { useState, useEffect } from 'react';
import { AuthStudent, blockStudentById, unblockStudentById } from '../../Services/adminService'; 
import { showToastError, showToastSuccess } from '../../utils/toastify';
import Sidebar from '../Components/Layout/Sidebar';
import { Table, Input, Pagination } from 'antd';

const { Search } = Input;

const StudentAuth = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await AuthStudent();
        setStudents(data);
        setFilteredStudents(data);
      } catch (err) {
        setError(err.message);
        showToastError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleBlockToggle = async (studentId, currentStatus) => {
    try {
      if (currentStatus) {
        await unblockStudentById(studentId);
        showToastSuccess('Student unblocked successfully');
      } else {
        await blockStudentById(studentId);
        showToastSuccess('Student blocked successfully');
      }
      setStudents(prevStudents =>
        prevStudents.map(student =>
          student._id === studentId ? { ...student, blocked: !currentStatus } : student
        )
      );
      // Filter students after updating
      setFilteredStudents(prevStudents =>
        prevStudents.map(student =>
          student._id === studentId ? { ...student, blocked: !currentStatus } : student
        )
      );
    } catch (err) {
      showToastError('Failed to update student status');
    }
  };

  const handleSearch = (value) => {
    const filtered = students.filter(student =>
      student.username.toLowerCase().includes(value.toLowerCase()) ||
      student.email.toLowerCase().includes(value.toLowerCase()) ||
      student.firstName.toLowerCase().includes(value.toLowerCase()) ||
      student.lastName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to the first page on search
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Student Management</h2>
        <Search
          placeholder="Search students..."
          onSearch={handleSearch}
          style={{ marginBottom: '20px', maxWidth: '300px' }}
        />
        {filteredStudents.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <Table
                dataSource={filteredStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                pagination={false}
                rowKey="_id"
                columns={[
                  {
                    title: 'Username',
                    dataIndex: 'username',
                    key: 'username',
                  },
                  {
                    title: 'Email',
                    dataIndex: 'email',
                    key: 'email',
                  },
                  {
                    title: 'First Name',
                    dataIndex: 'firstName',
                    key: 'firstName',
                  },
                  {
                    title: 'Last Name',
                    dataIndex: 'lastName',
                    key: 'lastName',
                  },
                  {
                    title: 'Membership',
                    dataIndex: 'membershipType',
                    key: 'membershipType',
                  },
                  {
                    title: 'Last Login',
                    dataIndex: 'lastLogin',
                    key: 'lastLogin',
                    render: (text) => new Date(text).toLocaleDateString(),
                  },
                  {
                    title: 'Blocked',
                    dataIndex: 'blocked',
                    key: 'blocked',
                    render: (text) => (text ? 'Yes' : 'No'),
                  },
                  {
                    title: 'Action',
                    key: 'action',
                    render: (_, student) => (
                      <button
                        onClick={() => handleBlockToggle(student._id, student.blocked)}
                        className={`px-2 py-2 rounded-md text-white ${
                          student.blocked ? 'bg-custom-cyan hover:bg-custom-cyan2' : 'bg-red-400 hover:bg-red-600'
                        }`}
                      >
                        {student.blocked ? 'Unblock' : 'Block'}
                      </button>
                    ),
                  },
                ]}
              />
            </div>
            <div className="mt-4 flex justify-end">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredStudents.length}
                onChange={handlePageChange}
                showSizeChanger
              />
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">No students found.</p>
        )}
      </div>
    </div>
  );
};

export default StudentAuth;
