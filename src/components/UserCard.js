import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  console.log(user); // user 객체가 제대로 전달되고 있는지 확인
  return (
    <div className="card">
      <img src={user.picture.large} className="card-img-top" alt={`${user.name.first} ${user.name.last}`} />
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/user/${user.login.uuid}`} className="text-decoration-none">
            {user.name.first} {user.name.last}
          </Link>
        </h5>
        <p className="card-text">Email: {user.email}</p>
        <p className="card-text">Phone: {user.phone}</p>
      </div>
    </div>
  );
};

export default UserCard;
