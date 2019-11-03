jsaf_math_scaleRect ( v, f)
{
	var r = [ v[0], v[1], v[2], v[3] ];

	r[0]*= -f;
	r[1]*= -f;

	r[2]*= f;
	r[3]*= f;
		
	return r;
}