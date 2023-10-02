import React from "react";
import { showFormattedDate } from "../utils/index.js";

export default function NoteContent({ title, body, createdAt }) {
    return (
        <div className="note-item__content">
            <h3 className="note-item__title">{ title }</h3>
            <time dateTime={createdAt} className="note-item__date">{showFormattedDate(createdAt)}</time>
            <p className="note-item__body">{ body }</p>
        </div>
    )
}