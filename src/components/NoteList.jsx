import { useState, useEffect } from 'react';
import { StickyNote, Plus, Trash2, Calendar } from 'lucide-react';
import './NoteList.css';

const NOTES_API_URL = 'http://localhost:3001/api/notes';

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 1. GET: Fetch notes on mount
  useEffect(() => {
    fetch(NOTES_API_URL)
      .then((res) => res.json())
      .then((data) => setNotes(data))
      .catch((err) => console.error('Error loading notes:', err));
  }, []);

  // 2. POST: Create note
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    fetch(NOTES_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
      .then((res) => res.json())
      .then((createdNote) => {
        setNotes([createdNote, ...notes]);
        setTitle('');
        setContent('');
      })
      .catch((err) => console.error('Error adding note:', err));
  };

  // 3. DELETE: Remove note
  const handleDeleteNote = (id) => {
    fetch(`${NOTES_API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        setNotes(notes.filter((note) => note.id !== id));
      })
      .catch((err) => console.error('Error deleting note:', err));
  };

  return (
    <div className="notes-container">
      <h2>
        <StickyNote size={22} color="var(--accent-purple)" />
        Notes Workspace
      </h2>

      <form onSubmit={handleAddNote} className="note-form">
        <input 
          type="text" 
          className="note-title-input" 
          placeholder="Note title..." 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          className="note-content-input" 
          placeholder="Write your note or code snippet here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="add-note-btn">
          <Plus size={16} />
          Save Note
        </button>
      </form>

      {notes.length === 0 ? (
        <div className="empty-notes">
          No notes created yet. Use the form above to add your first note!
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <div>
                <div className="note-card-header">
                  <h3>{note.title}</h3>
                  <button 
                    className="delete-note-btn" 
                    onClick={() => handleDeleteNote(note.id)}
                    title="Delete note"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="note-card-body">{note.content}</p>
              </div>
              <div className="note-card-footer">
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={12} />
                  {new Date(note.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoteList;
