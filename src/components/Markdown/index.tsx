import React, { memo, useMemo } from "react";
import MarkdownIt from "markdown-it";
import "github-markdown-css";
import "highlight.js/styles/github.css";
import hljs from "highlight.js";

const md = new MarkdownIt({
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          "</code></pre>"
        );
      } catch (__) {
        console.log("highlightError", __);
      }
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

// 中文转码
function b64_to_utf8(str: string) {
  return decodeURIComponent(escape(window.atob(str)));
}

export default memo(function MarkdownRender({ content, isBase64, style }: any) {
  const markdown = isBase64 ? b64_to_utf8(content) : content;

  const html = useMemo(() => md.render(markdown), [markdown]);

  return (
    <div className="markdown-body" style={style}>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
});
