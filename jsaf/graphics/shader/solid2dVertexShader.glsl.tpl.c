//VERTEX_SHADER (solid)
##PRECISION

uniform vec2 resolution;
uniform float yflip;
 
attribute vec2 position;
attribute vec2 handle;
attribute float rotation;

attribute vec4 color;
varying vec4 fragmentshader_color;

void main()
{	
	gl_PointSize =0.4;

	vec2 tcoord = position-handle;
 
	vec2 coord = vec2(handle[0]+(cos(rotation)*(tcoord.x))-(sin(rotation)*(tcoord.y)),handle[1]+(cos(rotation)*(tcoord.y))+(sin(rotation)*(tcoord.x)));	

	//gl_Position = vec4(  coord[0] / resolution[0] *2.0-1.0, coord[1] / resolution[1]-1.0, 1.0, 1.0);
 
 	gl_Position = vec4(  coord[0] / resolution[0] *2.0-1.0, coord[1] / resolution[1]*(2.0*yflip)+(-1.0*yflip), 1.0, 1.0);

	fragmentshader_color = color;
}