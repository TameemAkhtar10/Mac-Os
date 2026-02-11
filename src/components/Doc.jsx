import React from 'react'
import './dock.scss'

const Doc = (props) => {
  return (
    <footer className='dock'>
      <div className="icon github" onClick={() => props.setwindow(s => ({ ...s, github: true }))}>
        <img src="/Doc-Icons/github.svg" alt="" />
      </div>

      <div className="icon note" onClick={() => props.setwindow(s => ({ ...s, note: true }))}>
        <img src="/Doc-Icons/note.svg" alt="" />
      </div>

      <div className="icon pdf" onClick={() => props.setwindow(s => ({ ...s, resume: true }))}>
        <img src="/Doc-Icons/pdf.svg" alt="" />
      </div>

      <div className="icon calender" onClick={() => window.open('https://calendar.google.com/calendar/u/0/r', '_blank')}>
        <img src="/Doc-Icons/calender.svg" alt="" />
      </div>

      <div className="icon spotify" onClick={() => props.setwindow(s => ({ ...s, spotify: true }))}>
        <img src="/Doc-Icons/spotify.svg" alt="" />
      </div>

      <div className="icon link" onClick={() => window.open('https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile', '_blank')}>
        <img src="/Doc-Icons/link.svg" alt="" />
      </div>

      <div className="icon mail" onClick={() => window.open('https://mail.google.com/mail/?view=cm&to=akhtartamimm@gmail.com', '_blank')}>
        <img src="/Doc-Icons/mail.svg" alt="" />
      </div>

      <div className="icon cli" onClick={() => props.setwindow(s => ({ ...s, cli: true }))}>
        <img src="/Doc-Icons/cli.svg" alt="" />
      </div>
    </footer>
  )
}

export default Doc
