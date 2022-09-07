import './style.css'
import Comment from './components/Comment';
import NewComment from './components/NewComment';
import DB from './data.json'

import { useState } from 'react';

function App() {
  const [comments, setComments] = useState(DB.comments)
  const currentUser = DB.currentUser

  const addComm = obj => {
    const newList = [ 
      ...comments,
      obj
    ]
    setComments(newList)
  }

  const updateComm = obj => {
    comments.map(item => {
      if(item.id == obj.id) item.content = obj.content
    })
  }

  const addReply = (obj, replyInfo) => {
    const replyingName = replyInfo.shift()
    const replyingId = replyInfo.pop()
    obj.replyingTo = replyingName
    
    comments.map(item => {
      if(item.id == replyingId) {
        const newList = [
          ...item.replies,
          obj
        ]
        item.replies = newList
      }
    })
  }

  const onRemove = id => {
    const newlist = comments.filter(item => item.id != id)
    setComments(newlist)
  }
  
  return (
    <div className="App">
      <div className='all-comments'>
      {comments.map(item => (
        <Comment 
          info={item} 
          key={item.id} 
          onRemove={onRemove}  
          onUpdate={updateComm}
          addReply={addReply}
          currentUserInfo={currentUser}/>
      ))}
      </div>
      <div className='new'>
        <NewComment 
          action='SEND' 
          active={true} 
          onAdd={addComm} 
          currentUserInfo={currentUser}/>
      </div>
    </div>
  );
}

export default App;
