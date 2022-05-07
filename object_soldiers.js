class Soldier1Mesh extends Mesh
{
	constructor(transform)
	{
		var triangles = [];
		
		triangles.push(new Quad(transform, [-0.5, -0.5, 0.0], [-0.5, 0.5, 0.0], [0.5, 0.5, 0.0], [0.5, -0.5, 0.0], 'soldier1-1.png'));
		
		super(triangles);
	}
}

class Soldier1 extends GameObject
{
	constructor(transform, deltaTransform)
	{
		var name           = 'soldier';
		var prefab         = new Soldier1Mesh(transform);
		var collider       = new CylinderCollider(new Transform(transform.loc, transform.rot, [transform.scale[0] / 2, transform.scale[1], transform.scale[2] / 2]));
		var isDynamic      = true;
		var isColliding    = true;
		var isTriggered    = true;
		var isDynamicDelta = false;
		
		super(name, prefab, transform, deltaTransform, collider, isDynamic, isColliding, isTriggered, isDynamicDelta);
		
		this.maxhp     = 1;
		this.hp        = this.maxhp;
		this.animation = 0;
		
		this.loadImage('soldier1-1.png');
		this.loadImage('soldier1-2.png');
		this.loadImage('soldier1-3.png');
		this.loadImage('soldier1-4.png');
		this.loadImage('soldier1-5.png');
		this.loadImage('soldier3-1.png');
		this.loadImage('soldier3-2.png');
		this.loadImage('soldier3-3.png');
		this.loadImage('soldier3-4.png');
		this.loadImage('soldier3-5.png');
	}
	
	collisionAction(other, plane)
	{
		if (other.name != 'bullet')
		{
			this.deltaTransform.loc[plane] *= -1;
		}
	}
	
	triggerAction(other)
	{
		if (other.name == 'player')
		{
			other.damage(5);
		}
	}
	
	update()
	{
		GameObject.prototype.update.call(this);
		
		var temp = normalize(difference(this.transform.loc, myMain.player.transform.loc));
		this.transform.rot[1] = Math.atan2(temp[0], temp[2]);
		
		if (this.animation >= 0 && this.animation < 5)
		{
			if (this.animation == 0)
			{
				this.createTexture('soldier1-1.png');
				this.animation++;
			}
			else if (this.animation == 1)
			{
				this.createTexture('soldier1-2.png');
				this.animation++;
			}
			else if (this.animation == 2)
			{
				this.createTexture('soldier1-3.png');
				this.animation++;
			}
			else if (this.animation == 3)
			{
				this.createTexture('soldier1-4.png');
				this.animation++;
			}
			else if (this.animation == 4)
			{
				this.createTexture('soldier1-5.png');
				this.animation = 0;
			}
		}
		if (this.animation >= 9 && this.animation < 14)
		{
			if (this.animation == 9)
			{
				this.createTexture('soldier3-1.png');
				this.animation++;
			}
			else if (this.animation == 10)
			{
				this.createTexture('soldier3-2.png');
				this.animation++;
			}
			else if (this.animation == 11)
			{
				this.createTexture('soldier3-3.png');
				this.animation++;
			}
			else if (this.animation == 12)
			{
				this.createTexture('soldier3-4.png');
				this.animation++;
			}
			else if (this.animation == 13)
			{
				this.createTexture('soldier3-5.png');
				this.animation++;
				this.deleteSelf();
			}
		}
	}
	
	damage(hp)
	{
		this.hp -= hp;
		if (this.hp <= 0)
		{
			this.deltaTransform.loc = [0.0, 0.0, 0.0];
			this.animation = 9;
		}
	}
}

class Soldier2Mesh extends Mesh
{
	constructor(transform)
	{
		var triangles = [];
		
		triangles.push(new Quad(transform, [-0.5, -0.5, 0.0], [-0.5, 0.5, 0.0], [0.5, 0.5, 0.0], [0.5, -0.5, 0.0], 'soldier1-1.png'));
		
		super(triangles);
	}
}

class Soldier2 extends Soldier1
{
	collisionAction(other, plane)
	{
		if (other.name != 'bullet')
		{
			this.deltaTransform.loc[plane] *= -1.0;
			
			var soldierSpeed = myMain.scene.objectSize / 6;
			
			var temp = [];
			if (this.deltaTransform.loc[0] > 0.0)
			{
				temp.push(Math.random());
			}
			else
			{
				temp.push(-1.0 * Math.random());
			}
			temp.push(0.0);
			if (this.deltaTransform.loc[2] > 0.0)
			{
				temp.push(Math.random());
			}
			else
			{
				temp.push(-1.0 * Math.random());
			}
			var temp = normalize(temp);
			
			this.deltaTransform.loc[0] = soldierSpeed * temp[0];
			this.deltaTransform.loc[2] = soldierSpeed * temp[2];
		}
	}
}

class Soldier3Mesh extends Mesh
{
	constructor(transform)
	{
		var triangles = [];
		
		triangles.push(new Quad(transform, [-0.5, -0.5, 0.0], [-0.5, 0.5, 0.0], [0.5, 0.5, 0.0], [0.5, -0.5, 0.0], 'soldier1-1.png'));
		
		super(triangles);
	}
}

class Soldier3 extends Soldier2
{
	constructor(transform, deltaTransform)
	{
		super(transform, deltaTransform);
		
		this.loadImage('soldier2-1.png');
		this.loadImage('soldier2-2.png');
		this.loadImage('soldier2-3.png');
	}
	
	update()
	{
		Soldier1.prototype.update.call(this);
		if (Math.floor(Math.random() * 16) == 0 || (this.animation >= 5 && this.animation < 9))
		{
			if (this.animation < 5)
			{
				this.createTexture('soldier2-1.png');
				this.animation = 5;
			}
			else if (this.animation == 5)
			{
				this.createTexture('soldier2-2.png');
				this.animation++;
			}
			else if (this.animation == 6)
			{
				this.createTexture('soldier2-3.png');
				this.animation++;
				var bullet_speed = this.parentScene.objectSize / 4;
				this.parentScene.appendObject(new Bullet(new Transform([this.transform.loc[0], this.transform.loc[1], this.transform.loc[2]], 
			                                                       [2 * Math.PI * 0.75, this.transform.rot[1], 0.0], 
																   [this.parentScene.objectSize / 8, this.parentScene.objectSize / 16, this.parentScene.objectSize / 8]), 
													 new Transform([-1.0 * bullet_speed * Math.sin(this.transform.rot[1]), 0.0, -1.0 * bullet_speed * Math.cos(this.transform.rot[1])],
													               [0.0, 0.0, 0.0],
																   [0.0, 0.0, 0.0]),
													 this));
			}
			else if (this.animation == 7)
			{
				this.createTexture('soldier2-2.png');
				this.animation++;
			}
			else if (this.animation == 8)
			{
				this.createTexture('soldier2-1.png');
				this.animation = 0;
			}
		}
	}
}