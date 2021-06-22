window.onload = function() {

    const mainEl = document.querySelector("main");
    const hourHand = document.getElementById("hour");
    const minHand = document.getElementById("min");
    const secHand = document.getElementById("sec");
    const date = new Date();
    
    setLayoutHeight(mainEl);

    // binding events
    bindEvents(mainEl);

    // computing total seconds
    let totalSec = (date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds();

    // calling setHands() every second
    setHands(totalSec++, hourHand, minHand, secHand);
    setInterval(() => {
        setHands(totalSec++, hourHand, minHand, secHand);
    }, 1000);
}



// function to set layout height of main element so that address bar in mobile view does not affect layout
const setLayoutHeight = mainEl => {
    mainEl.style.height = window.innerHeight + "px";
    displayRotateMsg();
}


// shows message to rotate device back to portrait orientation
const displayRotateMsg = () => {
    let msgEl = document.querySelector("#rotateScreen");
    let isRotateRequired = (getComputedStyle(msgEl).display === "block" && screen.orientation.angle == -90);
    
    msgEl.querySelector("img").style.transform = (isRotateRequired) ? "rotateY(180deg)" : "none";
}



// function to bind events to the elements
const bindEvents = mainEl => {
    const themeEl = document.getElementById("theme");
    const themeToggle = document.getElementById("darkMode");

    // changing theme
    themeToggle.addEventListener("change", (event) => {
        let theme = (event.target.checked) ? 'dark' : 'light';
        themeEl.setAttribute("href", `./css/${theme}-theme.css`)
    })

    // setting new height for the main element when screen resized
    window.addEventListener("resize", () => { 
        setLayoutHeight(mainEl)
    });


}



// function to position clock hands every second
const setHands = (totalSec, hourHand, minHand, secHand) => {
    let hrs = ((totalSec / 3600) % 12).toFixed(2);
    let mins = ((totalSec / 60) % 60).toFixed(2);
    let secs = totalSec % 60;

    hourHand.style.transform = `rotate(${hrs * 30}deg) translateY(calc(5 * var(--basic-unit-px)))`;
    minHand.style.transform = `rotate(${mins * 6}deg) translateY(calc(5 * var(--basic-unit-px)))`;
    secHand.style.transform = `rotate(${secs * 6}deg) translateY(calc(5 * var(--basic-unit-px)))`;
}