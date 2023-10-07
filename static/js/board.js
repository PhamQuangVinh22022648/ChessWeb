let whiteTime = 15 * 60; // 15 minutes in seconds
let blackTime = 15 * 60;
const whiteClock = document.getElementById('white-clock');
const blackClock = document.getElementById('black-clock');
let isWhiteTurn = true

function updateClock() {
    const minutes = Math.floor(whiteTime / 60);
    const seconds = whiteTime % 60;
    
    // Make sure to use whiteClock instead of countdownEl
    whiteClock.innerHTML = `${minutes}:${seconds}`;

    // Decrease whiteTime by 1 second
    if(isWhiteTurn == true){
        whiteTime--;
    }

    // Optionally, handle the case when whiteTime reaches 0
    if (whiteTime < 0) {
        // You can stop the interval or take any other action here
        clearInterval();
        alert('Time is up!');
    }
}
function updateClock2() {
    const minutes = Math.floor(blackTime / 60);
    const seconds = blackTime % 60;
    
    // Make sure to use whiteClock instead of countdownEl
    blackClock.innerHTML = `${minutes}:${seconds}`;

    // Decrease whiteTime by 1 second
    if(isWhiteTurn == false)
    {
        blackTime--;
    }

    // Optionally, handle the case when whiteTime reaches 0
    if (blackTime < 0) {
        // You can stop the interval or take any other action here
        clearInterval();
        alert('Time is up!');
    }
}

