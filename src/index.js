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
const [onBreak, setOnBreak] = React.useState(false);




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

const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;

    if (!timerOn) {
        let interval = setInterval(()=>{
            date = new Date().getTime();
            if (date > nextDate){
                setDisplayTime(prev => {
                    return prev - 1;
                });
                nextDate = nextDate + second;
            }
        }, 30);
localStorage.clear();        
localStorage.setItem("interval-id", interval);
    }

if (timerOn){
    clearInterval(localStorage.getItem("interval-id"));
}
setTimerOn(!timerOn);
}

const resetTime = () => {
    setDisplayTime(25*60);
    setBreakTime(5*60);
    setSessionTime(25*60);
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
            <button 
                className="btn btn-primary btn-lg"
                onClick={controlTime}
            >
            {timerOn ? (
               <i className="bi bi-pause-circle"></i> 
            ) : (
                <i className="bi bi-play-circle"></i>
                )}
            </button> 
            <button 
                className="btn btn-primary btn-lg"
                onClick={resetTime}
            >
                <i className="bi bi-arrow-repeat"></i>
            </button>

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


