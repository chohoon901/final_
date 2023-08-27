
function calculateTimeRemaining(targetDate) {
    let now = new Date();
    let timeDiff = targetDate - now;

    if (timeDiff <= 0) {
      // 목표 시간이 이미 지났으면 타이머 종료
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds
    };
}

export default calculateTimeRemaining