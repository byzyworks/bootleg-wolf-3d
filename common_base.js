class Transform
{
	constructor(loc = [0.0, 0.0, 0.0], rot = [0.0, 0.0, 0.0], scale = [1.0, 1.0, 1.0])
	{
		this.loc                   = loc;
		this.rot                   = rot;
		this.scale                 = scale;
		this.world                 = [];
		this.worldInverseTranspose = [];
		
		this.updateWorldMatrix();
	}
	
	update(deltaTransform)
	{
		this.loc[0] += deltaTransform.loc[0];
		this.loc[1] += deltaTransform.loc[1];
		this.loc[2] += deltaTransform.loc[2];
		
		this.rot[0] += deltaTransform.rot[0];
		this.rot[1] += deltaTransform.rot[1];
		this.rot[2] += deltaTransform.rot[2];
		
		this.scale[0] += deltaTransform.scale[0];
		this.scale[1] += deltaTransform.scale[1];
		this.scale[2] += deltaTransform.scale[2];
		
		this.updateWorldMatrix();
	}
	
	updateWorldMatrix()
	{
		this.world                 = m4.scale(m4.identity(), this.scale);
		this.world                 = m4.rotateX(this.world, this.rot);
		this.world                 = m4.rotateY(this.world, this.rot);
		this.world                 = m4.rotateZ(this.world, this.rot);
		this.world                 = m4.translate(this.world, this.loc);
		
		this.worldInverseTranspose = m4.inverse(this.world);
		this.worldInverseTranspose = m4.transpose(this.worldInverseTranspose);
	}
	
	static copy(srcTransform)
	{
		var destTransform = new Transform();
		
		destTransform.loc[0] = srcTransform.loc[0];
		destTransform.loc[1] = srcTransform.loc[1];
		destTransform.loc[2] = srcTransform.loc[2];
		
		destTransform.rot[0] = srcTransform.rot[0];
		destTransform.rot[1] = srcTransform.rot[1];
		destTransform.rot[2] = srcTransform.rot[2];
		
		destTransform.scale[0] = srcTransform.scale[0];
		destTransform.scale[1] = srcTransform.scale[1];
		destTransform.scale[2] = srcTransform.scale[2];
		
		destTransform.updateWorldMatrix();
		
		return destTransform;
	}
}

class Shape
{
	constructor(vertices, transform, type, count, texturePath = null, color = null)
	{
		this.transform    = transform;
		this.vertices     = vertices;
		this.vertexBuffer = gl.createBuffer();
		this.type         = type;
		this.count        = count;
		this.texture      = gl.createTexture();
		this.images       = [];
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		
		this.createTexture(texturePath, color);
		
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	}
	
	loadImage(path)
	{
		this.images[path] = new Image();
		this.images[path].src = path;
	}
	
	createTexture(texturePath = null, color = null)
	{
		if (texturePath)
		{
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
						  new Uint8Array([0, 0, 255, 255]));
			
			var shape = this;
			if (this.images[texturePath])
			{
				loadTexture.call(shape, texturePath);
			}
			else
			{
				this.images[texturePath] = new Image();
				this.images[texturePath].src = texturePath;
				this.images[texturePath].addEventListener('load', function()
				{
					loadTexture.call(shape, texturePath);
				});
			}
		}
		else
		{
			if (color)
			{
				gl.bindTexture(gl.TEXTURE_2D, this.texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
							  new Uint8Array([color[0], color[1], color[2], 255]));
			}
			else
			{
				gl.bindTexture(gl.TEXTURE_2D, this.texture);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
							  new Uint8Array([0, 0, 255, 255]));
			}
		}
	}
	
	render(programInfo)
	{
		gl.uniformMatrix4fv(programInfo.uniforms['u_world'], false, new Float32Array(this.transform.world));
		gl.uniformMatrix4fv(programInfo.uniforms['u_worldInverseTranspose'], false, new Float32Array(this.transform.worldInverseTranspose));
		gl.uniformMatrix4fv(programInfo.uniforms['u_worldViewProjection'], false, new Float32Array(this.transform.worldInverseTranspose));
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
		
		var size;
		var type;
		var normalize;
		var stride;
		var offset;
		
		size              = 3;
		type              = gl.FLOAT;
		normalize         = false;
		stride            = 8 * Float32Array.BYTES_PER_ELEMENT;
		offset            = 0 * Float32Array.BYTES_PER_ELEMENT;
		gl.enableVertexAttribArray(programInfo.attributes['a_vertexPosition']);
		gl.vertexAttribPointer(programInfo.attributes['a_vertexPosition'], size, type, normalize, stride, offset);
		
		size              = 3;
		type              = gl.FLOAT;
		normalize         = false;
		stride            = 8 * Float32Array.BYTES_PER_ELEMENT;
		offset            = 3 * Float32Array.BYTES_PER_ELEMENT;
		gl.enableVertexAttribArray(programInfo.attributes['a_vertexNormal']);
		gl.vertexAttribPointer(programInfo.attributes['a_vertexNormal'], size, type, normalize, stride, offset);
		
		size              = 2;
		type              = gl.FLOAT;
		normalize         = false;
		stride            = 8 * Float32Array.BYTES_PER_ELEMENT;
		offset            = 6 * Float32Array.BYTES_PER_ELEMENT;
		gl.enableVertexAttribArray(programInfo.attributes['a_vertexTexCoords']);
		gl.vertexAttribPointer(programInfo.attributes['a_vertexTexCoords'], size, type, normalize, stride, offset);
		
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.uniform1i(programInfo.uniforms['u_texture'], 0);
		
		offset = 0;
		gl.drawArrays(this.type, offset, this.count);
	}
}

class Mesh
{
	constructor(children)
	{
		var descendents = [];
		
		var child;
		for (child of children)
		{
			if (child.children)
			{
				var grandchild;
				for (grandchild of child.children)
				{
					descendents.push(grandchild);
				}
				child.children = [];
			}
			else
			{
				descendents.push(child);
			}
		}
		
		this.children = descendents;
	}
	
	loadImage(path)
	{
		var child;
		for (child of this.children)
		{
			child.loadImage(path);
		}
	}
	
	createTexture(texturePath = null, color = null)
	{
		var child;
		for (child of this.children)
		{
			child.createTexture(texturePath, color);
		}
	}
	
	render(program)
	{
		var child;
		for (child of this.children)
		{
			child.render(program);
		}
	}
}

class Collider
{
	constructor(transform)
	{
		this.transform = Transform.copy(transform);
	}
	
	update(deltaTransform)
	{
		this.transform.update(deltaTransform);
	}
	
	collision(other)
	{
		console.error('collision() not implemented for class \"' + this.constructor.name + '\". Is isColliding enabled from parenting GameObject class?');
	}
	
	static copy(srcCollider)
	{
		console.error('copy() not implemented for class \"' + this.constructor.name + '\".');
	}
}

class GameObject
{
	constructor(name, prefab, transform, deltaTransform, collider, isDynamic = false, isColliding = true, isTriggered = false, isDynamicDelta = false, isBillboard = false)
	{
		this.parentScene;
		this.id;
		this.name           = name;
		this.prefab         = prefab;
		this.transform      = transform;
		this.deltaTransform = deltaTransform;
		this.collider       = collider;
		this.isDynamic      = isDynamic;
		this.isColliding    = isColliding;
		this.isTriggered    = isTriggered;
		this.isDynamicDelta = isDynamicDelta;
		this.isBillboard    = isBillboard;
	}
	
	loadImage(path)
	{
		this.prefab.loadImage(path);
	}
	
	createTexture(texturePath = null, color = null)
	{
		this.prefab.createTexture(texturePath, color);
	}
	
	update()
	{
		this.transform.update(this.deltaTransform);
		this.collider.update(this.deltaTransform);
	}
	
	render(program)
	{
		this.prefab.render(program);
	}
	
	updateDelta()
	{
		console.error('updateDelta() not implemented for class \"' + this.constructor.name + '\". Is isDynamicDelta enabled?');
	}
	
	updateCollider(other)
	{
		var isTriggeredAlready = false;
		var i;
		for (i in this.collider.transform.loc)
		{
			this.collider.transform.loc[i] += this.deltaTransform.loc[i];
			if (this.collider.collision(other.collider) || other.collider.collision(this.collider))
			{
				this.collider.transform.loc[i] -= this.deltaTransform.loc[i];
				this.collisionAction(other, i);
				if (this.isTriggered && !isTriggeredAlready)
				{
					this.triggerAction(other);
					isTriggeredAlready = true;
				}
			}
			else
			{
				this.collider.transform.loc[i] -= this.deltaTransform.loc[i];
			}
		}
	}
	
	collisionAction(other, plane)
	{
		this.deltaTransform.loc[plane] = 0.0;
	}
	
	triggerAction(other)
	{
		console.error('triggerAction() not implemented for class \"' + this.constructor.name + '\". Is isTriggered enabled?');
	}
	
	deleteSelf()
	{
		this.parentScene.deleteObject(this.id);
	}
	
	append(scene)
	{
		scene.appendObject(this);
	}
}

class ScenePart
{
	constructor(gameObjects)
	{
		this.gameObjects = gameObjects;
	}
}

class Scene
{
	constructor(gameObjects, objectSize, lights, sprites)
	{
		this.gameObjects                 = [];
		this.gameObjects['all']          = [];
		this.gameObjects['visual']       = [];
		this.gameObjects['solid']        = [];
		this.gameObjects['trigger']      = [];
		this.gameObjects['dynamic']      = [];
		this.gameObjects['dynamic2']     = [];
		this.gameObjects['dynamicSolid'] = [];
		this.gameObjects['staticSolid']  = [];
		this.gameObjects['actors']       = [];
		this.idCtr                       = 0;
		this.objectQueue                 = [];
		this.objectQueue['append']       = [];
		this.objectQueue['delete']       = [];
		this.objectSize                  = objectSize;
		this.lights                      = lights;
		this.sprites                     = sprites;
		
		if (this.objectSize == undefined)
		{
			console.error("objectSize not defined for scene!");
		}
		
		var gameObject;
		for (gameObject of gameObjects)
		{
			this.appendObject(gameObject);
		}
	}
	
	update()
	{
		var i;
		for (i of Object.keys(this.gameObjects['dynamic']))
		{
			this.gameObjects['dynamic'][i].update();
		}
	}
	
	updateDeltas()
	{
		var i;
		for (i of Object.keys(this.gameObjects['dynamic2']))
		{
			this.gameObjects['dynamic2'][i].updateDelta();
		}
	}
	
	updateColliders()
	{
		var i;
		var j;
		
		for (i of Object.keys(this.gameObjects['dynamicSolid']))
		{
			for (j of Object.keys(this.gameObjects['dynamicSolid']))
			{
				if (j != i)
				{
					this.gameObjects['dynamicSolid'][i].updateCollider(this.gameObjects['solid'][j]);
				}
			}
		}
		
		var log = [];
		for (i of Object.keys(this.gameObjects['dynamicSolid']))
		{
			for (j of Object.keys(this.gameObjects['staticSolid']))
			{
				if (j != i && log[j + i] == undefined)
				{
					this.gameObjects['dynamicSolid'][i].updateCollider(this.gameObjects['solid'][j]);
					log[i + j] = 1;
				}
			}
		}
	}
	
	updateObjects()
	{
		var gameObject
		for (gameObject of this.objectQueue['append'])
		{
			gameObject.parentScene = this;
			gameObject.id = 'ID' + this.idCtr;
			this.gameObjects['all'][gameObject.id] = gameObject;
			
			if (gameObject.prefab)
			{
				this.gameObjects['visual'][gameObject.id] = gameObject;
			}
			if (gameObject.isColliding)
			{
				this.gameObjects['solid'][gameObject.id] = gameObject;
			}
			if (gameObject.isTriggered)
			{
				this.gameObjects['trigger'][gameObject.id] = gameObject;
			}
			if (gameObject.isDynamic)
			{
				this.gameObjects['dynamic'][gameObject.id] = gameObject;
			}
			if (gameObject.isDynamicDelta)
			{
				this.gameObjects['dynamic2'][gameObject.id] = gameObject;
			}
			if (gameObject.isDynamic && gameObject.isColliding)
			{
				this.gameObjects['dynamicSolid'][gameObject.id] = gameObject;
			}
			if (!gameObject.isDynamic && gameObject.isColliding)
			{
				this.gameObjects['staticSolid'][gameObject.id] = gameObject;
			}
			
			this.idCtr++;
		}
		
		this.objectQueue['append'] = [];
		
		var i;
		var j;
		for (i of this.objectQueue['delete'])
		{
			for (j of Object.keys(this.gameObjects))
			{
				if (this.gameObjects[j][i] != undefined)
				{
					delete this.gameObjects[j][i];
				}
			}
		}
		
		this.objectQueue['delete'] = [];
	}
	
	updateLights(program)
	{
		gl.uniform3fv(program.uniforms['u_pointLightPosition'], this.lights);
	}
	
	render(program)
	{
		var i;
		for (i of Object.keys(this.gameObjects['visual']))
		{
			this.gameObjects['visual'][i].render(program);
		}
	}
	
	appendObject(gameObject)
	{
		this.objectQueue['append'].push(gameObject);
	}
	
	deleteObject(id)
	{
		this.objectQueue['delete'].push(id);
	}
}

class Game
{
}