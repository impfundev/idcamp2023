import React from "react";

export default function NoteActions({ id, onDelete, onArchived, isArchived }) {
    return (
        <div className="note-item__action">
            <button className="note-item__delete-button" onClick={() => onDelete(id)}>Delete</button>
            <button className="note-item__archive-button" onClick={() => onArchived(id)}>{isArchived ? 'Arsipkan' : 'Pindahkan'}</button>
        </div>
    )
}