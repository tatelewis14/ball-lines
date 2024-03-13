import { Particle } from "./Particle.js";
import { gradient } from "./script.js";

export class Effect {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.rafId;
        this.stopped = false;
        this.maxDistance = 100;
        this.ctx = ctx;
        this.mouse = {
            x:0,
            y:0,
            isPressed: false,
            radius: 150
        }
        window.addEventListener('mousemove', e=>{
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        })
        window.addEventListener('mousedown', e=>{
            this.mouse.isPressed = true;
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        })
        window.addEventListener('mouseup', e=>{
            this.mouse.isPressed = false;
        })
        window.addEventListener('resize', e=>{
           this.resize(e.target.window.innerWidth, e.target.window.innerHeight, this.ctx)
        })
    }
    init(arr, amount) {
        for(let i = 0; i<amount; i++) {
            let radius = Math.floor(Math.random() * 4 + 1)
            let x = Math.random() * (this.canvas.width - radius*2) + radius;
            let y = Math.random() * (this.canvas.height - radius*2) + radius    
            let vx = (Math.random() - 0.5) * 3;
            let vy = (Math.random() - 0.5) * 3;
            arr.push(new Particle(x,y ,vx, vy, radius,this))
        }
        console.log(arr)
    }
    animate(ctx, arr) {
        const animate = () =>{
            this.rafId = requestAnimationFrame(animate)
            ctx.fillStyle = 'rgba(0,0,0,0.1)'
            ctx.fillRect(0,0, this.width, this.height)
            this.connectParticles(ctx, arr)
            ctx.fillStyle = gradient
            arr.forEach(obj=>{
                obj.draw(ctx)
                obj.update(this.width, this.height)
            })
        }
        animate()


    }
    stop() {
        cancelAnimationFrame(this.rafId)
    }
    connectParticles(ctx, arr) {
        for(let a = 0; a<arr.length; a++) {
            for(let b = a; b<arr.length; b++) {
                let dx = arr[a].x-arr[b].x;
                let dy = arr[a].y-arr[b].y;
                let distance = Math.hypot(dx, dy);
                if(distance<this.maxDistance) {
                    ctx.save()
                    ctx.globalAlpha = 1-(distance/this.maxDistance)
                    ctx.beginPath()
                    ctx.moveTo(arr[a].x, arr[a].y)
                    ctx.lineTo(arr[b].x, arr[b].y)
                    ctx.stroke()
                    ctx.restore()
                }

            }
        }
    }
    resize(width, height, ctx) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        ctx.fillStyle = gradient
        ctx.strokeStyle = 'white'
    }
}
