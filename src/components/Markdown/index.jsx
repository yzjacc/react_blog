import React, { memo, useMemo } from 'react'
import MarkdownIt from 'markdown-it'
import 'github-markdown-css'
var hljs = require('highlight.js')

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight :  function (str, lang) {
  if (lang && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str, true).value;
    } catch (__) {}
  }

  return ''; // 使用额外的默认转义
}
})

// 中文转码
function b64_to_utf8 (str) {
  return decodeURIComponent(escape(window.atob(str)))
}

export default memo(function MarkdownRender ({ content, isBase64 }) {
  const markdown = isBase64 ? b64_to_utf8(content) : content

  const html = useMemo(() => md.render(markdown), [markdown])

  return (
    <div className="markdown-body">
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  )
})
