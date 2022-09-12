import {useState} from 'react'

import NewComment from './NewComment'

const Reply = ({info, currentUserInfo, addReply, onRemoveReply, onUpdateReply}) => {
  const [likesReply, setLikesReply] = useState(info.score)
  const [replyTo, setReplyTo] = useState(false)
  const [deleteActive, setDeleteActive] = useState(false)
  const [edit, setEdit] = useState(false)
  const [updateContent, setUpdateContent] = useState()

  const handleReplyTo = (event) => {
    replyTo ? setReplyTo(false) : setReplyTo(event.target.id)
  }

  const handleEdit = () => {
    edit ? setEdit(false) : setEdit(true)
  }
  
  const handleDeleate = (event) => {
    setDeleteActive(event.target.id)
  }

  const handleUpdate = (event) => {
    if(updateContent) {
      let newContent = updateContent.split(' ')
      newContent.shift()
      onUpdateReply({
        id: event.target.id, 
        content: newContent.join(' ')
      })
      setUpdateContent('')
      setEdit(false)
    }
  }
  
  return (
    <div>
      <section > 
      {window.screen.width > 425 ? 
        <div className='likes'>
          <div onClick={() => setLikesReply(likesReply + 1)} className='likes_plus'>
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
          </div>
          <p className='likes_value'>{likesReply}</p>
          <div onClick={() => setLikesReply(likesReply - 1)} className='likes_plus'>
            <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
          </div>
        </div>: <></>}
        <div className='comment_boby'>
          <div className="user">
            <div className="user_info">
              <img className='user_logo' src={info.user.image.png} alt="logo" />
              <p className="user_name">{info.user.username}</p>
              {info.user.username === currentUserInfo.username ?
                <div className='you'>you</div> : <></>
              }
              <p className="time">{info.createdAt}</p>
            </div>
            {info.user.username === currentUserInfo.username ? 
              <div className='user_action'>
                <div className="delete" onClick={handleDeleate}>
                  <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                  <p id={info.id}>Delete</p>
                </div>
                <div className="reply" onClick={handleEdit}>
                  <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                  <p>Edit</p>
                </div>
              </div> : <div className="reply" onClick={handleReplyTo}>
                <svg id={info.user.username} width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                <p id={info.user.username}>Reply</p>
              </div>
            }
          </div>
          <div className="comment_text">
            {edit ? 
              <textarea
                className='new-comment_boby'
                defaultValue={'@' + info.replyingTo + ' ' + info.content}
                onChange={(event) => setUpdateContent(event.target.value)}/> 
              : 
              <>
                <span>@{info.replyingTo} </span>
                {info.content}
              </>
            }
          </div>
          {edit ? 
            <button
              id={info.id}
              className='comm_button update-comm'
              onClick={handleUpdate}>UPDATE</button> 
            :<></>
          }
        </div>
        {window.screen.width <= 425 ? 
        <div className='likes'>
          <div onClick={() => setLikesReply(likesReply + 1)} className='likes_plus'>
            <svg width="11" height="11" xmlns="http://www.w3.org/2000/svg"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
          </div>
          <p className='likes_value'>{likesReply}</p>
          <div onClick={() => setLikesReply(likesReply - 1)} className='likes_plus'>
            <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
          </div>
        </div>: <></>}
      </section>
      <NewComment 
        action={'REPLY'} 
        active={replyTo} 
        addReply={addReply}
        closeReply={
          close => {setReplyTo(close)}
        }
        currentUserInfo={currentUserInfo}
      />
      <div 
        className={deleteActive ? 'modal_delete' : 'modal_delete_none'} 
        onClick={() => setDeleteActive(false)}>
        <div className='delete_content' onClick={(event) => event.stopPropagation()}>
          <p>Delete comment</p>
          <span>Are you sure you want to delete this comment? This will remove the comment and can'tbe undone.</span>
          <div className='button_body'> 
            <button className='gray' onClick={() => setDeleteActive(false)}>NO, CANSEL</button>
            <button 
              className='red' 
              onClick={() => {
                onRemoveReply(deleteActive)
                setDeleteActive(false)}}>YES, DELETE</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reply