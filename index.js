const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
canvas.width = 852
canvas.height = 480
let tileCount = 20
let tileSize = 20
//add snake
let headX = Math.floor(canvas.width/(2*tileCount))
let headY = Math.floor(canvas.height/(2*tileCount))
let xVelocity = 0
let yVelocity = 0
// snake parts
let snakeParts=[]
let tailLength = 2
// add fruit
let appleX = 5
let appleY = 5
let hue = 0
//score
let score = 0

const backBtn = document.getElementById("back-btn") 
backBtn.addEventListener("click", function(){
    window.location.href = "home.html"
})
// window.addEventListener("resize", function(){
//     canvas.width = window.innerWidth
//     canvas.height = window.innerHeight
    
// })



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
    ctx.fillStyle ="green"
    for(let i=0; i<snakeParts.length;i++){
        let part = snakeParts[i]
        ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize)
    }
    snakeParts.push(new snakePart(headX, headY))
    if(snakeParts.length>tailLength){
        snakeParts.shift()
    } 

    ctx.fillStyle = "orange"
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
    // ctx.beginPath()
    // ctx.arc(headX*tileCount, headY*tileCount, 10, 0, Math.PI*2)
    // ctx.fill()
  
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
    // appleX = Math.floor(Math.random()*(canvas.width/tileCount))
    // appleY = Math.floor(Math.random()*(canvas.height/tileCount))
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
    // ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize)
    ctx.beginPath()
    ctx.arc((appleX + .5)*tileCount, (appleY + .5)*tileCount, 12, 0, Math.PI*2)
    ctx.fill()
    
}
function animateApple() {
    
    if (hue > 30) {
        hue--
    } else if (hue == 0) {
        hue++
    }
    requestAnimationFrame(animateApple)
}
animateApple()

function checkCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random()*(canvas.width/tileCount))
        appleY = Math.floor(Math.random()*(canvas.height/tileCount))
        tailLength++
   
    }
}
