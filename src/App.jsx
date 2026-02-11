import React,{useState} from 'react'
import './assets/App.scss'
import Doc from './components/Doc'
import Navbar from './components/Navbar'
import MacWindow from './components/window/MacWindow'
import Github from './components/window/Github'
import Note from './components/window/Note'
import Resume from './components/window/Resume'
import Spotify from './components/window/Spotify'
import Cli from './components/window/Cli'

const App = ( ) => {
   const [window, setwindow] = useState({
        github:false,
        note:false,
        cli:false,
        resume:false,
        spotify:false,

    })
  return (
    <>
      <main>
        <Navbar />
        <Doc window = {window} setwindow = {setwindow}  />
       {window.github && <Github windowname = {'github'}  setwindow = {setwindow} />}
       {window.note && <Note windowname = {'note'}  setwindow = {setwindow} />}
       {window.resume && <Resume windowname = {'resume'}  setwindow = {setwindow} />}
       {window.spotify && <Spotify windowname = {'spotify'}  setwindow = {setwindow} />}
       {window.cli && <Cli windowname = {'cli'}  setwindow = {setwindow} />}
      </main>
    </>
  )
}

export default App
