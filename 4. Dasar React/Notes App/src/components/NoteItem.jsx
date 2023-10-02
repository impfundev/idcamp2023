import React from "react";
import NoteContent from "./NoteContent.jsx";
import NoteActions from "./NoteActions.jsx";

export default function NoteItem({ note, onDelete, onArchived, isArchived }) {
    return (
        <article className="note-item">
            <NoteContent
                title={note.title}
                body={note.body}
                createdAt={note.createdAt}
            />
            <NoteActions
                onDelete={onDelete}
                id={note.id}
                onArchived={onArchived}
                isArchived={isArchived}
            />
        </article>
    )
}