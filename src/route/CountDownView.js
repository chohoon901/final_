import React, { useEffect, useState } from 'react'
import calculateTimeRemaining from './calculateTimeRemaining'

function CountDownView({targetDate}) {

  const [remainingTime, setRemainingTime] = useState(calculateTimeRemaining(targetDate));
  // const isNotYet = calculateTimeRemaining(targetTime)
  let [isOver, setIsOver] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(calculateTimeRemaining(targetDate));
      if((remainingTime.days === 0) && (remainingTime.hours === 0) && (remainingTime.minutes === 0) && (remainingTime.seconds === 0)) {
        setIsOver(true)
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div>
      {
          isOver
          ? <h6 className="marginright"> 마감 </h6>
          : <h6 className="marginright">{remainingTime.hours} : {remainingTime.minutes} : {remainingTime.seconds} 뒤 마감 </h6>
      }
    </div>
  )
}

export default CountDownView