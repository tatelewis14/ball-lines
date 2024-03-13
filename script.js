import { Effect } from "./Effect.js";
import { Particle } from "./Particle.js";

const canvas = document.getElementById('gc');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
let area = canvas.width * canvas.height;
let particleAmount = area/3000

let particles = []

export const gradient = ctx.createLinearGradient(0,0,canvas.height, canvas.width);
gradient.addColorStop(0, 'white');
gradient.addColorStop(0.5, 'purple');
gradient.addColorStop(1, 'blue');

ctx.fillStyle = gradient
ctx.strokeStyle = 'white'

const effect = new Effect(canvas, ctx)
effect.init(particles, particleAmount)
effect.animate(ctx,particles)