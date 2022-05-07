class Box extends GameObject
{
	constructor(transform, deltaTransform, color, texturePath)
	{
		var name      = 'box';
		var prefab    = new BoxMesh(transform, color, texturePath);
		var collider  = new BoxCollider(transform);
		
		super(name, prefab, transform, deltaTransform, collider);
	}
}

class Objective extends GameObject
{
	constructor(transform, deltaTransform, color)
	{
		var name           = 'objective';
		var prefab         = new BoxMesh(transform, color, 'elevator.png');
		var collider       = new BoxCollider(transform);
		
		super(name, prefab, transform, deltaTransform, collider);
		
		this.loadImage('elevator2.png');
	}
}

class Hinge extends GameObject
{
	constructor(transform, deltaTransform, color, texturePath)
	{
		var name        = 'hinge';
		var prefab      = new HingeMesh(transform, color, texturePath);
		var collider    = null;
		var isDynamic   = false;
		var isColliding = false;
		
		super(name, prefab, transform, deltaTransform, collider, isDynamic, isColliding);
	}
}

class Door extends GameObject
{
	constructor(transform, deltaTransform, color, texturePath)
	{
		var name           = 'door';
		var prefab         = new DoorMesh(transform, color, texturePath);
		var collider       = new BoxCollider(transform);
		var isDynamic      = true;
		var isColliding    = true;
		
		super(name, prefab, transform, deltaTransform, collider, isDynamic, isColliding);
		
		this.opening = 0;
	}
	
	collisionAction(other, plane)
	{
	}
	
	update()
	{
		GameObject.prototype.update.call(this);
		if (this.opening > 0)
		{
			if (this.opening < 16)
			{
				this.opening++;
			}
			else
			{
				this.deleteSelf();
			}
		}
	}
}

class Air extends GameObject
{
	constructor()
	{
		var name           = null;
		var prefab         = null;
		var transform      = null;
		var deltaTransform = null;
		var collider       = null;
		var isDynamic      = false;
		var isColliding    = false;
		
		super(name, prefab, transform, deltaTransform, collider, isDynamic, isColliding);
	}
}

class Voxels extends ScenePart
{
	constructor(stride, yStart, height, mapRaw)
	{
		var map    = [];
		var lights = [];
		
		var blockSize = 2 / stride;
		var i;
		var j;
		var k;
		for (i = 0; i < height; i++)
		{
			for (j = 0; j < stride; j++)
			{
				for (k = 0; k < stride; k++)
				{
					switch (mapRaw[(i * stride * stride) + (j * stride) + k])
					{
					case 0:
						map.push(new Air());
						break;
					case 1:
						map.push(new Box(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 0.0, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9],
									 'wall.png'));
						break;
					case 2:
						map.push(new Box(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 0.0, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9],
									 'wall2.png'));
						break;
					case 3:
						map.push(new Box(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 0.0, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9],
									 'wall3.png'));
						break;
					case 4:
						map.push(new Box(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 0.0, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9],
									 'wall4.png'));
						break;
					case 5:
						map.push(new Box(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 0.0, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9],
									 'wall5.png'));
						break;
					case 6:
						map.push(new Hinge(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 2 * Math.PI * 0.25, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9]));
						map.push(new Door(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 2 * Math.PI * 0.25, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9]));
						break;
					case 7:
						map.push(new Hinge(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 0.0, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9]));
						map.push(new Door(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 0.0, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9]));
						break;
					case 8:
						map.push(new Box(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 0.0, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9],
									 'elevatorsides.png'));
						break;
					case 9:
						map.push(new Objective(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 0.0, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9]));
						break;
					case 10:
						map.push(new Lamp(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + blockSize + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 0.0, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0])));
						lights.push((k * blockSize) + (blockSize / 2) - 1);
						lights.push((i * blockSize) + yStart);
						lights.push((j * blockSize) + (blockSize / 2) - 1);
						break;
					case 11:
						map.push(new Hinge(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 2 * Math.PI * 0.25, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9]));
						map.push(new Door(new Transform([(k * blockSize) + (blockSize / 2) - 1,
													(i * blockSize) + (blockSize / 2) + yStart, 
													(j * blockSize) + (blockSize / 2) - 1], 
												   [0.0, 2 * Math.PI * 0.25, 0.0],
												   [blockSize, blockSize, blockSize]),
									 new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]),
									 [0.9, 0.9, 0.9],
									 'elevatordoor.png'));
						break;
					}
				}	
			}
		}
		
		super(map);
		
		this.stride = stride;
		this.yStart = yStart;
		this.height = height;
		this.mapRaw = mapRaw;
		this.lights = lights;
	}
}