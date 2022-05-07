class WorldBorder extends GameObject
{
	constructor(point1, point2)
	{
		var name           = 'worldborder';
		var prefab         = null;
		var transform      = null;
		var deltaTransform = null;
		var collider       = new WorldBorderCollider(point1, point2);
		
		var isDynamic      = false;
		var isColliding    = true;
		var isTriggered    = false;
		var isDynamicDelta = false;
		
		super(name, prefab, transform, deltaTransform, collider, isDynamic, isColliding, isTriggered, isDynamicDelta);
	}
}

class WorldBorderCollider extends Collider
{
	constructor(point1, point2)
	{
		var transform = new Transform([0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]);
		
		super(transform);
		
		this.negX = point1[0];
		this.negY = point1[1];
		this.negZ = point1[2];
		this.posX = point2[0];
		this.posY = point2[1];
		this.posZ = point2[2];
	}
	
	collision(other)
	{
		if (other.transform.loc[0] < this.negX || other.transform.loc[0] > this.posX)
		{
			return true;
		}
		else
		{
			if (other.transform.loc[1] < this.negY || other.transform.loc[1] > this.posY)
			{
				return true;
			}
			else
			{
				if (other.transform.loc[2] < this.negZ || other.transform.loc[2] > this.posZ)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		}
	}
}