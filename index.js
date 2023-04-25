const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
let tileCount = 20
let tileSize = 18
//add snake
let headX = 10
let headY = 10
let xVelocity = 0
let yVelocity = 0
// snake parts
let snakeParts=[]
let tailLength = 2
// add fruit
let appleX = 5
let appleY = 5

class snakePart{
    constructor(x,y){
        this.x=x
        this.y=y
    }
}

function drawGame(){
    clearScreen()
    drawSnake()
    changeSnakePosition()
    checkCollision()
    drawApple()
    
    let speed = 7
    setTimeout(drawGame, 1000/speed)
}
function clearScreen(){
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}
drawGame()

function drawSnake(){
    ctx.fillStyle = "orange"
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
    ctx.fillStyle ="green"
    for(let i=0; i<snakeParts.length;i++){
        let part = snakeParts[i]
        ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize)
    }
    snakeParts.push(new snakePart(headX, headY))
    if(snakeParts.length>tailLength){
        snakeParts.shift()
    }
}

document.body.addEventListener("keydown", keyDown)

function keyDown(event){
    if(event.keyCode == 38) {
        
        if (yVelocity == 1){
        yVelocity = 1
        xVelocity = 0
        } else {
            yVelocity = -1
            xVelocity = 0 
        }
    }
    
    if(event.keyCode == 40) {
        if (yVelocity == -1){
            yVelocity = -1
            xVelocity = 0
        } else {
            yVelocity = 1
            xVelocity = 0
        }
    }
    if(event.keyCode == 37) {
        if (xVelocity == 1){
            yVelocity = 0
            xVelocity = 1
        } else {
            yVelocity = 0
            xVelocity = -1
        } 
    }
    if (event.keyCode == 39) {
        if (xVelocity == -1){
            yVelocity = 0
            xVelocity = -1
        } else {
            yVelocity = 0
            xVelocity = 1
        } 
        
    }
}

function changeSnakePosition(){
    headX += xVelocity
    headY += yVelocity
}

function drawApple(){
    ctx.fillStyle = "red"
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
    
}
function checkCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random()*tileCount)
        appleY = Math.floor(Math.random()*tileCount)
        tailLength++
   
    }
}
