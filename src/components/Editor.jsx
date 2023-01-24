import React from 'react'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/markdown/markdown'
import CodeMirror from '@uiw/react-codemirror'

const Editor = () => {
  return (
    <div className='codeEditorWrapper'>
      <CodeMirror
        options={{
          mode: 'jsx',
          theme: 'default'
        }}
      />
    </div>
  )
}

export default Editor