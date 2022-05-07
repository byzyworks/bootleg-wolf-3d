class m4
{
	static copy(a)
	{
		return [
			a[0], a[4],  a[8], a[12],
			a[1], a[5],  a[9], a[13],
			a[2], a[6], a[10], a[14],
			a[3], a[7], a[11], a[15],
		];
	}
	
	static identity()
	{
		return [
			1.0, 0.0, 0.0, 0.0,
			0.0, 1.0, 0.0, 0.0,
			0.0, 0.0, 1.0, 0.0,
			0.0, 0.0, 0.0, 1.0
		];
	}
	
	static inverse(a)
	{
		var tt0  = a[10] * a[15];
		var tt1  = a[14] * a[11];
		var tt2  = a[6]  * a[15];
		var tt3  = a[14] * a[7];
		var tt4  = a[6]  * a[11];
		var tt5  = a[10] * a[7];
		var tt6  = a[2]  * a[15];
		var tt7  = a[14] * a[3];
		var tt8  = a[2]  * a[11];
		var tt9  = a[10] * a[3];
		var tt10 = a[2]  * a[7];
		var tt11 = a[6]  * a[3];
		var tt12 = a[8]  * a[13];
		var tt13 = a[12] * a[9];
		var tt14 = a[4]  * a[13];
		var tt15 = a[12] * a[5];
		var tt16 = a[4]  * a[9];
		var tt17 = a[8]  * a[5];
		var tt18 = a[0]  * a[13];
		var tt19 = a[12] * a[1];
		var tt20 = a[0]  * a[9];
		var tt21 = a[8]  * a[1];
		var tt22 = a[0]  * a[5];
		var tt23 = a[4]  * a[1];

		var t0 = ((tt0 * a[5]) + (tt3 * a[9]) + (tt4  * a[13])) - ((tt1 * a[5]) + (tt2 * a[9]) + (tt5  * a[13]));
		var t1 = ((tt1 * a[1]) + (tt6 * a[9]) + (tt9  * a[13])) - ((tt0 * a[1]) + (tt7 * a[9]) + (tt8  * a[13]));
		var t2 = ((tt2 * a[1]) + (tt7 * a[5]) + (tt10 * a[13])) - ((tt3 * a[1]) + (tt6 * a[5]) + (tt11 * a[13]));
		var t3 = ((tt5 * a[1]) + (tt8 * a[5]) + (tt11 * a[9]))  - ((tt4 * a[1]) + (tt9 * a[5]) + (tt10 * a[9]));

		var d = 1.0 / ((a[0] * t0) + (a[4] * t1) + (a[8] * t2) + (a[12] * t3));
		
		return [
			d * t0,
			d * t1,
			d * t2,
			d * t3,
			d * (((tt1  * a[4])  + (tt2  * a[8])  + (tt5  * a[12])) - (tt0  * a[4]  + tt3  * a[8]  + tt4  * a[12])),
			d * (((tt0  * a[0])  + (tt7  * a[8])  + (tt8  * a[12])) - (tt1  * a[0]  + tt6  * a[8]  + tt9  * a[12])),
			d * (((tt3  * a[0])  + (tt6  * a[4])  + (tt11 * a[12])) - (tt2  * a[0]  + tt7  * a[4]  + tt10 * a[12])),
			d * (((tt4  * a[0])  + (tt9  * a[4])  + (tt10 * a[8]))  - (tt5  * a[0]  + tt8  * a[4]  + tt11 * a[8])),
			d * (((tt12 * a[7])  + (tt15 * a[11]) + (tt16 * a[15])) - (tt13 * a[7]  + tt14 * a[11] + tt17 * a[15])),
			d * (((tt13 * a[3])  + (tt18 * a[11]) + (tt21 * a[15])) - (tt12 * a[3]  + tt19 * a[11] + tt20 * a[15])),
			d * (((tt14 * a[3])  + (tt19 * a[7])  + (tt22 * a[15])) - (tt15 * a[3]  + tt18 * a[7]  + tt23 * a[15])),
			d * (((tt17 * a[3])  + (tt20 * a[7])  + (tt23 * a[11])) - (tt16 * a[3]  + tt21 * a[7]  + tt22 * a[11])),
			d * (((tt14 * a[10]) + (tt17 * a[14]) + (tt13 * a[6]))  - (tt16 * a[14] + tt12 * a[6]  + tt15 * a[10])),
			d * (((tt20 * a[14]) + (tt12 * a[2])  + (tt19 * a[10])) - (tt18 * a[10] + tt21 * a[14] + tt13 * a[2])),
			d * (((tt18 * a[6])  + (tt23 * a[14]) + (tt15 * a[2]))  - (tt22 * a[14] + tt14 * a[2]  + tt19 * a[6])),
			d * (((tt22 * a[10]) + (tt16 * a[2])  + (tt21 * a[6]))  - (tt20 * a[6]  + tt23 * a[10] + tt17 * a[2]))
		];
	}
	
	static lookAt(eye, target, tmp = [0.0, 1.0, 0.0])
	{
		var forward = normalize(difference(eye, target));
		var right   = normalize(cross(tmp, forward));
		var up      = normalize(cross(forward, right));
		
		return [
			  right[0],   right[1],   right[2], 0.0,
			     up[0],      up[1],      up[2], 0.0,
			forward[0], forward[1], forward[2], 0.0,
			    eye[0],     eye[1],     eye[2], 1.0
		];
	}
	
	static multiply(a, b)
	{
		return [
			(a[0]  * b[0]) + (a[1]  * b[4]) + (a[2]  * b[8])  + (a[3]  * b[12]),
			(a[0]  * b[1]) + (a[1]  * b[5]) + (a[2]  * b[9])  + (a[3]  * b[13]),
			(a[0]  * b[2]) + (a[1]  * b[6]) + (a[2]  * b[10]) + (a[3]  * b[14]),
			(a[0]  * b[3]) + (a[1]  * b[7]) + (a[2]  * b[11]) + (a[3]  * b[15]),
			(a[4]  * b[0]) + (a[5]  * b[4]) + (a[6]  * b[8])  + (a[7]  * b[12]),
			(a[4]  * b[1]) + (a[5]  * b[5]) + (a[6]  * b[9])  + (a[7]  * b[13]),
			(a[4]  * b[2]) + (a[5]  * b[6]) + (a[6]  * b[10]) + (a[7]  * b[14]),
			(a[4]  * b[3]) + (a[5]  * b[7]) + (a[6]  * b[11]) + (a[7]  * b[15]),
			(a[8]  * b[0]) + (a[9]  * b[4]) + (a[10] * b[8])  + (a[11] * b[12]),
			(a[8]  * b[1]) + (a[9]  * b[5]) + (a[10] * b[9])  + (a[11] * b[13]),
			(a[8]  * b[2]) + (a[9]  * b[6]) + (a[10] * b[10]) + (a[11] * b[14]),
			(a[8]  * b[3]) + (a[9]  * b[7]) + (a[10] * b[11]) + (a[11] * b[15]),
			(a[12] * b[0]) + (a[13] * b[4]) + (a[14] * b[8])  + (a[15] * b[12]),
			(a[12] * b[1]) + (a[13] * b[5]) + (a[14] * b[9])  + (a[15] * b[13]),
			(a[12] * b[2]) + (a[13] * b[6]) + (a[14] * b[10]) + (a[15] * b[14]),
			(a[12] * b[3]) + (a[13] * b[7]) + (a[14] * b[11]) + (a[15] * b[15])
		];
	}
	
	static perspective(right, top, near, far)
	{
		return [
			far / right,       0.0,                                  0.0,  0.0,
			        0.0, far / top,                                  0.0,  0.0,
			        0.0,       0.0, (-1.0 * (near + far)) / (near - far), -1.0,
			        0.0,       0.0, (-2.0 * (near * far)) / (near - far),  0.0
		];
	}
	
	static rotateX(a, v3)
	{
		const b = [
			1.0,                    0.0,                   0.0, 0.0,
			0.0,  1.0 * Math.cos(v3[0]), 1.0 * Math.sin(v3[0]), 0.0,
			0.0, -1.0 * Math.sin(v3[0]), 1.0 * Math.cos(v3[0]), 0.0,
			0.0,                    0.0,                   0.0, 1.0
		];
		
		return m4.multiply(a, b);
	}
	
	static rotateY(a, v3)
	{
		const b = [
			1.0 * Math.cos(v3[1]), 0.0, -1.0 * Math.sin(v3[1]), 0.0,
			                  0.0, 1.0,                    0.0, 0.0,
			1.0 * Math.sin(v3[1]), 0.0,  1.0 * Math.cos(v3[1]), 0.0,
			                  0.0, 0.0,                    0.0, 1.0
		];
		
		return m4.multiply(a, b);
	}
	
	static rotateZ(a, v3)
	{
		const b = [
			 1.0 * Math.cos(v3[2]), 1.0 * Math.sin(v3[2]), 0.0, 0.0,
			-1.0 * Math.sin(v3[2]), 1.0 * Math.cos(v3[2]), 0.0, 0.0,
			                   0.0,                   0.0, 1.0, 0.0,
			                   0.0,                   0.0, 0.0, 1.0
		];
		
		return m4.multiply(a, b);
	}
	
	static scale(a, v3)
	{
		const b = [
			v3[0],   0.0,   0.0, 0.0,
			  0.0, v3[1],   0.0, 0.0,
			  0.0,   0.0, v3[2], 0.0,
			  0.0,   0.0,   0.0, 1.0
		];
		
		return m4.multiply(a, b);
	}
	
	static translate(a, v3)
	{
		const b = [
			  1.0,   0.0,   0.0, 0.0,
			  0.0,   1.0,   0.0, 0.0,
			  0.0,   0.0,   1.0, 0.0,
			v3[0], v3[1], v3[2], 1.0
		];
		
		return m4.multiply(a, b);
	}
	
	static transpose(m4)
	{
		return [
			m4[0], m4[4],  m4[8], m4[12],
			m4[1], m4[5],  m4[9], m4[13],
			m4[2], m4[6], m4[10], m4[14],
			m4[3], m4[7], m4[11], m4[15]
		];
	}
}