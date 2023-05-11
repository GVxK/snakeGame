const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
const scoreEl = document.getElementById("score-el")
canvas.width = 820
canvas.height = 480
let tileCount = 20
let tileSize = 20
let lastDirection = ""
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
let hue = 1
const particlesArray = []
//score
let score = 0
//add death particles
const deathParticlesArray = []

let disableKeys = false
let gameStarted = false

let gameOver = false

const backBtn = document.getElementById("back-btn") 
backBtn.addEventListener("click", function(){
    window.location.href = "home.html"
})




class snakePart{
    constructor(x,y){
        this.x=x
        this.y=y
    }
}   
function drawGame(){
    isGameOver()
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

function isGameOver() {
    let gameOver = false

    if (yVelocity === 0 && xVelocity === 0) {
        gameOver = false
        gameStarted = false
    }           
    if (yVelocity > 0 || xVelocity > 0 || yVelocity < 0 || xVelocity < 0) {
        gameOver = false
        gameStarted = true
        disableKeys = true
    }
    if ( headX === -1 || headY === -1 || headX === 41 || headY === 24) {
    gameOver = true
    for (i = 0; i < tailLength*20; i++){
        deathParticlesArray.push(new deathParticle())
    }
    }
    for (let j = 0; j < snakeParts.length; j++) {
        let part = snakeParts[j]
        if ( part.x === -1 || part.y === -1 || part.x === 41 || part.y === 24) {
            gameOver = true
            for (i = 0; i < tailLength*10; i++){
                deathParticlesArray.push(new deathParticle())
        }
        }
    }
    if (gameStarted) {
        for (let i = 2; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        if (part.x === headX && part.y === headY) {
        gameOver = true
        for (i = 0; i < tailLength*10; i++){
            deathParticlesArray.push(new deathParticle())
        }
        }
        }
    }
    
    if(gameOver === true){
        ctx.fillStyle="white"
        ctx.font="50px verdana"
        ctx.fillText("Game Over! ", canvas.width/3.2, canvas.height/2)
    }   
    }
 
function drawSnake(){
    //snake body parts
    ctx.fillStyle ="rgb(73, 160, 15)"
    for (let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i]
    ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize)
    ctx.strokeStyle = 'yellowgreen';
    ctx.lineWidth = 1;
    ctx.strokeRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize);
    
    }
    snakeParts.push(new snakePart(headX, headY))
    if(snakeParts.length>tailLength){//keep snake's body = snake's length
        snakeParts.shift()
    } 
    //snake's head
    if (lastDirection == "right") {
        headR()
    } else if (lastDirection == "left") {
        headL()
    } else if (lastDirection == "up") {
        headU()
    } else {
        headD()
    }
    
    
    
}

//bind movement to keys
document.body.addEventListener("keydown", keyDown)

function keyDown(event){
    if ( headX < 0 || headY < 0 || headX > 40 || headY > 23) {
        return
    }
    if(event.keyCode == 38) { //up
        
        if (yVelocity == 1){//disable moving into self
        yVelocity = 1
        xVelocity = 0
        lastDirection = "down"
        } else {
            yVelocity = -1
            xVelocity = 0 
            lastDirection = "up"//set which direction the snake is facing
            tongueU()//tongue animation
        }
        
    }
    
    if(event.keyCode == 40) { //down
        if (yVelocity == -1){ 
            yVelocity = -1
            xVelocity = 0
            lastDirection = "up"
        } else {
            yVelocity = 1
            xVelocity = 0
            lastDirection = "down"
            tongueD()
        }
        
    }
    if(event.keyCode == 37) { //left
        if (xVelocity == 1){
            yVelocity = 0
            xVelocity = 1
            lastDirection = "right"
        } else {
            yVelocity = 0
            xVelocity = -1
            lastDirection = "left"
        } 
        
    }
    if (event.keyCode == 39) { //right
        if (xVelocity == -1){
            yVelocity = 0
            xVelocity = -1
            lastDirection = "left"
        } else {
            yVelocity = 0
            xVelocity = 1
            lastDirection = "right"
        } 
        
    }
}
document.addEventListener('keydown', function(event) {
    if (gameStarted) {
      event.preventDefault();
    }
  })
function changeSnakePosition(){
    headX += xVelocity
    headY += yVelocity
}

function drawApple(){
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
    ctx.beginPath()
    ctx.arc((appleX + .5)*tileCount, (appleY + .5)*tileCount, 12, 0, Math.PI*2)
    ctx.fill()
}

//when apple gets eaten
function checkCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random()*(canvas.width/tileCount))
        appleY = Math.floor(Math.random()*(canvas.height/tileCount))
        tailLength++
        getScore()
        for (i = 0; i < tailLength*2; i++){
            particlesArray.push(new Particle())
        }
        scoreEl.innerText = `Score: ${score} pts`
    }
}
function getScore() {
    score++
        if (score>10) score += 1
        if (score>50) score += 1
        if (score>100) score += 3
        if (score>200) score += 6
        if (score>500) score += 10
        if (score>1000) score += 10
        if (score>2000) score += 20
        if (score>4000) score += 30
        if (score>10000) score += 50

}

//animation and particles
function animate(){
    hue++
    if (hue>30) {hue = 0}
    handleParticles(particlesArray)
    handleParticles(deathParticlesArray)
    requestAnimationFrame(animate)
}
animate()
//apple eaten particles
class Particle {
    constructor(){
        this.x = headX * tileCount
        this.y = headY * tileCount
        this.size = Math.random() *tailLength/10 + 1
        this.speedX = Math.random() *3 - 1.5
        this.speedY = Math.random() *3 - 1.5
        this.color = `hsl(${hue}, 100%, 50%)`
    }
    update(){
        this.x += this.speedX
        this.y += this.speedY
        if (this.size >0.2) this.size -= 0.05
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2)
        ctx.fill()
    }
}
//death particles when touching borders or itself
class deathParticle {
    constructor(){
        this.x = headX * tileCount
        this.y = headY * tileCount
        this.size = (Math.random() *15) +1
        this.speedX = (Math.random() *3) -1.5
        this.speedY = (Math.random() *3) -1.5
        const greens = ["yellowgreen", "green", "darkgreen"]
         let randomColor = Math.floor(Math.random()*3)
        this.color = greens[randomColor]

    }
    update(){
        this.x += this.speedX
        this.y += this.speedY
        if (this.size >0.2) this.size -= 0.05
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2)
        ctx.fill()
    }
    
}
//make particles move, shrink and disappear
function handleParticles(array){
    for(let i = 0; i<array.length; i++){
        array[i].update()
        array[i].draw()
        if (array[i].size <= 0.3) {
            array.splice(i, 1)
            i--
        }
    }
}

// draw snake's head for each direction
function headR() { //right
    ctx.fillStyle = `yellowgreen` 
    ctx.beginPath()
    ctx.arc(headX * tileCount +20, headY * tileCount +10, 10, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `yellowgreen`
    ctx.beginPath()
    ctx.arc(headX * tileCount +12, headY * tileCount +10, 12, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `yellowgreen`
    ctx.beginPath()
    ctx.arc(headX * tileCount +5, headY * tileCount +10, 11, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `white`
    ctx.beginPath()
    ctx.arc(headX * tileCount +20, headY * tileCount +14, 5, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `black`
    ctx.beginPath()
    ctx.arc(headX * tileCount +22, headY * tileCount +14, 2, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `white`
    ctx.beginPath()
    ctx.arc(headX * tileCount +20, headY * tileCount +5, 5, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `black`
    ctx.beginPath()
    ctx.arc(headX * tileCount +22, headY * tileCount +5, 2, 0, Math.PI*2)
    ctx.fill()
}
function headL(){ //left
    ctx.fillStyle = `yellowgreen` 
    ctx.beginPath()
    ctx.arc(headX * tileCount , headY * tileCount +10, 10, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `yellowgreen`
    ctx.beginPath()
    ctx.arc(headX * tileCount +9, headY * tileCount +10, 12, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `yellowgreen`
    ctx.beginPath()
    ctx.arc(headX * tileCount +15, headY * tileCount +10, 11, 0, Math.PI*2)
    ctx.fill()

    //eyes
    ctx.fillStyle = `white`
    ctx.beginPath()
    ctx.arc(headX * tileCount +0, headY * tileCount +14, 5, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `black`
    ctx.beginPath()
    ctx.arc(headX * tileCount -2, headY * tileCount +14, 2, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `white`
    ctx.beginPath()
    ctx.arc(headX * tileCount +0, headY * tileCount +5, 5, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `black`
    ctx.beginPath()
    ctx.arc(headX * tileCount -2, headY * tileCount +5, 2, 0, Math.PI*2)
    ctx.fill()
}
function headU(){ //up
    ctx.fillStyle = `yellowgreen` //up
    ctx.beginPath()
    ctx.arc(headX * tileCount +10, headY * tileCount, 10, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `yellowgreen`
    ctx.beginPath()
    ctx.arc(headX * tileCount +10, headY * tileCount +9, 12, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `yellowgreen`
    ctx.beginPath()
    ctx.arc(headX * tileCount +10, headY * tileCount +15, 11, 0, Math.PI*2)
    ctx.fill()

    // eyes
    ctx.fillStyle = `white`
    ctx.beginPath()
    ctx.arc(headX * tileCount +15, headY * tileCount, 5, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `black`
    ctx.beginPath()
    ctx.arc(headX * tileCount +15, headY * tileCount -2, 2, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `white`
    ctx.beginPath()
    ctx.arc(headX * tileCount +4, headY * tileCount, 5, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `black`
    ctx.beginPath()
    ctx.arc(headX * tileCount +4, headY * tileCount -2, 2, 0, Math.PI*2)
    ctx.fill()
}
function headD() { //down
    ctx.fillStyle = `yellowgreen` //down
    ctx.beginPath()
    ctx.arc(headX * tileCount +10, headY * tileCount +20, 10, 0, Math.PI*2)
    ctx.fill()
     
    ctx.fillStyle = `yellowgreen`
    ctx.beginPath()
    ctx.arc(headX * tileCount +10, headY * tileCount +12, 12, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `yellowgreen`
    ctx.beginPath()
    ctx.arc(headX * tileCount +10, headY * tileCount +5, 11, 0, Math.PI*2)
    ctx.fill()

    //eyes
    ctx.fillStyle = `white`
    ctx.beginPath()
    ctx.arc(headX * tileCount +15, headY * tileCount +20, 5, 0, Math.PI*2)
    ctx.fill()
    
    ctx.fillStyle = `black`
    ctx.beginPath()
    ctx.arc(headX * tileCount +15, headY * tileCount +22, 2, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `white`
    ctx.beginPath()
    ctx.arc(headX * tileCount +4, headY * tileCount +20, 5, 0, Math.PI*2)
    ctx.fill()

    ctx.fillStyle = `black`
    ctx.beginPath()
    ctx.arc(headX * tileCount +4, headY * tileCount +22, 2, 0, Math.PI*2)
    ctx.fill()

    
}

//draw snake's tongue
function tongueD () { //down
    ctx.beginPath();
    ctx.moveTo(headX * tileCount+10, headY * tileCount+20);
    ctx.lineTo(headX * tileCount+10, headY * tileCount+10);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(headX * tileCount+13, headY * tileCount+25);
    ctx.lineTo(headX * tileCount+10, headY * tileCount+20);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(headX * tileCount+6, headY * tileCount+25);
    ctx.lineTo(headX * tileCount+10, headY * tileCount+20);
    ctx.strokeStyle = 'red'
    ctx.stroke();
}
function tongueU () { //up
    ctx.beginPath();
    ctx.moveTo(headX * tileCount+10, headY * tileCount-0);
    ctx.lineTo(headX * tileCount+10, headY * tileCount+10);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(headX * tileCount+13, headY * tileCount-05);
    ctx.lineTo(headX * tileCount+10, headY * tileCount-00);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(headX * tileCount+6, headY * tileCount-05);
    ctx.lineTo(headX * tileCount+10, headY * tileCount-00);
    ctx.strokeStyle = 'red'
    ctx.stroke();
}