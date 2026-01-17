//-------------------------------------------------------------------------------------------------------
// defining variable with empty array that will be used in this code to store values
//-------------------------------------------------------------------------------------------------------
let gameSeq = [];
let userSeq = [];
let scoreRecord = [];

let btns = ["red", "yellow", "green", "purple"];


//-------------------------------------------------------------------------------------------------------
// setting up some initial values...
//-------------------------------------------------------------------------------------------------------
let started = false;
let level = 0;
let high = 0;


//-------------------------------------------------------------------------------------------------------
// accessing the elements of out document
//-------------------------------------------------------------------------------------------------------
let h2 = document.querySelector('h2');
let h3 = document.querySelector('h3');


//-------------------------------------------------------------------------------------------------------
// creating an event that'll trigger if any key is pressed on our document
//-------------------------------------------------------------------------------------------------------
document.addEventListener("keypress", function(event) {
    if (started == false) {
        console.log("game started...");
        started = true;

        levelUp();
    } 
});


//-------------------------------------------------------------------------------------------------------
// Creating a function for - button flash
//-------------------------------------------------------------------------------------------------------
function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout( function() {
        btn.classList.remove("flash");
    }, 250);

};
function userFlash(btn) {
    btn.classList.add("userflash");

    setTimeout( function() {
        btn.classList.remove("userflash");
    }, 250);
};


//-------------------------------------------------------------------------------------------------------
// Creating a function
//-------------------------------------------------------------------------------------------------------
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = (Math.floor(Math.random() * 3)) + 1;
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
};


//-------------------------------------------------------------------------------------------------------
// creating function - Check Answer | Level Update | Highest Score | Reset Game
//-------------------------------------------------------------------------------------------------------
function checkAns(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b>.<br> Press any key to start`;

        scoreRecord.push(level);

        // getting highest score
        for(i=0; i<scoreRecord.length; i++) {
            if (high < scoreRecord[i]) {
                console.log(scoreRecord[i]);
                high = scoreRecord[i];
            }
        }

        console.log(scoreRecord)
        h3.innerHTML = `Highest score till now <b>${high} </b>`;

        document.querySelector('body').style.backgroundColor = 'red';

        setTimeout(() => {
            document.querySelector('body').style.backgroundColor = 'white';
        }, 150);

        reset();
    }
}


//-------------------------------------------------------------------------------------------------------
// creating function - button pressed
//-------------------------------------------------------------------------------------------------------
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute('id')
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}


//-------------------------------------------------------------------------------------------------------
// looping through all the buttons to add event listener that will trigger 'btnPress' function on click
//-------------------------------------------------------------------------------------------------------
let allBtns = document.querySelectorAll(".btn");  
for (let btn of allBtns) {
    btn.addEventListener('click', btnPress);
};


//-------------------------------------------------------------------------------------------------------
// creating function - Reset Game
//-------------------------------------------------------------------------------------------------------
function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}