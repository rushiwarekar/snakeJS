const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create a box or unit
const box = 32;

//load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src ="img/food.png";

//load sound 
let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "sound/dead.mp3";
eat.src = "sound/eat.mp3";
up.src = "sound/up.mp3";
right.src = "sound/right.mp3";
left.src = "sound/left.mp3";
down.src = "sound/down.mp3";


//create snake
let snake = [];

snake[0]={
    x:9*box,y:10*box
};

//create food

let food ={
    x:Math.floor(Math.random()*17+1)*box,
    y:Math.floor(Math.random()*17+3)*box
}

//create score
let score = 0;

//control
let d;
document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if(key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key ==38 && d != "Down"){
        up.play();
        d = "UP"
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT"
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN"
        down.play();
    }
}

//Cheake collision 

function collision(head, array){
    for(let i=0; i< array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}
//draw on canvas

function draw(){
    ctx.drawImage(ground,0,0);

    for (let i=0; i< snake.length ; i++) {
        ctx.fillStyle = ( i==0 )?"green":"white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    //old head position
    let snakex = snake [0].x;
    let snakey = snake [0].y;

    //direction to move
    if(d == "LEFT")snakex -= box;
    if(d == "UP")snakey -= box;
    if(d == "RIGHT")snakex += box;
    if(d == "DOWN")snakey += box;

    //snake eat food
    if(snakex == food.x && snakey == food.y) {
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1)*box,
            y : Math.floor(Math.random()*15+3)*box
        }
        //we dont remove tail
    }else{
        //remove tail
        snake.pop();
    }

    //add new head

    let newHead = {
        x : snakex,
        y : snakey
    }

    //game over
    if(snakex < box || snakex > 17* box || snakey < 3*box || snakey > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px changa one";
    ctx.fillText(score,2*box,1.6*box);
}
let game = setInterval(draw, 100);