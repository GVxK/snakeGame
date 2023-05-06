const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
const scoreEl = document.getElementById("score-el")
canvas.width = 852
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
  
    ctx.fillStyle ="rgb(73, 160, 15)"
    for(let i=0; i<snakeParts.length;i++){
        let part = snakeParts[i]
    ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize)
    ctx.strokeStyle = 'yellowgreen';
    ctx.lineWidth = 1;
    ctx.strokeRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize);
    
    }
    snakeParts.push(new snakePart(headX, headY))
    if(snakeParts.length>tailLength){
        snakeParts.shift()
    } 
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

document.body.addEventListener("keydown", keyDown)

function keyDown(event){
    if(event.keyCode == 38) { //up
        
        if (yVelocity == 1){
        yVelocity = 1
        xVelocity = 0
        lastDirection = "down"
        } else {
            yVelocity = -1
            xVelocity = 0 
            lastDirection = "up"
            tongueU()
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
function checkCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random()*(canvas.width/tileCount))
        appleY = Math.floor(Math.random()*(canvas.height/tileCount))
        tailLength++
        getScore()
        for (i=0;i<tailLength*2;i++){
            particlesArray.push(new Particle())
        }
        scoreEl.innerText = `Score: ${score} pts`
    }
}
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
function handleParticles(){
    for(let i = 0; i<particlesArray.length; i++){
        particlesArray[i].update()
        particlesArray[i].draw()
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1)
            i--
        }
    }
}
function animate(){
    hue++
    if (hue>30) {hue = 0}
    handleParticles()
    requestAnimationFrame(animate)
}
animate()

function headR() {
    ctx.fillStyle = `yellowgreen` //right
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

function headL(){
    ctx.fillStyle = `yellowgreen` //left
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
function headU(){
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
function headD() {
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
function tongueD () {
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

function tongueU () {
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