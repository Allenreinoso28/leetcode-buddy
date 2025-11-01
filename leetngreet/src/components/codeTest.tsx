"use client"

import * as React from "react"
import Editor from "react-simple-code-editor"
import { Highlight, themes } from "prism-react-renderer"

const theme = themes.nightOwl

export default function CodeEditorTest() {
  const [code, setCode] = React.useState("")

  const editorRef = React.useRef<HTMLDivElement>(null)

  //Auto-scroll tracking: keep caret visible
  React.useEffect(() => {
    const textarea = editorRef.current?.querySelector("textarea")
    if (!textarea) return

    const handleScroll = () => {
      const selectionStart = textarea.selectionStart
      const lines = code.slice(0, selectionStart).split("\n")
      const currentLine = lines.length - 1

      const pre = editorRef.current?.querySelector("pre")
      const lineEl = pre?.children[currentLine] as HTMLElement | undefined
      if (lineEl) lineEl.scrollIntoView({ block: "nearest" })
    }

    textarea.addEventListener("input", handleScroll)
    textarea.addEventListener("keyup", handleScroll)
    textarea.addEventListener("click", handleScroll)

    return () => {
      textarea.removeEventListener("input", handleScroll)
      textarea.removeEventListener("keyup", handleScroll)
      textarea.removeEventListener("click", handleScroll)
    }
  }, [code])

  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-zinc-950 p-8">
      <div
        ref={editorRef}
        className="w-full max-w-3xl relative border border-zinc-800 rounded-lg bg-zinc-950 shadow-lg overflow-auto"
        style={{
          minHeight: "44rem",  
          maxHeight: "44rem",
          fontFamily: '"Fira Code", monospace',
          fontSize: 14,
          lineHeight: "1.6em",
        }}
      >
        {/* Floating label */}
        <div className="absolute top-2 right-3 text-xs text-muted-foreground bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-700 z-10">
          JavaScript
        </div>

        <Editor
          textareaClassName="editor-textarea"
          value={code}
          onValueChange={setCode}
          highlight={(code) => (
            <Highlight code={code} language="javascript" theme={theme}>
              {({ tokens, getLineProps, getTokenProps }) => (
                <pre
                  className="m-0 p-0"
                  style={{
                    fontFamily: '"Fira Code", monospace',
                    fontSize: 14,
                    lineHeight: "1.6em",
                    tabSize: 2,
                    whiteSpace: "pre",
                  }}
                >
                  {tokens.map((line, i) => (
                    <div
                      key={i}
                      {...getLineProps({ line })}
                      className="flex leading-[1.6em]"
                    >
                      {/* Line numbers */}
                      <span className="select-none opacity-40 w-8 text-right pr-3">
                        {i + 1}
                      </span>
                      {/* Syntax highlighted code */}
                      <span className="flex-1 whitespace-pre-wrap">
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          )}
          padding={12}
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: 14,
            lineHeight: "1.6em",
            minHeight: "43.8rem",
            overflow: "visible",
            outline: "none",
            whiteSpace: "pre",
            caretColor: "#fff",
          }}
        />

        {/* Component-scoped styles */}
        <style jsx>{`
          :global(.editor-textarea) {
            padding-left: 43px !important;
            /* Add any other textarea-specific styles here */
            color: red; /* example: see the actual text */
          }
        `}</style>
      </div>
    </div>
  )
}