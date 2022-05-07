class WebGLProgram
{
	constructor()
	{
		var vertexShaderSource   = document.getElementById("2dVertexShader").text;
		var vertexShader         = this.createShader(gl.VERTEX_SHADER, vertexShaderSource);
		var fragmentShaderSource = document.getElementById("2dFragmentShader").text;
		var fragmentShader       = this.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
		
		this.program = this.createProgram(vertexShader, fragmentShader);
		this.uniforms = [];
		this.attributes = [];
		
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.clearColor(0, 0, 0, 1);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.enable(gl.DEPTH_TEST);
		gl.enable(gl.CULL_FACE);
		gl.cullFace(gl.BACK);
		//gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
		gl.enable(gl.BLEND);
		
		gl.useProgram(this.program);
		
		this.uniforms['n'] = gl.getUniformLocation(this.program, 'n');
		gl.uniform1f(this.uniforms['n'], 0.001);
		this.uniforms['f'] = gl.getUniformLocation(this.program, 'f');
		gl.uniform1f(this.uniforms['f'], 10);
		this.uniforms['r'] = gl.getUniformLocation(this.program, 'r');
		gl.uniform1f(this.uniforms['r'], 0.001);
		this.uniforms['t'] = gl.getUniformLocation(this.program, 't');
		gl.uniform1f(this.uniforms['t'], 0.0005625);
		
		this.uniforms['u_world'] = gl.getUniformLocation(this.program, 'u_world');
		this.uniforms['u_worldInverseTranspose'] = gl.getUniformLocation(this.program, 'u_worldInverseTranspose');
		
		this.uniforms['u_cameraLoc'] = gl.getUniformLocation(this.program, 'u_cameraLoc');
		this.uniforms['u_cameraRot'] = gl.getUniformLocation(this.program, 'u_cameraRot');
		this.uniforms['u_cameraZoom'] = gl.getUniformLocation(this.program, 'u_cameraZoom');
		
		this.attributes['a_vertexPosition'] = gl.getAttribLocation(this.program, 'a_vertexPosition');
		this.attributes['a_vertexNormal'] = gl.getAttribLocation(this.program, 'a_vertexNormal');
		this.attributes['a_vertexTexCoords'] = gl.getAttribLocation(this.program, 'a_vertexTexCoords');
		
		this.uniforms['u_pointLightPosition'] = gl.getUniformLocation(this.program, 'u_pointLightPosition');
		
		this.uniforms['u_texture'] = gl.getUniformLocation(this.program, "u_texture");
	}
	
	createShader(type, source)
	{
		var shader = gl.createShader(type);
		
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		
		var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (success)
		{
			return shader;
		}
		console.error(gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
	}
	
	createProgram(vertexShader, fragmentShader)
	{
		var program = gl.createProgram();
		var success;
		
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		success = gl.getProgramParameter(program, gl.LINK_STATUS);
		
		if (success)
		{
			return program;
		}
		console.error(gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
	}
	
	updateCamera(camera)
	{
		gl.uniform3fv(this.uniforms['u_cameraLoc'], [camera.transform.loc[0], camera.transform.loc[1], -1.0 * camera.transform.loc[2]]);
		gl.uniform3fv(this.uniforms['u_cameraRot'], camera.transform.rot);
		gl.uniform3fv(this.uniforms['u_cameraZoom'], camera.transform.scale);
	}
}