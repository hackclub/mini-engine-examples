# A Tiny Game Engine for Tiny Games

Here is a set of minimal examples using a tiny game engine for JavaScript canvas. Compose them for magic.

To initialize the engine:
```javascript
const e = new Engine(canvas);
const ctx = e.ctx;
```

To add an object:
```javascript
e.add({
	x: 150,
	y: 150,
	draw: (obj) => { // this initialized object is passed to the draw function
		ctx.fillStyle = "blue";
		ctx.fillRect(obj.x, obj.y, 20, 20)
	},
})
```

Objects have a number of optional parameters.
```javascript
e.add({
	tags: ["square"], // used for detecting collisions and removing objects
	x: 150,
	y: 150,
	vx: 0,
	vy: 0,
	ax: 0,
	ay: 0,
	bounce: 0,
	solid: false,
	width: 0, // gets from bounding box of initial drawing
	height: 0, // gets from bounding box of initial drawing
	dx: 0, // x movement from last frame
	dy: 0, // y movement from last frame
	draw: (obj) => {
		ctx.fillStyle = "blue";
		ctx.fillRect(obj.x, obj.y, 20, 20)
	},
})
```


To detect a collision:
```javascript
e.add({
	tags: ["red"],
	x: 150,
	y: 130,
	draw: (obj) => {
		ctx.fillStyle = "red";
		ctx.fillRect(obj.x, obj.y, 50, 50)
	},
})

e.add({
	tags: ["player"],
	x: 150,
	y: 150,
	draw: (obj) => {
		ctx.fillStyle = obj.collides("red") ? "orange" : "blue";
		ctx.fillRect(obj.x, obj.y, 50, 50)
	},
})
```

The `collides` method can also take a buffer number like so:
```javascript
e.add({
	tags: ["red"],
	x: 150,
	y: 130,
	draw: (obj) => {
		ctx.fillStyle = "red";
		ctx.fillRect(obj.x, obj.y, 50, 50)
	},
})

e.add({
	tags: ["player"],
	x: 150,
	y: 150,
	draw: (obj) => {
		const buffer = 5;
		ctx.fillStyle = obj.collides("red", buffer) ? "orange" : "blue";
		ctx.fillRect(obj.x, obj.y, 50, 50)
	},
})
```

or a buffer object like so:
```javascript
e.add({
	tags: ["red"],
	x: 150,
	y: 130,
	draw: (obj) => {
		ctx.fillStyle = "red";
		ctx.fillRect(obj.x, obj.y, 50, 50)
	},
})

e.add({
	tags: ["player"],
	x: 150,
	y: 150,
	draw: (obj) => {
		const buffer = { left: 3, right: 3, top: 5, bottom: 7}
		ctx.fillStyle = obj.collides("red", buffer) ? "orange" : "blue";
		ctx.fillRect(obj.x, obj.y, 50, 50)
	},
})
```

You can detect key presses like so:
```javascript
e.add({
	tags: ["red"],
	x: 150,
	y: 130,
	draw: (obj) => {
		ctx.fillStyle = "red";
		ctx.fillRect(obj.x, obj.y, 50, 50)

		if (pressedKey("ArrowLeft")) x += 4;
	},
})
```


and held keys like so:
```javascript
e.add({
	tags: ["red"],
	x: 150,
	y: 130,
	draw: (obj) => {
		ctx.fillStyle = "red";
		ctx.fillRect(obj.x, obj.y, 50, 50)

		if (heldKey("ArrowLeft")) x += 4;
	},
})
```

You can access the current frame with the engine `step` property:
```javascript
e.add({
	tags: ["red"],
	x: 150,
	y: 130,
	draw: (obj) => {
		ctx.fillStyle = "red";
		ctx.fillRect(obj.x, obj.y, 50, 50)

		obj.x = e.step % e.width;
	},
})
```

The engine itself also has a number of useful properties:
```javascript
e.width
e.height
```

Use the `remove` property with a tag or obj to remove an object:
```javascript
e.add({
	tags: ["red"],
	x: 150,
	y: 130,
	draw: (obj) => {
		ctx.fillStyle = "red";
		ctx.fillRect(obj.x, obj.y, 50, 50)

		if (e.step > 200) e.remove("red")
		// or 
		// if (e.step > 200) e.remove(obj)
	},
})
```

To end the engine main draw loop use:
```javascript
e.end();
```

