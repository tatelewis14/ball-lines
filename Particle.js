export class Particle {
    constructor(x,y, vx, vy, radius, effect) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.effect = effect;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.95
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        ctx.fill()
    }
    update(width, height) {
        if(this.effect.mouse.isPressed) {
            const dx = this.x-this.effect.mouse.x;
            const dy = this.y - this.effect.mouse.y
            const distance = Math.hypot(dx, dy);
            const force = this.effect.mouse.radius/distance
            if(distance<this.effect.mouse.radius) {
                const angle = Math.atan2(dy, dx)
                this.pushX += Math.cos(angle) * force
                this.pushY += Math.sin(angle) * force
            }
        }

        this.x+=this.vx +(this.pushX*=this.friction);
        this.y+= this.vy + (this.pushY*=this.friction);
         
        if(this.x<this.radius) {
            this.x = this.radius;
            this.vx *= -1
        } else if(this.x > this.effect.width - this.radius) {
            this.x = this.effect.width-this.radius;
            this.vx *= -1
        }
        if(this.y<this.radius) {
            this.y = this.radius;
            this.vy *= -1
        } else if(this.y > this.effect.height - this.radius) {
            this.y = this.effect.height-this.radius;
            this.vy *= -1
        }

        
    }
}