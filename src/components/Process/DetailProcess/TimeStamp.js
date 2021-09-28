import React, { useState } from 'react';
import { differenceInSeconds } from 'date-fns';

function TimeStamp({ className, timeStart }) {
  const [time, setTime] = useState()

  const timeChange = () => {
    const difference = differenceInSeconds(new Date(), new Date(timeStart))
    const minutes = Math.floor(difference / 60);
    const seconds = (difference % 60).toFixed();
    const mm = minutes < 10 ? `0${minutes}` : minutes
    const ss = seconds < 10 ? `0${seconds}` : seconds
    setTime(`${mm}:${ss}`)
  }
  
  setTimeout(timeChange, 1000);

  return <div className={className}>{time}</div>
}

export default TimeStamp
