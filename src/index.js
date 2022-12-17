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
const [resetPressed, setResetPressed] = React.useState(false);

const [onBreak, setOnBreak] = React.useState(false);
const [breakAudio, setBreakAudio] = React.useState(new Audio("static-noise.mp3"));



/*    
// Testing 
const [displayTime, setDisplayTime] = React.useState(5);
const [breakTime, setBreakTime] = React.useState(3);
const [sessionTime, setSessionTime] = React.useState(4);
const [timerOn, setTimerOn] = React.useState(false);
const [resetPressed, setResetPressed] = React.useState(false);

const [onBreak, setOnBreak] = React.useState(false);
const [breakAudio, setBreakAudio] = React.useState(new Audio("static-noise.mp3"));
*/



const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return (
    (minutes < 10 ? "0" + minutes : minutes) + 
    ":" + 
    (seconds < 10 ? "0" + seconds : seconds)

    );
}

const formatTimeForLengths = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    return (
    ( minutes ) 
    );
}


const changeTime = (amount, type)=>{
    // console.log("amount=", amount);
    // console.log("type=", type);
    
    // console.log("sessionTime=", sessionTime);

    // I should not be able to set a session or break length to > 60
    if ((type==="break") && (breakTime/60 >= 60)  ){
        return;
    } else if ((type==="session") && (sessionTime/60 >= 60)  ){
        return;
    }
    

    // Increment or decrement the Length for a break or session 
    if (type === "break"){
        // Make sure we can not go below 1 into negative teritory
        if (breakTime <= 60 && amount < 0) {
            return;
        }
        setBreakTime((prev)=> prev + amount);
    } else if (type === "session") {
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

/*

const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;


    console.log("onBreak=", onBreak);

    if (!timerOn) {
        let interval = setInterval(()=>{
            date = new Date().getTime();
            if (date > nextDate){
                setDisplayTime((prev) => {
                    if (prev <= 0  && !onBreakVariable){
                        playBreakSound();
                        onBreakVariable = true;
                        setOnBreak(true);
                        return breakTime;

                    } else if (prev <= 0  && onBreakVariable){
                        playBreakSound();
                        onBreakVariable = false;
                        setOnBreak(false);
                        return sessionTime;

                    }
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
*/



const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;
    let displayTimeVariable = displayTime;


    // console.log("onBreak=", onBreak);
    let countFireSetInterval = 0;
    if (!timerOn) {
        //setTimerOn(true);
        //console.log("timerOn=", timerOn);
        let interval = setInterval(()=>{
            //if (timerOn === false) { return};
            //console.log("resetPressed=", resetPressed);

 //           if (resetPressed === true){ 
 //               setResetPressed(false);
 //               return;
 //           }
            countFireSetInterval += 1;
            //console.log("countFireSetInterval=", countFireSetInterval);
            //console.log("timerOn=", timerOn);
            
            displayTimeVariable = displayTimeVariable - 1;
            // If the displayed time is negative and we are not on break 
                    // Then switch the timer to the break intervak 
            // If the display time is negative and we are on a break interval 
                    // Then switch the timer to the session interval 
            // Else just update the timmer by substracting 1 second (1000ms) from it 
            if ((displayTimeVariable < 0) && (onBreakVariable === false)){
                playBreakSound();
                onBreakVariable = true;
                setOnBreak(true);
                displayTimeVariable = breakTime;
                setDisplayTime(breakTime);
            } else if ((displayTimeVariable < 0) && (onBreakVariable === true)){
                playBreakSound();
                onBreakVariable = false;
                setOnBreak(false);
                displayTimeVariable = sessionTime;
                setDisplayTime(sessionTime);

            } else {
                setDisplayTime( displayTimeVariable);
            }


        }, 1000);
        // console.log("touch!!!!!!!!!");

        localStorage.clear();        
        localStorage.setItem("interval-id", interval);

    }

    if (timerOn){
        clearInterval(localStorage.getItem("interval-id"));
    }
    setTimerOn(!timerOn);


}

/*
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

*/


const resetTime = () => {
    setDisplayTime(25*60);
    setBreakTime(5*60);
    setSessionTime(25*60);
    setTimerOn(false);
    setOnBreak(false);
    //console.log("timerOn=", timerOn);
    setResetPressed(true);

    // Reset the timmer while is counting (aka while the timerOn===true )
    if (timerOn){
        clearInterval(localStorage.getItem("interval-id"));
        setTimerOn(!timerOn);
    }

}



const playBreakSound = () => {
    breakAudio.currentTime = 0; 
    breakAudio.play();

}



return (
    <div className="App text-center">
        <h1>Pomodoro Clock</h1>
        <div className="dual-container">

            <Length 
                lengthType={"break-label"}
                lengthUpButtonType={"break-increment"}
                lengthDownButtonType={"break-decrement"}
                lengthDurationType={"break-length"}
                title={"break length"} 
                changeTime={changeTime} 
                type={"break"} 
                time={breakTime} 
                formatTimeForLengths={formatTimeForLengths}
            />

            <Length 
                lengthType={"session-label"}
                lengthUpButtonType={"session-increment"}
                lengthDownButtonType={"session-decrement"}
                lengthDurationType={"session-length"}
                title={"session length"} 
                changeTime={changeTime} 
                type={"session"} 
                time={sessionTime} 
                formatTimeForLengths={formatTimeForLengths}
            />
        </div>
        <div>
            <h3 id="timer-label">{onBreak ? "Break":"Session" }</h3>
            <h1 id="time-left">{formatTime(displayTime)}</h1>
            <button 
                id="start_stop"
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
                id="reset"
                className="btn btn-primary btn-lg"
                onClick={resetTime}
            >
                <i className="bi bi-arrow-repeat"></i>
            </button>

        </div>


    </div>
);
}

    

function Length(
    {lengthType, 
    lengthUpButtonType, 
    lengthDownButtonType, 
    lengthDurationType ,
    title, 
    changeTime, 
    type, 
    time, 
    formatTimeForLengths}
){
    return (
        <div>
            <h3>{title}</h3>
            <div id={`${lengthType}`} className="time-sets">
                <button 
                    id={`${lengthDownButtonType}`}
                    className="btn btn-primary"
                    onClick={()=>{
                       return changeTime(-60, type)
                    }}
                        
                >
                    <i className="bi bi-arrow-down-circle"></i>
                </button>
                <h3 id={`${lengthDurationType}`}>{formatTimeForLengths(time)}</h3>
                <button 
                    id={`${lengthUpButtonType}`}
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


