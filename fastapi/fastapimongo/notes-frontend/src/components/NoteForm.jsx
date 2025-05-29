import React, { useState, useEffect } from 'react';
// Install: npm install @uiw/react-md-editor
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';

const buttonStyles = {
    padding: '0.75rem 1.5rem',
    borderRadius: '6px',
    fontSize: '2em',
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
    padding: '0.4rem 0.7rem',
    fontSize: '.9rem',
};

const secondaryButtonStyles = {
    ...buttonStyles,
    background: '#d97757',
    color: 'white',
    boxShadow: '0 4px 0 #a05d4d',
    transform: 'translateY(0)',
    padding: '0.4rem 0.7rem',
    fontSize: '.9rem',
};

const NoteForm = ({ note, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: note?.title || '',
        content: note?.content || '',
        tags: note?.tags?.join(', ') || '',
        priority: note?.priority || '',
        status: note?.status || 'todo'
    });
    const [loading, setLoading] = useState(false);

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

    return (
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
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
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
                        <label style={{
                            display: 'block',
                            marginBottom: '0.5rem',
                            fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                            fontWeight: '500',
                            color: "#999"
                        }}>Content:</label>

                        {/* Replace your custom editor with MDEditor */}
                        <div style={{ flex: 1 }}>
                            <MDEditor
                                value={formData.content}
                                onChange={(value) => setFormData({ ...formData, content: value || '' })}
                                preview="edit" // Options: "edit", "live", "preview"
                                hideToolbar={false}
                                height="60vh"
                                data-color-mode="light"
                                commands={[
                                ]}
                            />
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
                                fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segue UI", Roboto, sans-serif',
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
                            onClick={onCancel}
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
                            cancel
                        </button>


                        <button
                            disabled={loading}
                            type="submit"
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
                                e.currentTarget.style.boxShadow = '0 5px 0 #a0a7bd';
                            }}
                        >
                            {loading ? 'Saving...' : (note ? 'Update' : 'Create')}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteForm;