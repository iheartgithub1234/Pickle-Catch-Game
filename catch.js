let level = prompt("What would you like the starting difficulty to be? \n \n 1 is easy, 2 is medium, 3 is hard \n \n Select Cancel to stop playing", 1);
level = Number(level);

if(parseInt(level) === level) {
    alert("Game is Starting");
} else {
    alert("Invalid \n \n Click anywhere on page to enable sound");
    location.reload();
}

let box = document.getElementById("box");
let thing = document.getElementById("thing");
let bucket = document.getElementById("bucket");
let scoreTag = document.getElementById("scoreTag");
let score = 0;
let thingYPos = 0;
let thingXPos = 0;
let optionsForThingXPos = [0, 50, 100, 150, 200, 250, 300, 350];
let mouseXPos;
let flag = false;
let speed = level;
let increaser = (1/5) * speed;
let pointSound = new Audio("point.mp3");
let losingSound = new Audio("losing.mp3");

window.addEventListener("mousemove", function() {
    mouseXPos = event.clientX - 50;
    bucket.style.left = mouseXPos - box.getBoundingClientRect().left + "px";

    if(mouseXPos <= box.getBoundingClientRect().left) {
        bucket.style.left = 0 + "px";
    }

    if(mouseXPos >= box.getBoundingClientRect().left + 300) {
        bucket.style.left = 300 + "px";
    }
});

mainInterval = setInterval(eachTick, 10);

function eachTick() {
    moveThing();
    checkGameOver();
    checkScore();
}

function moveThing() {
    thingYPos += speed;
    thing.style.top = thingYPos + "px";
}

function checkGameOver() {
    if(thingYPos >= 500) {
        clearInterval(mainInterval);
        document.body.style.backgroundColor = "red";
        losingSound.play();
        setTimeout(newGame, 1500);
    }
}

function newGame() {
    alert("You Lost \n \n Your score was " + score);
    alert("Restarting Game \n \n Click anywhere on page to enable sound");
    location.reload();
}

function resetThing() {
    thingYPos = 0;
    thingXPos = optionsForThingXPos[Math.floor(Math.random()*optionsForThingXPos.length)];
    thing.style.left = thingXPos + "px";
    flag = false;
    speed += increaser;
}

function checkScore() {
    if(parseInt(bucket.style.left) <= thingXPos && parseInt(bucket.style.left) + 100 >= thingXPos + 50 && thingYPos >= 480 && flag == false) {
        score += 1;
        pointSound.play();
        scoreTag.textContent = "Your score is: " + score;
        flag = true;
        resetThing();
    }
}