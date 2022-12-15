import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
//import App from './App';
//import {React} from "react";
//import React from 'react'

// Import bootstrap styling 
import {Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import "./style.css";




function App() {
const [displayTime, setDisplayTime] = React.useState(25*60);
const [breakTime, setBreakTime] = React.useState(5*60);
const [sessionTime, setSessionTime] = React.useState(25*60);
const [timerOn, setTimerOn] = React.useState(false);



const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return (
    (minutes < 10 ? "0" + minutes : minutes) + 
    ":" + 
    (seconds < 10 ? "0" + seconds : seconds)

    );
}


const changeTime = (amount, type)=>{
    if (type === "break"){
        // Make sure we can not go below 1 into negative teritory
        if (breakTime <= 60 && amount < 0) {
            return;
        }
        setBreakTime((prev)=> prev + amount);
    } else {
        // Make sure we can not go below 1 into negative teritory
        if (sessionTime <= 60 && amount < 0) {
            return;
        }
        setSessionTime((prev)=> prev + amount);
        if (!timerOn){
            setDisplayTime(sessionTime + amount);
        }
    }

}


return (
    <div className="App text-center">
        <h1>Pomodoro Clock</h1>
        <div className="dual-container">

            <Length 
                title={"break length"} 
                changeTime={changeTime} 
                type={"break"} 
                time={breakTime} 
                formatTime={formatTime}
            />

            <Length 
                title={"session length"} 
                changeTime={changeTime} 
                type={"session"} 
                time={sessionTime} 
                formatTime={formatTime}
            />
        </div>
        <div>
            <h1>{formatTime(displayTime)}</h1>
        </div>


    </div>
);
}



function Length({title, changeTime, type, time, formatTime}){
    return (
        <div>
            <h3>{title}</h3>
            <div className="time-sets">
                <button 
                    className="btn btn-primary"
                    onClick={()=>{
                       return changeTime(-60, type)
                    }}
                        
                >
                    <i className="bi bi-arrow-down-circle"></i>
                </button>
                <h3>{formatTime(time)}</h3>
                <button 
                    className="btn btn-primary"
                    onClick={()=>{
                       return changeTime(+60, type)
                    }}
                >
                    <i className="bi bi-arrow-up-circle"></i>
                </button>

            </div>
        </div>
    );
}





























const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


