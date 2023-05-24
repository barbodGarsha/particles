const canvas = document.getElementById('canvas01')
const ctx = canvas.getContext('2d')

canvas.width = canvas.parentElement.clientWidth
canvas.height = canvas.parentElement.clientHeight

let particlesArr = []

// handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 150
}

window.addEventListener('mousemove', function(e) {
    mouse.x = e.x
    mouse.y = e.y
})


class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 3
        this.baseX = this.x
        this.baseY = this.y
        this.density = ((Math.random() * 30) + 1)
    }

    draw() {
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }

    update() {
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt((dx * dx) + (dy * dy))

        let forDirectionX = dx / distance
        let forDirectionY = dy / distance

        let maxDistance = mouse.radius

        let force = (maxDistance - distance) / maxDistance

        let changeX = forDirectionX * force * this.density
        let changeY = forDirectionY * force * this.density

        if(distance < 150) {
            this.x -= changeX
            this.y -= changeY
        }
        else {
            if(this.x != this.baseX) {
                let dx = this.x - this.baseX
                this.x -= dx/8
            }
            if(this.y != this.baseY) {
                let dy = this.y - this.baseY
                this.y -= dy/8
            }
        }
    }
}

function init() {
    particlesArr = []

   
    /* for (let i = 0; i < 500; i++) {
        let x = Math.random() * canvas.width
        let y = Math.random() * canvas.height
        particlesArr.push(new Particle(x, y))   
    }
    */
   
    for (let i = 0; i < canvas.width; i+=50) {
        for (let j = 0; j < canvas.height; j+=50) {
            particlesArr.push(new Particle(i, j))   
        }
    }
    
}

init()

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].draw()
        particlesArr[i].update()
    }
    requestAnimationFrame(animate)
}

animate()