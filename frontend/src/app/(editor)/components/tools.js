import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import InlineCode from '@editorjs/inline-code'

const uploadImageByURL = (e) => {
  let link = new Promise(( resolve, reject ) => {
    try {
      resolve(e)
    }
    catch(err) {
      reject(err)
    }
  })

  return link.then(url => {
    return {
      success: 1,
      file: {url}
    }
  })
}

const uploadImageByFile = (e) => {
  return uploadImage(e).then(url => {
    if (url) {
      return {
        success: 1,
        file: { url }
      }
    }
  })
}

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: {
    class: Table,
    inlineToolbar: true
  },
  marker: Marker,
  list: {
    class: List,
    inlineToolbar: true
  },
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByURL,
        uploadByFile: uploadImageByFile,
      }
    }
  },
  header: {
    class: Header,
    inlineToolbar: true
  },
  quote: {
    class: Quote,
    inlineToolbar: true
  },
  checklist: CheckList,
  inlineCode: InlineCode,
}
