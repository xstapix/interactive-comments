import './NewCommStyle.css'
import { useState } from 'react'

const NewComment = ({
  action, active, onAdd, addReply, closeReply, currentUserInfo
}) => {
  const [content, setContent] = useState()

  const handleSend = () => {
    if(onAdd) {
      if(content) {
        onAdd({
          id: Math.random(), 
          content: content, 
          createdAt: "just now", 
          score: 0, 
          user: {
            image: {
              png: currentUserInfo.image.png,
              webp: currentUserInfo.image.webp
            },
            username: currentUserInfo.username
          },
          replies: [
          ]
        })
      }
      setContent('')
    } else if(content) {
      addReply({
        id: Math.random(),
        content: content, 
        createdAt: "just now", 
        score: 0,
        replyingTo: active,  
        user: {
          image: {
            png: currentUserInfo.image.png,
            webp: currentUserInfo.image.webp
          },
          username: currentUserInfo.username
        },
      })
      setContent('')
      closeReply(false)
    }
  }

  return ( 
      <section className= {active ? 'new-comment_active': 'new-comment'}>
        <img src={currentUserInfo.image.png} alt="logo"/>
        <textarea 
          className='new-comment_boby' 
          placeholder='Add a comment...' 
          value={content}
          onChange={(event) => setContent(event.target.value)}/>
        <button className='comm_button' onClick={handleSend}>{action}</button>
      </section>
    
  )
}

export default NewComment