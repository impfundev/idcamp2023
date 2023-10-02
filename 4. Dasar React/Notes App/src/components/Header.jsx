import React from "react";

export default function Header({ title, searching, onSearch }) {
    return (
        <header className="note-app__header">
            <h1>{ title }</h1>
            <input
                type="text"
                value={searching}
                className="input_search"
                placeholder="Cari judul"
                onChange={onSearch}
            />
        </header>
    )
}