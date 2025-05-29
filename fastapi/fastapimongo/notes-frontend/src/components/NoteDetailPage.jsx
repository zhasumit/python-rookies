// NoteDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';

const NoteDetailPage = () => {
    const { noteId } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await api.notes.get(noteId);
                setNote(response.note);
            } catch (error) {
                setError('Failed to load note');
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [noteId]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading note...</div>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</div>;
    }

    if (!note) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>Note not found</div>;
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <h1>{note.title}</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.5rem' }}>
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
            <div style={{ margin: '1rem 0' }} data-color-mode="light">
                <MDEditor.Markdown
                    source={note.content}
                    style={{
                        whiteSpace: 'pre-wrap',
                        backgroundColor: 'transparent',
                        color: '#24292e'
                    }}
                    data-color-mode="light"
                />
            </div>
        </div>
    );
};

export default NoteDetailPage;