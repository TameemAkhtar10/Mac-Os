import React from 'react'
import '../components/nav.scss'
import DateTime from './Datetime'

const Navbar = () => {
    return (
        <nav>

            <div className="left">
                <div className="img">
                    <img src="/public/apple.svg" alt="" />
                </div>
                <p>Tameem Akhtar</p>
                <p>File</p>
                <p>Window</p>
                <p>Terminal</p>

            </div>
            <div className="right">
                <div className="wifi">
                    <img src="/public/wifi.svg" alt="" />
                </div>
                <DateTime />
            </div>
        </nav>
    )
}

export default Navbar
