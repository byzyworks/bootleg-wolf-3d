class main
{
	constructor()
	{
		this.webGL  = new WebGLProgram();
		this.scene  = new Maze();
		this.player;
		this.keys   = [];
		this.win    = 0;
		
		document.addEventListener('keypress', onKeyPress);
		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('keyup', onKeyUp);
		
		this.scene.updateObjects();
		this.player = this.scene.gameObjects['all']['ID0'];
		
		this.renderAll();
		
		requestAnimationFrame(step);
	}
	
	renderAll()
	{
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		this.scene.render(this.webGL);
		
		this.webGL.updateCamera(this.player);
	}
	
	updateAll()
	{
		this.updateControls();
		
		this.scene.updateDeltas();
	
		this.scene.updateColliders();
		
		this.scene.update();
		
		this.scene.updateLights(this.webGL);
		
		this.scene.updateObjects();
		
		if (this.win > 0)
		{
			this.win++;
			if (this.win >= 8)
			{
				alert('You Win');
				document.getElementById('finish').style.visibility = 'visible';
				this.win = 0;
			}
		}
	}
	
	step()
	{
		this.updateAll();
		this.renderAll();
		requestAnimationFrame(step);
	}
	
	onKeyPress(e)
	{
		e = e || window.event;
		switch (e.code)
		{
		case 'Space':
			this.keys['space'] = true;
			break;
		}
	}
	
	onKeyDown(e)
	{
		e = e || window.event;
		switch (e.code)
		{
		case 'KeyW':
			this.keys['w'] = true;
			break;
		case 'KeyA':
			this.keys['a'] = true;
			break;
		case 'KeyS':
			this.keys['s'] = true;
			break;
		case 'KeyD':
			this.keys['d'] = true;
			break;
		case 'KeyZ':
			this.keys['z'] = true;
			break;
		case 'KeyX':
			this.keys['x'] = true;
			break;
		case 'KeyQ':
			this.keys['q'] = true;
			break;
		case 'KeyE':
			this.keys['e'] = true;
			break;
		}
	}
	
	onKeyUp(e)
	{
		e = e || window.event;
		switch (e.code)
		{
		case 'KeyW':
			this.keys['w'] = false;
			break;
		case 'KeyA':
			this.keys['a'] = false;
			break;
		case 'KeyS':
			this.keys['s'] = false;
			break;
		case 'KeyD':
			this.keys['d'] = false;
			break;
		case 'KeyZ':
			this.keys['z'] = false;
			break;
		case 'KeyX':
			this.keys['x'] = false;
			break;
		case 'KeyQ':
			this.keys['q'] = false;
			break;
		case 'KeyE':
			this.keys['e'] = false;
			break;
		}
	}
	
	updateControls()
	{
		if (this.keys['w'] && !this.keys['s'])
		{
			this.player.action('forward');
		}
		else if (!this.keys['w'] && this.keys['s'])
		{
			this.player.action('backward');
		}
		if (this.keys['q'] && !this.keys['e'])
		{
			this.player.action('strafeleft');
		}
		else if (!this.keys['q'] && this.keys['e'])
		{
			this.player.action('straferight');
		}
		
		if (!this.keys['w'] && !this.keys['s'] && !this.keys['q'] && !this.keys['e'])
		{
			this.player.action('stop');
		}
		
		if (this.keys['z'] && !this.keys['x'])
		{
			this.player.action('moveup');
		}
		else if (!this.keys['z'] && this.keys['x'])
		{
			this.player.action('movedown');
		}
		else
		{
			this.player.action('vertstop');
		}
		
		if (this.keys['a'] && !this.keys['d'])
		{
			this.player.action('turnleft');
		}
		else if (!this.keys['a'] && this.keys['d'])
		{
			this.player.action('turnright');
		}
		else
		{
			this.player.action('stopturn');
		}
		
		if (this.keys['space'])
		{
			this.player.action('shoot');
			this.keys['space'] = false;
		}
	}
}

function getNormal(point1, point2, point3)
{
	var u = [
		point2[0] - point1[0],
		point2[1] - point1[1],
		point2[2] - point1[2]
	];
	var v = [
		point3[0] - point1[0],
		point3[1] - point1[1],
		point3[2] - point1[2]
	];
	
	var normal = [
		(u[1] * v[2]) - (u[2] * v[1]),
		(u[2] * v[0]) - (u[0] * v[2]),
		(u[0] * v[1]) - (u[1] * v[0])
	];
	
	return normal;
}

function step()
{
	myMain.step();
}

function vectorizeX(x)
{
	return (((x - canvas.offsetLeft) / canvas.width) * 2) - 1;
}

function vectorizeY(y)
{
	return ((((y - canvas.offsetTop) / canvas.height) * 2) - 1) * -1;
}

function onKeyPress(e)
{
	myMain.onKeyPress(e);
}

function onKeyDown(e)
{
	myMain.onKeyDown(e);
}

function onKeyUp(e)
{
	myMain.onKeyUp(e);
}

function dot(vector1, vector2)
{
	var result = 0.0;
	var i;
	for (i = 0; i < vector1.length; i++)
	{
		result += vector1[i] * vector2[i];
	}
	
	return result;
}

function cross(point1, point2)
{
	return [
		(point1[1] * point2[2]) - (point1[2] * point2[1]),
		(point1[2] * point2[0]) - (point1[0] * point2[2]),
		(point1[0] * point2[1]) - (point1[1] * point2[0])
	];
}

function difference(point1, point2)
{
	return [point1[0] - point2[0], point1[1] - point2[1], point1[2] - point2[2]];
}

function normalize(vector)
{
	var magnitude = Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2) + Math.pow(vector[2], 2));
	
	return [vector[0] / magnitude, vector[1] / magnitude, vector[2] / magnitude];
}

function loadTexture(texturePath)
{
	gl.bindTexture(gl.TEXTURE_2D, this.texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.images[texturePath]);
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.texParameteri(gl.TEXTURE_2D,	gl.TEXTURE_WRAP_S, gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);               
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);	
}