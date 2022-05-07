class RectangleCollider extends Collider
{	
	collision(other)
	{
		var range  = [(this.transform.scale[0] + other.transform.scale[0]) / 2, (this.transform.scale[1] + other.transform.scale[1]) / 2, (this.transform.scale[2] + other.transform.scale[2]) / 2];
		
		if (this.transform.loc[0] > (other.transform.loc[0] - range[0]) && this.transform.loc[0] < (other.transform.loc[0] + range[0]))
		{
			if (this.transform.loc[1] > (other.transform.loc[1] - range[1]) && this.transform.loc[1] < (other.transform.loc[1] + range[1]))
			{
				if (this.transform.loc[2] > (other.transform.loc[2] - range[2]) && this.transform.loc[2] < (other.transform.loc[2] + range[2]))
				{
					return true;
				}
			}
		}
		
		return false;
	}
}

class BoxCollider extends Collider
{	
	collision(other)
	{
		var range = (this.transform.scale[0] + other.transform.scale[0]) / 2;
		
		if (this.transform.loc[0] > (other.transform.loc[0] - range) && this.transform.loc[0] < (other.transform.loc[0] + range))
		{
			if (this.transform.loc[1] > (other.transform.loc[1] - range) && this.transform.loc[1] < (other.transform.loc[1] + range))
			{
				if (this.transform.loc[2] > (other.transform.loc[2] - range) && this.transform.loc[2] < (other.transform.loc[2] + range))
				{
					return true;
				}
			}
		}
		
		return false;
	}
}

class SphereCollider extends Collider
{
	collision(other)
	{
		var distance = Math.sqrt(Math.pow(this.transform.loc[0] - other.transform.loc[0], 2) + Math.pow(this.transform.loc[1] - other.transform.loc[1], 2) + Math.pow(this.transform.loc[2] - other.transform.loc[2], 2));
		var range    = (this.transform.scale[0] + other.transform.scale[0]) / 2;
		
		if (distance < range)
		{
			return true;
		}
		
		return false;
	}
}

class CylinderCollider extends Collider
{
	collision(other)
	{
		var rangeXZ  = (this.transform.scale[0] + other.transform.scale[0]) / 2;
		var rangeY   = (this.transform.scale[1] + other.transform.scale[1]) / 2;
		var distance = Math.sqrt(Math.pow(this.transform.loc[0] - other.transform.loc[0], 2) + Math.pow(this.transform.loc[2] - other.transform.loc[2], 2));
		
		if (distance < rangeXZ)
		{
			if (this.transform.loc[1] > (other.transform.loc[1] - rangeY) && this.transform.loc[1] < (other.transform.loc[1] + rangeY))
			{
				return true;
			}
		}
		
		return false;
	}
}

class PointCollider extends Collider
{	
	collision(other)
	{
		var distance = Math.sqrt(Math.pow(this.transform.loc[0] - other.transform.loc[0], 2) + Math.pow(this.transform.loc[1] - other.transform.loc[1], 2) + Math.pow(this.transform.loc[2] - other.transform.loc[2], 2));
		var range    = other.transform.scale[0] / 2;
		
		if (distance < range)
		{
			return true;
		}
		
		return false;
	}
}