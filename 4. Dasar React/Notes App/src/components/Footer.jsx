import React from "react";
import IconGithub from "./icon/Github.jsx";
import IconLinkedin from "./icon/Linkedin.jsx";

export default function Footer() {
    return (
        <footer className="note-app__footer">
            <p>Made by love from Ilham Maulana Pratama, Dicoding.</p>
            <div className="note-app__footer_contact">
                <a href="https://github.com/impfundev">
                    <IconGithub width="2rem" />
                </a>
                <a href="https://www.linkedin.com/in/ilhammp/">
                    <IconLinkedin width="2rem" />
                </a>
            </div>
        </footer>
    )
}