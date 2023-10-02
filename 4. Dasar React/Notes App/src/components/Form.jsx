import React from "react";

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            maxLength: 50,
        }

        this.onTitleChangeHandler = this.onTitleChangeHandler.bind(this)
        this.onBodyChangeHandler = this.onBodyChangeHandler.bind(this)
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this)
    }

    onTitleChangeHandler(event) {
        this.setState(() => {
            return {
                title: event.target.value
            }
        })
    }

    onBodyChangeHandler(event) {
        this.setState(() => {
            return {
                body: event.target.value
            }
        })
    }

    onSubmitEventHandler(event) {
        // menghentikan aksi default dari tombol submit
        event.preventDefault();
        this.props.addNote(this.state)
    }

    render() {
        return (
            <form className="note-input" onSubmit={this.onSubmitEventHandler}>
                <h2>Buat Catatan</h2>
                <div className="note-input__title__char-limit">
                    <span>Sisa Karakter: </span>
                    <span>{this.state.maxLength - this.state.title.length}</span>
                </div>
                <input
                    id="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.onTitleChangeHandler}
                    className="note-input__title"
                    placeholder="Tuliskan judul disini..."
                    maxLength={this.state.maxLength}
                    required
                />
                <textarea
                    value={this.state.body}
                    onChange={this.onBodyChangeHandler}
                    className="note-input__body"
                    placeholder="Tulis catatan kamu disini..."
                    required
                />
                <button type="submit">Buat</button>
            </form>
        )
    }
}

export default Form;