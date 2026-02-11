import React from 'react'
import '../components/nav.scss'
import DateTime from './DateTime'

const Navbar = () => {
    return (
        <nav>

            <div className="left">
                <div className="img">
                    <img src="/apple.svg" alt="" />
                </div>
                <p>Tameem Akhtar</p>
                <p>File</p>
                <p>Window</p>
                <p>Terminal</p>

            </div>
            <div className="right">
                <div className="wifi">
                    <img src="/wifi.svg" alt="" />
                </div>
                <DateTime />
            </div>
        </nav>
    )
}

export default Navbar
