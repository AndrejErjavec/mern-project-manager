import {useState, useContext, useEffect} from 'react';
import userService from '../features/userService';
import UserContext from '../context/store/UserStore';
import UserTicket from './UserTicket';
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
      {creator && <UserTicket user={creator}></UserTicket>}
      </div>
      <div className="comment-text">
        <p className="date">{dateCreated} {timeCreated}</p>
        <p>{comment.text}</p>
      </div>
    </div>}
    </>
  )
};


export default CommentItem;