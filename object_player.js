class Player extends GameObject
{
	constructor(transform, deltaTransform)
	{
		var name           = 'player';
		var prefab         = null;
		var collider       = new CylinderCollider(transform);
		var isDynamic      = true;
		var isColliding    = true;
		var isTriggered    = true;
		var isDynamicDelta = true;
		
		super(name, prefab, transform, deltaTransform, collider, isDynamic, isColliding, isTriggered, isDynamicDelta);
		
		this.playerMoveX = 0.0;
		this.playerMoveY = 0.0;
		this.playerMoveZ = 0.0;
		this.playerTurn  = 0.0;
		this.maxhp       = 5
		this.hp          = this.maxhp;
		this.hurt        = 0;
	}
	
	update()
	{
		this.transform.update(this.deltaTransform);
		this.collider.update(this.deltaTransform);
		if (this.hurt > 0 && this.hurt < 8)
		{
			this.hurt++;
		}
		else if (this.hurt >= 8)
		{
			document.getElementById('hurt').style.visibility = 'hidden';
			this.hurt = 0;
		}
	}
	
	updateDelta()
	{
		this.deltaTransform.loc = [this.playerMoveX, this.playerMoveY, -1.0 * this.playerMoveZ];
		this.deltaTransform.rot = [0.0, 2 * Math.PI * this.playerTurn, 0.0];
	}
	
	action(direction)
	{
		var move_sensitivity = 0.5 * this.parentScene.objectSize;
		var turn_sensitivity = 0.02;
		var bullet_speed = this.parentScene.objectSize / 4;
		
		switch (direction)
		{
		case 'turnleft':
			this.playerTurn = -1.0 * turn_sensitivity;
			break;
		case 'turnright':
			this.playerTurn = turn_sensitivity;
			break;
		case 'stopturn':
			this.playerTurn = 0.0;
			break;
		case 'forward':
			this.playerMoveX = move_sensitivity * Math.sin(this.transform.rot[1]);
			this.playerMoveZ = move_sensitivity * Math.cos(this.transform.rot[1]);
			break;
		case 'backward':
			this.playerMoveX = -1.0 * move_sensitivity * Math.sin(this.transform.rot[1]);
			this.playerMoveZ = -1.0 * move_sensitivity * Math.cos(this.transform.rot[1]);
			break;
		case 'stop':
			this.playerMoveX = 0.0;
			this.playerMoveZ = 0.0;
			break;
		case 'strafeleft':
			this.playerMoveX = -1.0 * move_sensitivity * Math.sin(this.transform.rot[1] + (2 * Math.PI * 0.25));
			this.playerMoveZ = -1.0 * move_sensitivity * Math.cos(this.transform.rot[1] + (2 * Math.PI * 0.25));
			break;
		case 'straferight':
			this.playerMoveX = move_sensitivity * Math.sin(this.transform.rot[1] + (2 * Math.PI * 0.25));
			this.playerMoveZ = move_sensitivity * Math.cos(this.transform.rot[1] + (2 * Math.PI * 0.25));
			break;
		case 'moveup':
			this.playerMoveY = move_sensitivity;
			break;
		case 'movedown':
			this.playerMoveY = -1.0 * move_sensitivity;
			break;
		case 'vertstop':
			this.playerMoveY = 0.0;
			break;
		case 'shoot':
			this.parentScene.appendObject(new Bullet(new Transform([this.transform.loc[0], this.transform.loc[1], this.transform.loc[2]], 
			                                                       [2 * Math.PI * 0.75, -1.0 * this.transform.rot[1], 0.0], 
																   [this.parentScene.objectSize / 8, this.parentScene.objectSize / 16, this.parentScene.objectSize / 8]), 
													 new Transform([bullet_speed * Math.sin(this.transform.rot[1]), 0.0, -1.0 * bullet_speed * Math.cos(this.transform.rot[1])],
													               [0.0, 0.0, 0.0],
																   [0.0, 0.0, 0.0]),
													 this));
			break;
		}
	}
	
	collisionAction(other, plane)
	{
		if (other.name != 'bullet')
		{
			GameObject.prototype.collisionAction.call(this, other, plane);
		}
	}
	
	triggerAction(other)
	{
		if (other.name == 'door')
		{
			if (other.transform.rot[1] < 0.125)
			{
				other.deltaTransform.loc[0] = -0.0025;
			}
			else if (other.transform.rot[1] > 0.125)
			{
				other.deltaTransform.loc[2] = 0.0025;
			}
			other.opening = 1;
		}
		else if (other.name == 'soldier')
		{
			this.damage(5);
		}
		else if (other.name == 'objective')
		{
			other.createTexture('elevator2.png');
			this.collider.transform.loc = [0.0, -1.0, 0.0];
			myMain.win = 1;
		}
	}
	
	damage(hp)
	{
		document.getElementById('hurt').style.visibility = 'visible';
		this.hurt = 1;
		
		this.hp -= hp;
		if (this.hp <= 0)
		{
			this.hp = this.maxhp;
			
			this.transform.loc[0]          = (this.parentScene.objectSize * -3) + (this.parentScene.objectSize / 2);
            this.transform.loc[1]          = this.parentScene.objectSize / 2;
			this.transform.loc[2]          = (this.parentScene.objectSize * 25) + (this.parentScene.objectSize / 2);
			this.transform.rot[1]          = 2 * Math.PI * 0.25;
			this.collider.transform.loc[0] = (this.parentScene.objectSize * -3) + (this.parentScene.objectSize / 2);
            this.collider.transform.loc[1] = this.parentScene.objectSize / 2;
			this.collider.transform.loc[2] = (this.parentScene.objectSize * 25) + (this.parentScene.objectSize / 2);
			this.collider.transform.rot[1] = 2 * Math.PI * 0.25;
			
			this.parentScene.destroyActors();
			this.parentScene.createActors();
		}
	}
}