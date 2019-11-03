function jsaf_math_rectangleResize ( v, f)
{
	var r = [ v[0], v[1], v[2], v[3] ];

	r[0]-= f;
	r[1]-= f;

	r[2]+= f*2;
	r[3]+= f*2;
		
	return r;
}

/*
	@function: fitRectIntoRect 
	@param: s = source [ x, y, w, h ]
	@return: v [ x, y, w, h ]
*/
function jsaf_math_rectanglePassInto ( s, d)
{
	var v = [ s[0], s[1], s[2], s[3] ];

	if ( v[0] > d[0]+d[2] )
		v[0]= d[0]+d[2];
	
	if ( v[1] > d[1]+d[3] )
		v[1]= d[1]+d[3];
	
	if ( (v[0]+v[2]) > (d[0]+d[2]) )
	{
		v[2]  -= (v[0]+v[2]) - ( d[0]+d[2] );
	}

	if ( (v[1]+v[3]) > (d[1]+d[3]) )
	{
		v[3]  -= (v[1]+v[3]) - ( d[1]+d[3] );
	}

	if ( v[0] < d[0] )
	{
		v[2]+= v[0]-d[0];
		v[0] = d[0];
	}

	if ( v[1] < d[1] )
	{
		v[3]+= v[1]-d[1];
		v[1] = d[1];
	} 
	
	return v;
}