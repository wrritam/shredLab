import Embed from '@editorjs/embed'
import List from '@editorjs/list'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import InlineCode from '@editorjs/inline-code'

export const EDITOR_JS_TOOLS = {
  embed: Embed,
  marker: Marker,
  list: {
    class: List,
    inlineToolbar: true
  },
  code: Code,
  linkTool: LinkTool,
  header: {
    class: Header,
    inlineToolbar: true
  },
  quote: {
    class: Quote,
    inlineToolbar: true
  },
  checklist: {
    class: CheckList,
    inlineToolbar: true
  },
  inlineCode: {
    class: InlineCode,
    inlineToolbar: true
  },
}
