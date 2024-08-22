import React from 'react';

const UserDetail = ({ user, onBack }) => {
  return (
    <div className="container">
      <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
      <h1>{user.name.first} {user.name.last}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <button onClick={onBack} className="btn btn-primary mb-3">뒤로가기</button>
    </div>
  );
};

export default UserDetail;

