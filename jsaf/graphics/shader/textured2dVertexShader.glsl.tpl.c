//VERTEX_SHADER (textured)
##PRECISION

uniform vec2 resolution;

attribute vec2 position;
attribute vec2 handle;
attribute float rotation;

attribute float textureid; 
attribute vec2 texuv;
attribute vec4 color;

varying float fragmentshader_textureid; 
varying vec2 fragmentshader_texuv;
varying vec4 fragmentshader_color;

void main()
{
	vec2 tcoord = position-handle;

	vec2 coord = vec2(handle[0]+(cos(rotation)*(tcoord.x))-(sin(rotation)*(tcoord.y)),handle[1]+(cos(rotation)*(tcoord.y))+(sin(rotation)*(tcoord.x)));	
	 
	gl_Position = vec4(  (coord[0] /  resolution[0] *2.0)-1.0, coord[1] /  resolution[1] *-2.0+1.0, 1.0, 1.0);
 
	fragmentshader_textureid = textureid;
	fragmentshader_texuv = texuv;
	fragmentshader_color = color;
}
	