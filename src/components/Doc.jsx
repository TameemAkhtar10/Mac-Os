import React from 'react'
import './dock.scss'

const Doc = (props) => {
   
    return (
        <footer className='dock'>
            <div className="icon github" onClick={()=>{
                {props.setwindow(state=>({...state,github:true}))}
            }}><img src="/public/Doc-Icons/github.svg" alt="" /></div>
            <div className="icon note"  onClick={()=>{
                {props.setwindow(state=>({...state,note:true}))}
            }}><img src="/public/Doc-Icons/note.svg" alt="" /></div>
            <div className="icon pdf"  onClick={()=>{
                {props.setwindow(state=>({...state,resume:true}))}
            }}><img src="/public/Doc-Icons/pdf.svg" alt="" /></div>
            <div className="icon calender" onClick={() => {
                window.open('https://calendar.google.com/calendar/u/0/r', '_blank')
            }}><img src="/public/Doc-Icons/calender.svg" alt="" /></div>
            <div className="icon spotify"  onClick={()=>{
                {props.setwindow(state=>({...state,spotify:true}))}
            }}><img src="/public/Doc-Icons/spotify.svg" alt="" /></div>
            <div className="icon link" onClick={() => {
                window.open('https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile', '_blank')
            }}><img src="/public/Doc-Icons/link.svg" alt="" /></div>
            <div className="icon mail" onClick={() => {
                window.open('https://mail.google.com/mail/?view=cm&to=akhtartamimm@gmail.com', '_blank')
            }}><img src="/public/Doc-Icons/mail.svg" alt="" /></div>
            <div className="icon cli"  onClick={()=>{
                {props.setwindow(state=>({...state,cli:true}))}
            }}><img src="/public/Doc-Icons/cli.svg" alt="" /></div>
        </footer>
    )
}

export default Doc
