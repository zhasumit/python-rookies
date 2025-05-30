// NoteCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const buttonStyles = {
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '1.5em',
    fontWeight: 400,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: '1px solid transparent',
    textDecoration: 'none',
    display: 'inline-block',
};

const primaryButtonStyles = {
    ...buttonStyles,
    background: 'rgb(215, 222, 238)',
    color: 'black',
    boxShadow: '0 4px 0 #a0a7bd',
    transform: 'translateY(0)',
    padding: '0.25rem 0.5rem',
    fontSize: '0.8rem',
};

const secondaryButtonStyles = {
    ...buttonStyles,
    background: '#d97757',
    color: 'white',
    boxShadow: '0 4px 0 #a05d4d',
    transform: 'translateY(0)',
    padding: '0.25rem 0.5rem',
    fontSize: '0.8rem',
};

const NoteCard = ({ note, onDelete }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/notes/${note.note_id}`);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        navigate(`/notes/${note.note_id}/edit`);
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleDateString();
    };

    const getStatusColor = (status) => {
        const colors = {
            'todo': '#fefefe',
            'In Progress': '#f0f7ff',
            'In Review': '#fffdf0',
            'Done': '#f0fff0',
            'Archived': '#fafafa'
        };
        return colors[status] || '#fefefe';
    };

    const getRandomLightColor = (tag) => {
        let hash = 0;
        for (let i = 0; i < tag.length; i++) {
            const char = tag.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

        const colors = [
            '#FFFAFA',
            '#F0F8FF',
            '#F5FFFA',
            '#FFF5F0',
            '#F8F0FF',
            '#FAFFFF',
            '#FFFFF0',
            '#FFFAF8',
            '#F8FAFF',
            '#F0FFFF',
            '#FFF0F5',
            '#F0F5FF',
            '#F5FFF0',
            '#FFF0FA',
            '#F0FFF5'
        ];

        return colors[Math.abs(hash) % colors.length];
    };

    const markdownComponents = {
        h1: ({ children }) => (
            <h1 style={{
                fontSize: '1.1em',
                fontWeight: '600',
                marginTop: '0.8em',
                marginBottom: '0.2em',
                paddingBottom: '0.2em',
                borderBottom: '1px solid #d1d9e0',
                color: '#24292f',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
                {children}
            </h1>
        ),
        h2: ({ children }) => (
            <h2 style={{
                fontSize: '1em',
                fontWeight: '600',
                marginTop: '0.8em',
                marginBottom: '0.2em',
                paddingBottom: '0.2em',
                borderBottom: '1px solid #d1d9e0',
                color: '#24292f',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
                {children}
            </h2>
        ),
        h3: ({ children }) => (
            <h3 style={{
                fontSize: '0.9em',
                fontWeight: '600',
                marginTop: '0.8em',
                marginBottom: '0.2em',
                color: '#24292f',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
                {children}
            </h3>
        ),
        h4: ({ children }) => (
            <h4 style={{
                fontSize: '0.8em',
                fontWeight: '600',
                marginTop: '0.8em',
                marginBottom: '0.2em',
                color: '#24292f',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
                {children}
            </h4>
        ),
        h5: ({ children }) => (
            <h5 style={{
                fontSize: '0.75em',
                fontWeight: '600',
                marginTop: '0.8em',
                marginBottom: '0.2em',
                color: '#24292f',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
                {children}
            </h5>
        ),
        h6: ({ children }) => (
            <h6 style={{
                fontSize: '0.7em',
                fontWeight: '600',
                marginTop: '0.8em',
                marginBottom: '0.2em',
                color: '#656d76',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
                {children}
            </h6>
        ),
        p: ({ children }) => (
            <p style={{
                marginTop: '0',
                marginBottom: '12px',
                color: '#24292f',
                lineHeight: '1.5',
                fontSize: '0.8em',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }}>
                {children}
            </p>
        ),
        code: ({ inline, children }) => (
            <code style={{
                backgroundColor: inline ? 'rgba(175, 184, 193, 0.2)' : 'transparent',
                padding: inline ? '0.1em 0.3em' : '0',
                borderRadius: inline ? '4px' : '0',
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                fontSize: '75%',
                color: '#24292f'
            }}>
                {children}
            </code>
        ),
        pre: ({ children }) => (
            <pre style={{
                backgroundColor: '#f6f8fa',
                padding: '12px',
                borderRadius: '4px',
                overflow: 'auto',
                marginTop: '0',
                marginBottom: '12px',
                fontSize: '75%',
                lineHeight: '1.4',
                border: '1px solid #d1d9e0'
            }}>
                {children}
            </pre>
        ),
        blockquote: ({ children }) => (
            <blockquote style={{
                borderLeft: '0.2em solid #d1d9e0',
                paddingLeft: '0.8em',
                marginTop: '0',
                marginBottom: '12px',
                color: '#656d76',
                paddingRight: '0',
                fontSize: '0.8em'
            }}>
                {children}
            </blockquote>
        ),
        ul: ({ children }) => (
            <ul style={{
                paddingLeft: '1.5em',
                marginTop: '0',
                marginBottom: '12px',
                fontSize: '0.8em'
            }}>
                {children}
            </ul>
        ),
        ol: ({ children }) => (
            <ol style={{
                paddingLeft: '1.5em',
                marginTop: '0',
                marginBottom: '12px',
                fontSize: '0.8em'
            }}>
                {children}
            </ol>
        ),
        li: ({ children }) => (
            <li style={{
                marginBottom: '0.2em',
                marginTop: '0.2em'
            }}>
                {children}
            </li>
        ),
        hr: () => (
            <hr style={{
                border: 'none',
                height: '0.2em',
                backgroundColor: '#d1d9e0',
                margin: '16px 0'
            }} />
        ),
        a: ({ href, children }) => (
            <a href={href} style={{
                color: '#0969da',
                textDecoration: 'none',
                fontSize: '0.8em'
            }}>
                {children}
            </a>
        ),
        strong: ({ children }) => (
            <strong style={{
                fontWeight: '600'
            }}>
                {children}
            </strong>
        ),
        table: ({ children }) => (
            <table style={{
                borderCollapse: 'collapse',
                marginTop: '0',
                marginBottom: '12px',
                fontSize: '0.75em'
            }}>
                {children}
            </table>
        ),
        th: ({ children }) => (
            <th style={{
                padding: '4px 8px',
                border: '1px solid #d1d9e0',
                fontWeight: '600',
                backgroundColor: '#f6f8fa'
            }}>
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td style={{
                padding: '4px 8px',
                border: '1px solid #d1d9e0'
            }}>
                {children}
            </td>
        )
    };

    return (
        <div
            onClick={handleClick}
            style={{
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '1.2rem',
                backgroundColor: getStatusColor(note.status),
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                height: 'fit-content',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ margin: '0', color: '#333', fontSize: '1.1rem', fontWeight: '600' }}>{note.title}</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                    <button
                        onClick={handleEdit}
                        style={primaryButtonStyles}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 5px 0 #a0a7bd';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 3px 0 #a0a7bd';
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = 'translateY(2px)';
                            e.currentTarget.style.boxShadow = '0 1.5px 0 #a0a7bd';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 5px 0 #a05d4d';
                        }}
                    >
                        edit
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); onDelete(note.note_id); }}
                        style={secondaryButtonStyles}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 5px 0 #a05d4d';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 3px 0 #a05d4d';
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = 'translateY(2px)';
                            e.currentTarget.style.boxShadow = '0 1.5px 0 #a05d4d';
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 5px 0 #a05d4d';
                        }}
                    >
                        delete
                    </button>
                </div>
            </div>

            <div style={{
                color: '#666',
                marginBottom: '1rem',
                lineHeight: '1.5',
                fontSize: '0.85rem',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                <ReactMarkdown components={markdownComponents}>
                    {note.content}
                </ReactMarkdown>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                {note.tags.map((tag, index) => (
                    <span
                        key={index}
                        style={{
                            padding: '0.25rem 0.6rem',
                            backgroundColor: getRandomLightColor(tag),
                            color: '#333',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            border: '1px solid rgba(0,0,0,0.1)'
                        }}
                    >
                        #{tag}
                    </span>
                ))}
            </div>

            <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.2rem' }}>
                Last updated: {formatDate(note.updated_at)}
            </div>

            {note.comments && note.comments.length > 0 && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                    <h5 style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>Comments ({note.comments.length})</h5>
                    {note.comments.slice(0, 2).map((comment, index) => (
                        <div key={index} style={{ marginBottom: '0.5rem', fontSize: '0.8rem' }}>
                            <strong>{comment.user}:</strong> {comment.content}
                        </div>
                    ))}
                    {note.comments.length > 2 && (
                        <span style={{ fontSize: '0.75rem', color: '#666' }}>
                            +{note.comments.length - 2} more comments
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default NoteCard;
