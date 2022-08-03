import {useState, useContext, useEffect} from 'react';
import userService from '../features/userService';
import UserContext from '../context/store/UserStore';
import UserAvatar from './UserAvatar';
import '../css/CommentItem.css';

const CommentItem = ({comment}) => {
  const {user} = useContext(UserContext);
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    userService.getUserById(comment.user_id)
    .then((user) => {
      setCreator(user)
    }) 
    .catch((err) => {
      console.log(err)
    })
  }, [comment]);

  const dateCreated = new Date(comment.timestamp).toLocaleDateString('sl-SI');
  const timeCreated = new Date(comment.timestamp).toLocaleTimeString('sl-SI').slice(0, 5);

  return (
    <>
    {creator && <div className={`comment-item ${user.id === creator.id ? "comment-me" : "comment-other"}`}>
      <div className="comment-header">   
      {creator && <p>{creator.first_name} {creator.last_name}</p>}
      {creator && <UserAvatar user={creator}></UserAvatar>}
      </div>
      <div className="comment-text">
        <p>{dateCreated} {timeCreated}</p>
        <p>{comment.text}</p>
      </div>
    </div>}
    </>
  )
};


export default CommentItem;