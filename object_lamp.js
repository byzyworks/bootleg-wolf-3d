class LampMesh extends Mesh
{
	constructor(transform)
	{
		var children = [];
		children.push(new Circle(transform, [0.0, -0.0625, 0.0], 0.15, 0.0625, 6, [0, 255, 0]));
		children.push(new CircleExtension(children[0], [0.0, 0.0, 0.0], [0, 255, 0]));
		
		super(children);
	}
}

class Lamp extends GameObject
{
	constructor(transform, deltaTransform)
	{
		var name           = 'lamp';
		var prefab         = new LampMesh(transform);
		var collider       = null;
		var isDynamic      = false;
		var isColliding    = false;
		var isTriggered    = false;
		var isDynamicDelta = false;
		
		super(name, prefab, transform, deltaTransform, collider, isDynamic, isColliding, isTriggered, isDynamicDelta);
	}
}