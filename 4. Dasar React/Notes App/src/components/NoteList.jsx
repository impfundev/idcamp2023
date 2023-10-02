import NoteItem from "./NoteItem.jsx";
import React from "react";

export default function NoteList({ notes, onDelete, onArchived, isArchived }) {
    if (notes.length === 0) {
        return <p className="notes-list__empty-message">Tidak ada catatan</p>
    }

    return (
        <div className="notes-list">
            {notes.map(note => (
                <NoteItem
                    key={note.id}
                    note={note}
                    onDelete={onDelete}
                    onArchived={onArchived}
                    isArchived={isArchived}
                />
            ))}
        </div>
    )
}