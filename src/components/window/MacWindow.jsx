import React from 'react'
import { Rnd } from 'react-rnd'
import '..//window/window.scss'
import './github.scss'
const MacWindow = ({children,width ='47vw',height = '70vh' ,windowname ,setwindow   }) => {


  return (
    <Rnd default={{
       x:200,
       y:40,
        width: width,
        height: height,
    }} 
     >
        <div className="window">

        <div className="nav">
        <div className="dots">
            <div className="laal dot" onClick={()=>{
              setwindow(state =>({...state,[windowname]:false}))}
            }></div>
            <div className="piila dot"></div>
            <div className="hara dot"></div>
        </div>
        <div className="name">
            <p>tameemakhtar  t-10</p>
        </div>
        </div>
        <div className="main-container">
          {children}
        </div>
        </div>
    </Rnd>
  )
}

export default MacWindow
