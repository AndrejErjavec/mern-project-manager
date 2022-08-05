import UserTicket from './UserTicket';

const UserItem = ({user}) => {
  return (
    <div key={user.id} className="user-item">
      <UserTicket user={user}></UserTicket>
    </div>
  )
}

export default UserItem;