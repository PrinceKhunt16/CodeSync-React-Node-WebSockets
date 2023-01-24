import React, { useEffect, useState } from 'react'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/markdown/markdown'
import CodeMirror from '@uiw/react-codemirror'
import ACTIONS from '../actions'

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const [code, setCode] = useState()

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        setCode(code)
      })
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE)
    }
  }, [socketRef.current])

  return (
    <div className='codeEditorWrapper'>
      <CodeMirror
        value={code}
        options={{
          mode: 'js',
          theme: 'default'
        }}
        onChange={(instance, changes) => {
          const { origin } = changes
          const code = instance.getValue()
          
          if (origin !== 'setValue') {
            socketRef.current.emit(ACTIONS.CODE_CHANGE, {
              roomId,
              code
            })
          }

          onCodeChange(code)
        }}
      />
    </div>
  )
}

export default Editor