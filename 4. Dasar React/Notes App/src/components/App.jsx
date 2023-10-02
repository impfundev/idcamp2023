import React from "react";
import NoteList from "./NoteList.jsx";
import { getInitialData } from "../utils/index.js";
import Form from "./Form.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getInitialData(),
            searchNotes: '',
        }

        this.onAddEventHandler = this.onAddEventHandler.bind(this)
        this.onDeleteEventHandler = this.onDeleteEventHandler.bind(this)
        this.onArchivedEventHandler = this.onArchivedEventHandler.bind(this)
        this.onSearchEventHandler = this.onSearchEventHandler.bind((this))
    }

    onAddEventHandler({ title, body }) {
        this.setState((previousNote) => {
            return {
                notes: [
                    ...previousNote.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        createdAt: new Date().toDateString(),
                        archived: false
                    }
                ]
            }
        })
    }

    onDeleteEventHandler(id) {
        const notes = this.state.notes.filter(note => note.id !== id)
        this.setState({
            notes
        })
    }

    onArchivedEventHandler(id) {
        const updateNotes = this.state.notes.filter(note => note.id === id).map(note => {
            note.archived = !note.archived
        })
        this.setState({
            updateNotes
        })
    }

    onSearchEventHandler(event) {
        this.setState({
            searchNotes: event.target.value
        })
    }

    render() {
        const notes = this.state.notes.filter((note) => note.title.toLowerCase().includes(this.state.searchNotes.toLowerCase()))
        let notesActive = notes.filter(note => note.archived === false)
        let notesArchive = notes.filter(note => note.archived === true)

        console.log(this.state.notes)

        return (
            <>
                <Header title="Notes" searching={this.state.searchNotes} onSearch={this.onSearchEventHandler} />
                <main className="note-app__body">
                    <Form addNote={this.onAddEventHandler} />
                    <h2>Catatan Aktif</h2>
                    <NoteList
                        notes={notesActive}
                        onDelete={this.onDeleteEventHandler}
                        onArchived={this.onArchivedEventHandler}
                        isArchived
                    />
                    <h2>Arsip</h2>
                    <NoteList
                        notes={notesArchive}
                        onDelete={this.onDeleteEventHandler}
                        onArchived={this.onArchivedEventHandler}
                    />
                </main>
                <Footer />
            </>
        )
    }
}

export default App;