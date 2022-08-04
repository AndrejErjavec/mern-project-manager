import UserAvatar from './UserAvatar';
import '../css/UserTicket.css';

const UserTicket = ({user}) => {
  // console.log(user);
  return (
    <div className="user-ticket">
      <UserAvatar user={user}></UserAvatar>
      <p className="ticket-text">{user.first_name} {user.last_name}</p>
    </div>
  )
}

export default UserTicket;