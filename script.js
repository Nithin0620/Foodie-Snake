//Game constants & Variables
let inputDir = { x: 0, y: 0 };
const foodsound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameOver.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;


let snakeArr = [
    { x: 13, y: 15 }
]

let food = { x: 10, y: 7 };



//Game Functions 
function main(ctime) {
    scoreBox.innerHTML = "Score: " + score; // Update scoreBox
    localStorage.clear();

    window.requestAnimationFrame(main);
    // console.log(ctime);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    else {
        lastPaintTime = ctime;
        gameEngine();
    }
}
function isCollide(sarr) {
    
    //collide yourself
    for( let i= 1;i<snakeArr.length;i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    if(snakeArr[0].x>=18 || snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr[0].y<=0){
        return true;
    }

    
    return false;
}

function gameEngine() {
    musicSound.play();
    localStorage.clear();


    // Part 1 :updating the snake array & food;
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over , Press any key to play again!!");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;

    }


    // IF you have eaten the food regenerate the food and update the score
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        score += 1;
        let a=2;
        let b=16
        
        // Update the high score if needed
        if(score > highscoreval){
            highscoreval = score; // Removed let to correctly update the global highscoreval
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscorebox.innerHTML = "Highscore: " + highscoreval; // Update highscorebox
        }
        
        scoreBox.innerHTML = "Score: " + score; // Update scoreBox
        food = { x: 2 + Math.round((16 - 2) * Math.random()), y: 2 + Math.round((16 - 2) * Math.random()) }; // Randomize food position
    }


    //IF you have eatten the food regenerate the fod and uodate the score
    

    //Moving the snake
    for( let i= snakeArr.length - 2;i>=0;i--){
        // const element=snakeArr[i];
        snakeArr[i+1]= {...snakeArr[i]}

    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;





    // part 2 : Display the snake and food;

    //Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');

        }
        board.appendChild(snakeElement);
    })




    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');

    board.appendChild(foodElement);



}









//Main logic starts here
let highscore= localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(highscore);
    highscorebox.innerHTML = "Highscore: "+ highscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }//starts the game;;
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -  1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:



    }
})
