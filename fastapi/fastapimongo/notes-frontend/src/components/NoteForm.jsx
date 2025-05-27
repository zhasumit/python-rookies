import React, { useState, useEffect } from 'react';

const NoteForm = ({ note, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: note?.title || '',
        content: note?.content || '',
        tags: note?.tags?.join(', ') || '',
        priority: note?.priority || '',
        status: note?.status || 'todo'
    });
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState('split'); // 'edit', 'preview', 'split'
    const [prismLoaded, setPrismLoaded] = useState(false);

    // Load Prism.js for syntax highlighting
    useEffect(() => {
        const loadPrism = () => {
            // Remove any existing Prism elements first
            const existingLinks = document.querySelectorAll('link[href*="prism"]');
            const existingScripts = document.querySelectorAll('script[src*="prism"]');
            existingLinks.forEach(link => link.remove());
            existingScripts.forEach(script => script.remove());

            // Load Prism CSS
            const cssLink = document.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
            cssLink.onload = () => {
                // Load main Prism JS
                const mainScript = document.createElement('script');
                mainScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
                mainScript.onload = () => {
                    // Configure Prism
                    if (window.Prism) {
                        window.Prism.manual = true;
                    }

                    // Load autoloader for dynamic language loading
                    const autoloaderScript = document.createElement('script');
                    autoloaderScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js';
                    autoloaderScript.onload = () => {
                        if (window.Prism && window.Prism.plugins && window.Prism.plugins.autoloader) {
                            window.Prism.plugins.autoloader.languages_path = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/';
                        }
                        setPrismLoaded(true);
                    };
                    document.head.appendChild(autoloaderScript);
                };
                document.head.appendChild(mainScript);
            };
            document.head.appendChild(cssLink);
        };

        if (!window.Prism) {
            loadPrism();
        } else {
            setPrismLoaded(true);
        }
    }, []);

    // Trigger syntax highlighting when content changes
    useEffect(() => {
        if (prismLoaded && window.Prism) {
            const timer = setTimeout(() => {
                try {
                    window.Prism.highlightAll();
                } catch (error) {
                    console.warn('Prism highlighting failed:', error);
                }
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [formData.content, viewMode, prismLoaded]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submitData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            };

            await onSubmit(submitData);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onCancel();
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Enhanced markdown parser with syntax highlighting
    const parseMarkdown = (text) => {
        if (!text) return '';

        let html = text
            // Headers
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            // Bold and Italic
            .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Strikethrough
            .replace(/~~(.*?)~~/g, '<del>$1</del>')
            // Code blocks with syntax highlighting
            .replace(/```(\w+)?\n?([\s\S]*?)```/g, (match, lang, code) => {
                const language = lang || 'plaintext';
                const cleanCode = code.trim();
                const escapedCode = cleanCode
                    .replace(/&/g, '&amp;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#039;');

                return `<pre class="language-${language}"><code class="language-${language}">${escapedCode}</code></pre>`;
            })
            .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
            // Links
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
            // Images
            .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%; height: auto;" />')
            // Tables (basic support)
            .replace(/\|(.+)\|/g, (match, content) => {
                const cells = content.split('|').map(cell => cell.trim());
                return '<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
            })
            // Unordered lists
            .replace(/^\* (.+)$/gm, '<li class="list-item">$1</li>')
            .replace(/^- (.+)$/gm, '<li class="list-item">$1</li>')
            .replace(/^\+ (.+)$/gm, '<li class="list-item">$1</li>')
            // Ordered lists
            .replace(/^\d+\. (.+)$/gm, '<li class="list-item">$1</li>')
            // Blockquotes
            .replace(/^> (.+)$/gm, '<blockquote class="blockquote">$1</blockquote>')
            // Horizontal rules
            .replace(/^---$/gm, '<hr class="divider">')
            .replace(/^\*\*\*$/gm, '<hr class="divider">')
            // Task lists
            .replace(/^- \[ \] (.+)$/gm, '<li class="task-item"><input type="checkbox" disabled> $1</li>')
            .replace(/^- \[x\] (.+)$/gm, '<li class="task-item"><input type="checkbox" disabled checked> $1</li>');

        // Handle line breaks: replace two or more newlines with <br>
        html = html.replace(/\n{2,}/g, '<br>');

        // Wrap consecutive list items in ul tags
        html = html.replace(/(<li class="list-item">.*<\/li>)/g, (match) => {
            return '<ul class="list">' + match.replace(/<br>/g, '') + '</ul>';
        });

        // Wrap task items
        html = html.replace(/(<li class="task-item">.*<\/li>)/g, (match) => {
            return '<ul class="task-list">' + match.replace(/<br>/g, '') + '</ul>';
        });

        // Clean up multiple consecutive ul tags
        html = html.replace(/<\/ul><br><ul class="list">/g, '');
        html = html.replace(/<\/ul><br><ul class="task-list">/g, '');

        return html;
    };


    const inputStyle = {
        width: '100%',
        padding: '0.2rem',
        border: 'none',
        borderBottom: '1px solid #ddd',
        borderRadius: '0',
        outline: 'none',
        boxShadow: 'none',
        fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: "1em"
    };

    const textareaStyle = {
        width: '100%',
        resize: 'none',
        fontFamily: 'Geist, ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
        fontSize: '14px',
        lineHeight: '1.6',
        height: '62vh',
        border: '1px solid #e1e4e8',
        borderRadius: '6px',
        outline: 'none',
        backgroundColor: '#fafbfc',
        padding: '1rem'
    };

    const previewStyle = {
        padding: '1rem',
        height: '62vh',
        overflow: 'auto',
        backgroundColor: '#ffffff',
        border: '1px solid #e1e4e8',
        borderRadius: '6px',
        fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#24292f'
    };

    const buttonStyle = {
        padding: '0.5rem 1rem',
        border: '1px solid #d0d7de',
        borderRadius: '6px',
        backgroundColor: '#f6f8fa',
        color: '#24292f',
        cursor: 'pointer',
        fontSize: '14px',
        fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontWeight: '500',
        transition: 'all 0.2s ease'
    };

    const activeButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#D97757',
        color: '#ffffff',
        borderColor: '#D97757'
    };

    const previewStyles = `
    .markdown-preview h1 {
        font-size: 2em;
        font-weight: 600;
        padding-bottom: 0.3em;
        margin-top: 0;
        margin-bottom: 8px;
        border-bottom: 1px solid #eaecef;
        color: #24292f;
    }

    .markdown-preview h2 {
        font-size: 1.5em;
        font-weight: 600;
        padding-bottom: 0.3em;
        margin-top: 20px;
        margin-bottom: 8px;
        border-bottom: 1px solid #eaecef;
        color: #24292f;
    }

    .markdown-preview h3 {
        font-size: 1.25em;
        font-weight: 600;
        margin-top: 16px;
        margin-bottom: 6px;
        color: #24292f;
    }

    .markdown-preview h4,
    .markdown-preview h5,
    .markdown-preview h6 {
        font-size: 1em;
        font-weight: 600;
        margin-top: 16px;
        margin-bottom: 6px;
        color: #24292f;
    }

    .markdown-preview p {
        margin-top: 0;
        margin-bottom: 16px;
    }

    .markdown-preview .inline-code {
        padding: 0.2em 0.4em;
        margin: 0;
        font-size: 85%;
        background-color: rgba(175, 184, 193, 0.2);
        border-radius: 6px;
        font-family: 'Geist Mono', ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
    }

    .markdown-preview pre[class*="language-"] {
        background: #f6f8fa !important; /* Light background for code blocks */
        border: 1px solid #d0d7de;
        border-radius: 6px;
        margin: 16px 0;
        overflow-x: auto;
        position: relative;
    }

    .markdown-preview code[class*="language-"] {
        background: transparent !important;
        color: #24292f; /* Dark text for better contrast on light background */
        font-family: 'Geist Mono', ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
        font-size: 14px;
        line-height: 1.5;
        padding: 16px;
        display: block;
        white-space: pre;
    }

    .markdown-preview pre:not([class*="language-"]) {
        background: #f6f8fa;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        padding: 16px;
        overflow-x: auto;
        margin: 16px 0;
    }

    .markdown-preview pre:not([class*="language-"]) code {
        background: transparent;
        padding: 0;
        color: #24292f;
    }

    .markdown-preview .blockquote {
        padding: 0 1em;
        color: #656d76;
        border-left: 0.25em solid #d0d7de;
        margin: 0 0 16px 0;
    }

    .markdown-preview .list {
        padding-left: 2em;
        margin-top: 0;
        margin-bottom: 16px;
    }

    .markdown-preview .task-list {
        list-style: none;
        padding-left: 1.5em;
        margin-top: 0;
        margin-bottom: 16px;
    }

    .markdown-preview .list-item {
        margin-bottom: 0.25em;
    }

    .markdown-preview .task-item {
        margin-bottom: 0.25em;
    }

    .markdown-preview .task-item input[type="checkbox"] {
        margin-right: 0.5em;
        margin-left: -1.5em;
    }

    .markdown-preview .divider {
        height: 0.25em;
        padding: 0;
        margin: 24px 0;
        background-color: #e1e4e8;
        border: 0;
    }

    .markdown-preview a {
        color: #0969da;
        text-decoration: none;
    }

    .markdown-preview a:hover {
        text-decoration: underline;
    }

    .markdown-preview strong {
        font-weight: 600;
    }

    .markdown-preview em {
        font-style: italic;
    }

    .markdown-preview del {
        text-decoration: line-through;
        color: #656d76;
    }

    .markdown-preview img {
        max-width: 100%;
        height: auto;
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .markdown-preview table {
        border-spacing: 0;
        border-collapse: collapse;
        margin-top: 0;
        margin-bottom: 16px;
        display: block;
        width: max-content;
        max-width: 100%;
        overflow: auto;
    }

    .markdown-preview table tr {
        background-color: #ffffff;
        border-top: 1px solid #c6cbd1;
    }

    .markdown-preview table tr:nth-child(2n) {
        background-color: #f6f8fa;
    }

    .markdown-preview table td,
    .markdown-preview table th {
        padding: 6px 13px;
        border: 1px solid #d0d7de;
    }

    .markdown-preview table th {
        font-weight: 600;
        background-color: #f6f8fa;
    }

    /* Syntax highlighting customizations */
    .markdown-preview .token.comment,
    .markdown-preview .token.prolog,
    .markdown-preview .token.doctype,
    .markdown-preview .token.cdata {
        color: #999988;
        font-style: italic;
    }

    .markdown-preview .token.namespace {
        opacity: .7;
    }

    .markdown-preview .token.string,
    .markdown-preview .token.attr-value {
        color: #e3116c;
    }

    .markdown-preview .token.punctuation,
    .markdown-preview .token.operator {
        color: #393A34;
    }

    .markdown-preview .token.entity,
    .markdown-preview .token.url,
    .markdown-preview .language-css .token.string,
    .markdown-preview .style .token.string,
    .markdown-preview .token.variable {
        color: #24292f; /* Dark text for better contrast on light background */
    }

    .markdown-preview .token.keyword,
    .markdown-preview .token.control,
    .markdown-preview .token.directive,
    .markdown-preview .token.unit {
        color: #00a4db;
    }

    .markdown-preview .token.statement,
    .markdown-preview .token.regex,
    .markdown-preview .token.atrule {
        color: #00a4db;
    }

    .markdown-preview .token.placeholder,
    .markdown-preview .token.variable {
        color: #3d8fd1;
    }

    .markdown-preview .token.deleted {
        text-decoration: line-through;
    }

    .markdown-preview .token.inserted {
        border-bottom: 1px dotted #f9ca24;
        text-decoration: none;
    }

    .markdown-preview .token.italic {
        font-style: italic;
    }

    .markdown-preview .token.important,
    .markdown-preview .token.bold {
        font-weight: bold;
    }

    .markdown-preview .token.important {
        color: #e90;
    }

    .markdown-preview .token.entity {
        cursor: help;
    }

    /* Loading indicator for syntax highlighting */
    .syntax-loading {
        background-color: #f6f8fa;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        padding: 16px;
        margin-bottom: 16px;
        color: #656d76;
        font-style: italic;
    }
`;


    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: previewStyles }} />
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: '0',
                    width: '100vw',
                    height: '100vh',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    overflow: 'auto',
                    boxSizing: 'border-box',
                    borderBottom: '1px solid #ddd',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{
                                display: 'block',
                                marginBottom: '0.5rem',
                                fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                fontWeight: '500',
                                color: "#999"
                            }}>Title:</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ marginBottom: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.5rem'
                            }}>
                                <label style={{
                                    fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    fontWeight: '500',
                                    color: "#999"
                                }}>Content:</label>

                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    {!prismLoaded && (
                                        <span style={{
                                            fontSize: '12px',
                                            color: '#656d76',
                                            fontStyle: 'italic'
                                        }}>
                                            Loading syntax highlighting...
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('edit')}
                                        style={viewMode === 'edit' ? activeButtonStyle : buttonStyle}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('split')}
                                        style={viewMode === 'split' ? activeButtonStyle : buttonStyle}
                                    >
                                        Split
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('preview')}
                                        style={viewMode === 'preview' ? activeButtonStyle : buttonStyle}
                                    >
                                        Preview
                                    </button>
                                </div>
                            </div>

                            <div style={{ flex: 1, display: 'flex', gap: '1rem' }}>
                                {/* Editor Panel */}
                                {(viewMode === 'edit' || viewMode === 'split') && (
                                    <div style={{
                                        flex: viewMode === 'split' ? 1 : 2,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <textarea
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            required
                                            placeholder="# Markdown Content

Start typing your markdown content here...

## Features supported:
- **Bold text** and *italic text*
- ~~Strikethrough text~~
- `Inline code` and code blocks
- [Links](https://example.com)
- ![Images](url)
- Lists and task lists
- > Blockquotes
- Headers (H1, H2, H3)
- Tables
- Horizontal rules

```javascript
// Code blocks with syntax highlighting
const example = 'Hello World';
console.log(example);

function greet(name) {
    return `Hello, ${name}!`;
}
```

```python
# Python example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

```css
/* CSS example */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}
```

### Task Lists
- [ ] Todo item
- [x] Completed item

### Tables
| Language | Extension | Highlighted |
|----------|-----------|-------------|
| JavaScript | .js | ✅ |
| Python | .py | ✅ |
| CSS | .css | ✅ |"
                                            style={textareaStyle}
                                        />
                                    </div>
                                )}

                                {/* Preview Panel */}
                                {(viewMode === 'preview' || viewMode === 'split') && (
                                    <div style={{
                                        flex: viewMode === 'split' ? 1 : 2,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <div
                                            style={previewStyle}
                                            className="markdown-preview"
                                        >
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: parseMarkdown(formData.content) || '<p style="color: #8b949e; font-style: italic;">Start typing to see preview...</p>'
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '1rem',
                            marginBottom: '.5rem'
                        }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    fontWeight: '500',
                                    color: "#999"
                                }}>Tags (comma separated):</label>
                                <input
                                    type="text"
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="work, personal, important"
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    fontWeight: '500',
                                    color: "#999"
                                }}>Priority:</label>
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    style={inputStyle}
                                >
                                    <option value="">Select Priority</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    fontWeight: '500',
                                    color: "#999"
                                }}>Status:</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                    style={inputStyle}
                                >
                                    <option value="todo">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="In Review">In Review</option>
                                    <option value="Done">Done</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem' }}>
                            <button
                                type="button"
                                onClick={onCancel}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#f6f8fa',
                                    color: '#24292f',
                                    border: '1px solid #d0d7de',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#f3f4f6';
                                    e.target.style.borderColor = '#c6cbd1';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = '#f6f8fa';
                                    e.target.style.borderColor = '#d0d7de';
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                disabled={loading}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    backgroundColor: '#2da44e',
                                    color: '#ffffff',
                                    border: '1px solid #2da44e',
                                    borderRadius: '6px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    outline: 'none',
                                    fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                                    fontWeight: '500',
                                    fontSize: '14px',
                                    opacity: loading ? 0.6 : 1,
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                    if (!loading) {
                                        e.target.style.backgroundColor = '#2c974b';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (!loading) {
                                        e.target.style.backgroundColor = '#2da44e';
                                    }
                                }}
                            >
                                {loading ? 'Saving...' : (note ? 'Update' : 'Create')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NoteForm;