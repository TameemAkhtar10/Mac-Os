import React, { useEffect,useState } from 'react'
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atelierDuneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import MacWindow from './MacWindow'
import "./note.scss"


const Note = ({setwindow,windowname}) => {

    const [ markdown, setMarkdown ] = useState(null)

    useEffect(() => {
        fetch("/public/Note.txt")
            .then(res => res.text())
            .then(text => setMarkdown(text))
    }, [])

    return (
        <MacWindow height='50vh' width='40vw' windowname={windowname} setwindow={setwindow} >
            <div className="note-window">
                { markdown ? <SyntaxHighlighter language='javascript' style={atelierDuneDark} >{markdown}</SyntaxHighlighter> : <p>Loading...</p> }
            </div>
        </MacWindow>
    )
}

export default Note