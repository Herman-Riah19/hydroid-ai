import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import { Terminal } from './components/terminal'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('bash', bash)

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="mt-4 text-[4vw] font-extrabold text-center bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="mt-6 text-[2vw] font-bold text-primary">{children}</h2>
    ),

    h3: ({ children }) => (
      <h3 className="mt-4 text-[1.3vw] font-semibold text-foreground">{children}</h3>
    ),

    p: ({ children }) => (
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{children}</p>
    ),

    ul: ({ children }) => <ul className="mt-4 list-disc pl-8">{children}</ul>,
    ol: ({ children }) => <ol className="mt-4 list-decimal pl-8">{children}</ol>,
    li: ({ children }) => <li className="mb-1">{children}</li>,

    hr: () => <hr className="my-6 border-border" />,

    img: (props) => (
      <Image
        sizes="100vw"
        width={100}
        height={100}
        className="rounded-lg shadow-sm"
        {...(props as ImageProps)}
      />
    ),

    // ✅ Inline code (not inside a pre)
    code: ({ className, children }: any) => {
      const isInline = !className
      if (isInline) {
        return (
          <code className="px-2 py-1 rounded bg-muted text-sm font-mono text-primary">
            {children}
          </code>
        )
      }
      return <>{children}</>
    },

    // ✅ Block code with color syntax highlighting
    pre: ({ children }: any) => {
      const child = children?.props || {}
      const className = child.className || ''
      const match = /language-(\w+)/.exec(className)
      const language = match ? match[1] : 'tsx'

      return (
        <div className="mt-6 overflow-hidden rounded-xl border border-border shadow-sm">
          <Terminal>
            <SyntaxHighlighter
              language={language}
              style={oneDark}
              PreTag="div"
              wrapLines={true}
              showLineNumbers={false}
              customStyle={{
                margin: 0,
                background: 'transparent',
                fontSize: '0.95rem',
                padding: '1rem',
              }}
              codeTagProps={{
                style: { background: 'transparent', fontFamily: 'var(--font-mono)' },
              }}
            >
              {String(child.children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          </Terminal>
        </div>
      )
    },

    ...components,
  }
}
