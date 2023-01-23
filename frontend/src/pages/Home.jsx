import React, { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [roomId, setRoomId] = useState('')
  const [username, setUsername] = useState('')

  const createNewRoom = (e) => {
    e.preventDefault()
    const id = uuidV4()
    setRoomId(id) 
  }

  const handleInputEnter = (e) => {
    if(e.code === 'Enter'){
      joinRoom()
    }
  }

  const joinRoom = () => {
    if(!roomId || !username){
      return
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username,
      }
    })
  }

  return (
    <> 
      <div className="homePageWrapper">
        <div className="formWrapper">
          <h2 className='logo'>Code Sync</h2>
          <h4 className="mainLabel">Paste invitation ROOM ID</h4>
          <div className="inputGroup">
            <input
              type="text"
              className="inputBox"
              placeholder="ROOM ID"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              className="inputBox"
              placeholder="USERNAME"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              onKeyUp={handleInputEnter}
            />
            <button className="btn joinBtn" 
              onClick={joinRoom}
            >
              Join
            </button>
            <span className="createInfo">
              If you don't have an invite then create&nbsp;
              <a onClick={createNewRoom} href="/#" className="createNewBtn">NEW ROOM</a>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home