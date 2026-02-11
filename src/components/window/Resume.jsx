import React from 'react'
import MacWindow from './MacWindow'
import './resume.scss'

const Resume = ({setwindow,windowname}) => {
  return (
  <MacWindow height='80vh' windowname={windowname} setwindow={setwindow} >
    <div className="resume-window">
        <iframe src="/public/tameemresume.main.pdf" frameBorder="0"></iframe>

    </div>
  </MacWindow>
  )
}

export default Resume
