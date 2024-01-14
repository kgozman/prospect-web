import React from 'react';

const NoteComponent = ({ note={content:"", isEditing:false}, index, handleNoteChange, toggleNoteEditing }) => {
  return (
    <div key={index}>
      {note.isEditing ? (
        <textarea
          value={note.content}
          onChange={(e) => handleNoteChange(index, 'content', e.target.value)}
        />
      ) : (
        <p>{note.content}</p>
      )}

      <button onClick={() => toggleNoteEditing(index)}>
        {note.isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default NoteComponent;
