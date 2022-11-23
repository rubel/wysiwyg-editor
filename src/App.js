import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './index.css';
const App = () => {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        Wysiwyg - Rich Text Editor
      </header>
      <div style={{float:"left", width:"50%"}}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      </div>
      
      <div style={{float:"right", width:"49%", minHeight:"422px", border:"1px solid black"}}>
        <div style={{backgroundColor:"#ddd",width:"100%"}}><h2>Your input here</h2></div>
        <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
      </div>
    </div>
  )
}
export default App;