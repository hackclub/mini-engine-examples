import { Engine } from "./Engine.js";

const container = document.body;
const c = document.querySelector("canvas");
c.width = container.clientWidth;
c.height = container.clientHeight;

const e = new Engine(c);
const ctx = e.ctx;


e.add({
	tags: ["floor", "platform"],
	solid: true,
	x: 150,
	y: 500,
	vx: 1,
	bounce: .3,
	draw: (obj) => {
		ctx.fillStyle = obj.collides("player") ? "red" : "blue";
		ctx.fillRect(obj.x, obj.y, 100, 100)

		if (obj.collides("wall", 1)) obj.vx *= -1
	},
})

e.add({
	tags: ["floor", "platform"],
	solid: true,
	// solidTo: ["wall", "player"],
	x: 150,
	y: 300,
	// vx: 2,
	vx: 1,
	// vy: -1,
	bounce: .3,
	draw: (obj) => {
		ctx.fillStyle = obj.collides("player") ? "red" : "blue";
		ctx.fillRect(obj.x, obj.y, 100, 100)
		// obj.vy -= 0.3;

		// if (obj.collides("wall", 1)) obj.vy *= -1
		if (obj.collides("wall", 1)) obj.vx *= -1
		// if (obj.x < 0) obj.vx = 2;
		// console.log(obj.dx, obj.dy);
	},
})

e.add({
	tags: ["player"],
	solid: true,
	// solidTo: ["floor", "tiny"],
	x: 300,
	y: 100,
	// ay: 1,
	// mass: 1000,
	// bounce: 0.2,
	// bounce: .3,
	draw: (obj) => {

		ctx.fillStyle = obj.collides("platform", { bottom: 3 }) ? "red" : "blue";
		ctx.fillRect(obj.x, obj.y, 50, 50)

		// if (obj.collides("tiny")) e.remove("big");


		obj.ay = 2;

		// standing
		e.get("platform").forEach(x => {
			if (obj.collides(x, { bottom: 3 })) obj.vx = x.vx;
		})

		if (e.pressedKey("ArrowUp") && obj.collides("floor", { bottom: 3 })) obj.vy -= 40;
		if (e.heldKey("ArrowDown")) obj.y += 3;
		if (e.heldKey("ArrowLeft")) obj.translate(-3, 0);
		if (e.heldKey("ArrowRight")) obj.translate(3, 0);



		// obj.ay = 0.5;
	},
})

e.add({
	tags: ["wall", "floor"],
	solid: true,
	x: 0,
	y: 600,
	draw: (obj) => {
		ctx.fillStyle = "green";
		ctx.fillRect(obj.x, obj.y, 1000, 1000)
	},
})

e.add({
	tags: ["wall"],
	solid: true,
	x: 20,
	y: 0,
	width: 100,
	height: 1000,
	draw: (obj) => {
		ctx.fillStyle = "purple";
		ctx.fillRect(obj.x, obj.y, 100, 1000)
	},
})

e.add({
	tags: ["wall"],
	solid: true,
	x: 400,
	y: 0,
	draw: (obj) => {
		ctx.fillStyle = "lightblue"
		ctx.fillRect(obj.x, obj.y, 10, 500)
	},
})

e.add({
	tags: ["wall"],
	solid: true,
	x: 0,
	y: 0,
	// vy: 1,
	draw: (obj) => {
		ctx.fillStyle = obj.collides("player") ? "red" : "blue";
		ctx.fillRect(obj.x, obj.y, 1000, 4)
	},
})


e.add({
	tags: ["wall"],
	solid: true,
	x: 500,
	y: 0,
	draw: (obj) => {
		ctx.fillStyle = obj.collides("player") ? "red" : "blue";
		ctx.fillRect(obj.x, obj.y, 10, 1000)
	},
})

e.start();