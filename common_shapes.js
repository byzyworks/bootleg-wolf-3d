class Triangle extends Shape
{
	constructor(transform, point1, point2, point3, texCoords1, texCoords2, texCoords3, texturePath, color)
	{					
		var vertices = [];
		var type     = gl.TRIANGLES;
		var count    = 3;
		
		var points    = [point1, point2, point3];
		var normal    = getNormal(point1, point2, point3);
		var texCoords = [texCoords1, texCoords2, texCoords3];
		
		vertices.push(points[0][0]);
		vertices.push(points[0][1]);
		vertices.push(points[0][2]);
		vertices.push(normal[0]);
		vertices.push(normal[1]);
		vertices.push(normal[2]);
		vertices.push(texCoords[0][0]);
		vertices.push(texCoords[0][1]);
		
		vertices.push(points[1][0]);
		vertices.push(points[1][1]);
		vertices.push(points[1][2]);
		vertices.push(normal[0]);
		vertices.push(normal[1]);
		vertices.push(normal[2]);
		vertices.push(texCoords[1][0]);
		vertices.push(texCoords[1][1]);
		
		vertices.push(points[2][0]);
		vertices.push(points[2][1]);
		vertices.push(points[2][2]);
		vertices.push(normal[0]);
		vertices.push(normal[1]);
		vertices.push(normal[2]);
		vertices.push(texCoords[2][0]);
		vertices.push(texCoords[2][1]);
		
		super(vertices, transform, type, count, texturePath, color);
		
		this.points    = points;
		this.normal    = normal;
		this.texCoords = texCoords;
	}
}

class Quad extends Mesh
{
	constructor(transform, point1, point2, point3, point4, texturePath, color)
	{
		var triangles = [];
		
		triangles.push(new Triangle(transform, point1, point2, point3, [1.0, 1.0], [1.0, 0.0], [0.0, 0.0], texturePath, color));
		triangles.push(new Triangle(transform, point1, point3, point4, [1.0, 1.0], [0.0, 0.0], [0.0, 1.0], texturePath, color));
		
		super(triangles);
	}
}

class BoxMesh extends Mesh
{
	constructor(transform, color, texturePath)
	{
		var triangles = [];
		
		triangles.push(new Quad(transform, [-0.5, -0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5], [-0.5, -0.5, -0.5], texturePath));
		triangles.push(new Quad(transform, [-0.5, -0.5, -0.5], [-0.5, 0.5, -0.5], [0.5, 0.5, -0.5], [0.5, -0.5, -0.5], texturePath));
		triangles.push(new Quad(transform, [0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5], [0.5, -0.5, 0.5], texturePath));
		triangles.push(new Quad(transform, [0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, -0.5, 0.5], texturePath));
		//triangles.push(new Quad(transform, [-0.5, 0.5, 0.5], [0.5, 0.5, 0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5], color));
		//triangles.push(new Quad(transform, [-0.5, -0.5, 0.5], [-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], color));
		
		super(triangles);
	}
}

class DoorMesh extends Mesh
{
	constructor(transform, color, texturePath = 'door.png')
	{
		var triangles = [];
		
		if (texturePath == 'door.png')
		{
			triangles.push(new Quad(transform, [-0.5, -0.5, 0.0], [-0.5, 0.5, 0.0], [0.5, 0.5, 0.0], [0.5, -0.5, 0.0], 'door.png'));
			triangles.push(new Quad(transform, [0.5, -0.5, 0.0], [0.5, 0.5, 0.0], [-0.5, 0.5, 0.0], [-0.5, -0.5, 0.0], 'doorflipped.png'));
		}
		else
		{
			triangles.push(new Quad(transform, [-0.5, -0.5, 0.0], [-0.5, 0.5, 0.0], [0.5, 0.5, 0.0], [0.5, -0.5, 0.0], texturePath));
			triangles.push(new Quad(transform, [0.5, -0.5, 0.0], [0.5, 0.5, 0.0], [-0.5, 0.5, 0.0], [-0.5, -0.5, 0.0], texturePath));
		}
		
		super(triangles);
	}
}

class HingeMesh extends Mesh
{
	constructor(transform, color)
	{
		var triangles = [];
		
		triangles.push(new Quad(transform, [-0.499, -0.5, -0.5], [-0.499, 0.5, -0.5], [-0.499, 0.5, 0.5], [-0.499, -0.5, 0.5], 'doorhinge.png'));
		triangles.push(new Quad(transform, [0.499, -0.5, 0.5], [0.499, 0.5, 0.5], [0.499, 0.5, -0.5], [0.499, -0.5, -0.5], 'doorhinge.png'));
		
		super(triangles);
	}
}

class CircleExtension extends Mesh
{
	constructor(base, tip, tipColor)
	{
		var transform = base.children[0].transform;
		var triangles = [];
		
		var point1;
		var point2;
		var point3;
		
		point1 = tip;
		
		var i;
		for (i = 0; i < base.resolution; i++)
		{
			point2 = [
				base.children[i].points[2][0],
				base.children[i].points[2][1],
				base.children[i].points[2][2]
			];
			point3 = [
				base.children[i].points[1][0],
				base.children[i].points[1][1],
				base.children[i].points[1][2]
			];
			
			triangles.push(new Triangle(transform, point1, point2, point3, [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], null, tipColor));
		}
		
		super(triangles);
	}
}

class Circle extends Mesh
{
	constructor(transform, center, radius, conality, resolution, color, flip = false)
	{
		var triangles = [];
		
		var point1;
		var point2;
		var point3;
		
		point1 = [
			center[0],
			center[1] + conality,
			center[2]
		];
		
		var temp;
		
		var i;
		for (i = 0; i < resolution - 1; i++)
		{
			point2 = [
				center[0] + (radius * Math.cos(2 * Math.PI * (i / resolution))),
				center[1],
				center[2] + (radius * Math.sin(2 * Math.PI * (i / resolution)))
			];
			point3 = [
				center[0] + (radius * Math.cos(2 * Math.PI * ((i + 1) / resolution))),
				center[1],
				center[2] + (radius * Math.sin(2 * Math.PI * ((i + 1) / resolution)))
			];
			
			if (flip)
			{
				temp = point2;
				point2 = point3;
				point3 = temp;
			}
			
			triangles.push(new Triangle(transform, point1, point2, point3, [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], null, color));
		}
		
		point2 = [
			center[0] + (radius * Math.cos(2 * Math.PI * ((resolution - 1) / resolution))),
			center[1],
			center[2] + (radius * Math.sin(2 * Math.PI * ((resolution - 1) / resolution)))
		];
		point3 = [
			center[0] + radius,
			center[1],
			center[2]
		];
		
		if (flip)
		{
			temp = point2;
			point2 = point3;
			point3 = temp;
		}
		
		triangles.push(new Triangle(transform, point1, point2, point3, [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], null, color));
		
		super(triangles);
		
		this.resolution = resolution;
	}
}

class Prism extends Mesh
{
	constructor(transform, circle1, circle2)
	{
		var triangles = [];
		
		var point1;
		var point2;
		var point3;
		
		if (circle1.resolution != circle2.resolution)
		{
			console.error("A prism cannot connect two circles with different number of sides!");
		}
		
		var i;
		for (i = 0; i < circle1.resolution; i++)
		{
			point1 = [
				circle1.children[i].points[2][0],
				circle1.children[i].points[2][1],
				circle1.children[i].points[2][2]
			];
			point2 = [
				circle1.children[i].points[1][0],
				circle1.children[i].points[1][1],
				circle1.children[i].points[1][2]
			];
			point3 = [
				circle2.children[i].points[1][0],
				circle2.children[i].points[1][1],
				circle2.children[i].points[1][2]
			];
			
			triangles.push(new Triangle(transform, point1, point2, point3, [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], null, [255, 255, 255]));
			
			point1 = [
				circle1.children[i].points[1][0],
				circle1.children[i].points[1][1],
				circle1.children[i].points[1][2]
			];
			point2 = [
				circle2.children[i].points[2][0],
				circle2.children[i].points[2][1],
				circle2.children[i].points[2][2]
			];
			point3 = [
				circle2.children[i].points[1][0],
				circle2.children[i].points[1][1],
				circle2.children[i].points[1][2]
			];
			
			triangles.push(new Triangle(transform, point1, point2, point3, [0.0, 0.0], [0.0, 0.0], [0.0, 0.0], null, [255, 255, 255]));
		}
		
		super(triangles);
	}
}