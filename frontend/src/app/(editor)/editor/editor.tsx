"use client"

import React, { useEffect, useState } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { EDITOR_JS_TOOLS } from '../components/tools';
import "../styles/editorStyles.css"

const Editor = () => {
   const [editorData, setEditorData] = useState<OutputData | undefined>(() => {
      const storedData = localStorage.getItem('blogContent');
      return storedData ? JSON.parse(storedData) : null;
    });
   useEffect(() => {
      let editorInstance: EditorJS | null = null;
      if (!editorInstance) {
        editorInstance = new EditorJS({
          holder: "textEditor",
          data: editorData,
          placeholder: "Start shredding bro...",
          tools: EDITOR_JS_TOOLS,
          onChange: (api) => {
            api.saver.save().then((outputData: OutputData) => {
              setEditorData(outputData);
              localStorage.setItem('blogContent', JSON.stringify(outputData));
            });
          }
        });
      }
    }, []);
  return (
   <div id='textEditor' className="editorJs w-full"></div>
  )
}

export default Editor
