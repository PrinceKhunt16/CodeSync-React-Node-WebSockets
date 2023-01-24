import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import Avatar from 'react-avatar'
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom'
import ACTIONS from '../actions'
import Editor from '../components/Editor'
import { initSocket } from '../socket'

const EditorPage = () => {
  const socketRef = useRef(null)
  const codeRef = useRef(null)
  const location = useLocation()
  const { roomId } = useParams()
  const [clients, setClients] = useState([])
  const reactNavigator = useNavigate()

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket()
      socketRef.current.on('connect_error', (err) => handleErrors(err))
      socketRef.current.on('connect_failed', (err) => handleErrors(err))

      function handleErrors(e) {
        reactNavigator('/')
      }

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username
      })

      socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          console.log(`${username} joined`)
        }
 
        setClients(clients)
        
        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current || '',
          socketId,
        })
      })

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ username, socketId }) => {
        console.log(`${username} leave the room`)

        setClients((prev) => {
          return prev.filter(client => client.socketId !== socketId)
        })
      })
    }

    init()

    return () => {
      socketRef.current.disconnect()
      socketRef.current.off(ACTIONS.JOINED)
      socketRef.current.off(ACTIONS.DISCONNECTED)
    }
  }, [])

  async function copyRoomId() {
    try {
      await navigator.clipboard.writeText(roomId)
    } catch (e) {
      console.error(e)
    }
  }

  function leaveRoom() {
    reactNavigator('/')
  }

  if (!location.state) {
    return <Navigate to='/' />
  }

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
        <button className='btn copyBtn' onClick={copyRoomId}>COPY ROOM ID</button>
        <button className='btn leaveBtn' onClick={leaveRoom}>LEAVE</button>
      </div>
      <div className='editorWrap'>
        <Editor 
          socketRef={socketRef} 
          roomId={roomId} 
          onCodeChange={(code) => {
            codeRef.current = code
          }}
        />
      </div>
    </div>
  )
}

export default EditorPage