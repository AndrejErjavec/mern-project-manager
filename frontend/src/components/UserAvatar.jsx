import '../css/UserAvatar.css';

const UserAvatar = ({user}) => {

  const firstLetter = user.first_name.substr(0, 1).toUpperCase();
  const secondLetter = user.last_name.substr(0, 1).toUpperCase();

  return (
    <div className="user-avatar">
      <p>
        {firstLetter}{secondLetter}
      </p>
    </div>
  )
}

export default UserAvatar;