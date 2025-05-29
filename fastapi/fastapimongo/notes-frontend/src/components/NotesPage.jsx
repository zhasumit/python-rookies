// NotesPage.js
import React, { useState, useEffect } from 'react';
import { useSearch } from '../SearchContext';
import api from '../api';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';

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

const successButtonStyles = {
    ...buttonStyles,
    background: '#42ad5f',
    color: 'white',
    boxShadow: '0 4px 0 #586b59',
    transform: 'translateY(0)',
    padding: '0.4rem 0.7rem',
    fontSize: '0.9em',
};

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [error, setError] = useState('');

    const { searchTerm, filter } = useSearch();

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            const response = await api.notes.getAll();
            setNotes(response.notes);
        } catch (error) {
            setError('Failed to load notes');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateNote = async (noteData) => {
        try {
            await api.notes.create(noteData);
            await loadNotes();
            setShowForm(false);
        } catch (error) {
            setError('Failed to create note');
        }
    };

    const handleUpdateNote = async (noteData) => {
        try {
            await api.notes.update(editingNote.note_id, noteData);
            await loadNotes();
            setShowForm(false);
            setEditingNote(null);
        } catch (error) {
            setError('Failed to update note');
        }
    };

    const handleDeleteNote = async (noteId) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await api.notes.delete(noteId);
                await loadNotes();
            } catch (error) {
                setError('Failed to delete note');
            }
        }
    };

    const handleEditNote = (note) => {
        setEditingNote(note);
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingNote(null);
    };

    const filteredNotes = notes.filter(note => {
        const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        if (filter === 'all') return matchesSearch;
        return matchesSearch && note.status === filter;
    });

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading notes...</div>;
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            {error && (
                <div style={{
                    color: 'red',
                    backgroundColor: '#ffebee',
                    padding: '1rem',
                    borderRadius: '4px',
                    marginBottom: '2rem'
                }}>
                    {error}
                    <button
                        onClick={() => setError('')}
                        style={{ float: 'right', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}
                    >
                        ×
                    </button>
                </div>
            )}

            <div style={{ marginBottom: '10px', marginLeft: '0px', textAlign: 'right' }}>
                <button
                    onClick={() => setShowForm(true)}
                    style={successButtonStyles}
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
                    + New Note
                </button>
            </div>


            {filteredNotes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
                    <h3>No notes found</h3>
                    <p>
                        {searchTerm || filter !== 'all'
                            ? 'Try adjusting your search or filter criteria.'
                            : 'Create your first note to get started!'
                        }
                    </p>
                </div>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '1.5rem',
                    '@media (max-width: 768px)': {
                        gridTemplateColumns: '1fr'
                    }
                }}>
                    {filteredNotes.map(note => (
                        <NoteCard
                            key={note.note_id}
                            note={note}
                            onEdit={handleEditNote}
                            onDelete={handleDeleteNote}
                        />
                    ))}
                </div>
            )}

            {showForm && (
                <NoteForm
                    note={editingNote}
                    onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
                    onCancel={handleCancelForm}
                />
            )}
        </div>
    );
};

export default NotesPage;