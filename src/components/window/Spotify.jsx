import React from 'react'
import MacWindow from './MacWindow'
import './spotify.scss'

const Spotify = ( {setwindow,windowname}) => {
    return (
        <MacWindow width='30vw' windowname={windowname} setwindow={setwindow}>
            <div className="spotify-window">
                <iframe 
                    style={{borderRadius:"12px"}} 
                    src="https://open.spotify.com/embed/artist/6DARBhWbfcS9E4yJzcliqQ?utm_source=generator" 
                    width="100%" 
                    height="100%"  
                    frameBorder="0" 
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"
                />
            </div>
        </MacWindow>
    )
}

export default Spotify