class SimpleFloorMesh extends Mesh
{
	constructor(transform, y, color)
	{
		var children = [];
		children.push(new Quad(transform, [1.0, y, 1.0], [1.0, y, -1.0], [-1.0, y, -1.0], [-1.0, y, 1.0], null, color));
		
		super(children);
	}
}

class SimpleFloor extends GameObject
{
	constructor(transform, deltaTransform, y, color)
	{
		var name           = 'floor';
		var prefab         = new SimpleFloorMesh(transform, y, color);
		var collider       = null;
		var isDynamic      = false;
		var isColliding    = false;
		
		super(name, prefab, transform, deltaTransform, collider, isDynamic, isColliding);
	}
}

class SimpleWallsMesh extends Mesh
{
	constructor(transform, yStart, yEnd, color)
	{
		var children = [];
		children.push(new Quad(transform, [-1.0, yStart, 1.0], [-1.0, yEnd, 1.0], [1.0, yEnd, 1.0], [1.0, yStart, 1.0]));
		children.push(new Quad(transform, [1.0, yStart, 1.0], [1.0, yEnd, 1.0], [1.0, yEnd, -1.0], [1.0, yStart, -1.0]));
		children.push(new Quad(transform, [1.0, yStart, -1.0], [1.0, yEnd, -1.0], [-1.0, yEnd, -1.0], [-1.0, yStart, -1.0]));
		children.push(new Quad(transform, [-1.0, yStart, -1.0], [-1.0, yEnd, -1.0], [-1.0, yEnd, 1.0], [-1.0, yStart, 1.0]));
		
		super(children);
	}
}

class SimpleWalls extends GameObject
{
	constructor(transform, deltaTransform, yStart, yEnd, color)
	{
		var name           = 'walls';
		var prefab         = new SimpleWallsMesh(transform, yStart, yEnd, color);
		var collider       = null;
		var isDynamic      = false;
		var isColliding    = false;
		
		super(name, prefab, transform, deltaTransform, collider, isDynamic, isColliding);
	}
}