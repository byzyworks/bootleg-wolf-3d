class BulletMesh extends Mesh
{
	constructor(transform)
	{
		var children = [];
		children.push(new Circle(transform, [0.0, -0.5, 0.0], 0.1, 0.1, 6, [255, 255, 255]));
		children.push(new Circle(transform, [0.0, 0.5, 0.0], 0.1, 0.1, 6, [255, 255, 255], true));
		children.push(new Prism(transform, children[0], children[1]));
		
		super(children);
	}
}

class Bullet extends GameObject
{
	constructor(transform, deltaTransform, creator)
	{
		var name           = 'bullet';
		var prefab         = new BulletMesh(transform);
		var collider       = new CylinderCollider(transform);
		var isDynamic      = true;
		var isColliding    = true;
		var isTriggered    = true;
		var isDynamicDelta = false;
		
		super(name, prefab, transform, deltaTransform, collider, isDynamic, isColliding, isTriggered, isDynamicDelta);
		
		this.creator = creator;
	}
	
	collisionAction(other)
	{
	}
	
	triggerAction(other)
	{
		if (other.id != this.creator.id)
		{
			this.deleteSelf();
			if (other.name == 'soldier' || other.name == 'player')
			{
				other.damage(1);
			}
		}
	}
}