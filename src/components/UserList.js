import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
import UserDetail from '../pages/UserDetail'; // 프롭스로 전달할 UserDetail
import SearchBar from './SearchBar';
import Pagination from './Pagenation';
import { fetchUsers } from '../services/UserService';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 유저 상태 추가
  const usersPerPage = 6;

  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('유저를 가져오는데 실패했습니다');
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = users.filter(user =>
      user.name.first.toLowerCase().includes(query.toLowerCase()) ||
      user.name.last.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSort = (order) => {
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      const nameA = `${a.name.first} ${a.name.last}`.toLowerCase();
      const nameB = `${b.name.first} ${b.name.last}`.toLowerCase();
      if (order === 'asc') return nameA > nameB ? 1 : -1;
      return nameA < nameB ? 1 : -1;
    });
    setFilteredUsers(sortedUsers);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUserClick = (user) => {
    setSelectedUser(user); // 유저 클릭 시 선택된 유저 상태 업데이트
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} onSort={handleSort} />
      {selectedUser ? (
        <UserDetail user={selectedUser} onBack={() => setSelectedUser(null)} />
      ) : (
        <>
          <div className="row">
            {currentUsers.map((user) => (
              <div className="col-md-4" key={user.login.uuid} onClick={() => handleUserClick(user)}>
                <UserCard user={user} />
              </div>
            ))}
          </div>
          <Pagination
            usersPerPage={usersPerPage}
            totalUsers={filteredUsers.length}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default UserList;
