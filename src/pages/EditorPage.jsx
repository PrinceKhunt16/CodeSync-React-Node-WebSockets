import React from 'react'
import { useState } from 'react'
import Avatar from 'react-avatar'
import Editor from '../components/Editor'

const EditorPage = () => {
  const [clients, setClients] = useState([
    {socketId: 1, username: 'John Doe'},
    {socketId: 2, username: 'Karl Den'},
  ])

  return (
    <div className='mainWrap'>
      <div className='aside'>
        <div className='asideInner'>
          <h2 className='logoInEditor'>Code Sync</h2> 
          <div className='clientsList'>
            {
              clients.map((client) => {
                return (
                  <div key={client.socketId} className='client'>
                    <Avatar name={client.username} size={45} round='50%' className='icons' />
                    <span>{client.username}</span>
                  </div>
                )
              })
            }
          </div>
        </div>
        <button className='btn copyBtn'>COPY ROOM ID</button>
        <button className='btn leaveBtn'>LEAVE</button>
      </div>
      <div className='editorWrap'>
        <Editor />
      </div>
    </div>
  )
}

export default EditorPage