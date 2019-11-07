//3D VERTEX_SHADER (textured)
//
//
##PRECISION

uniform vec2 resolution;

attribute vec3 position;
attribute vec3 handle;
attribute float rotation;

attribute float textureid; 
attribute vec2 texuv;
attribute vec4 color;

varying float fragmentshader_textureid; 
varying vec2 fragmentshader_texuv;
varying vec4 fragmentshader_color;

void main()
{
	vec3 coord = position;
	 
	gl_Position = vec4(  (coord[0] /  resolution[0] *2.0)-1.0, coord[1] /  resolution[1] *-2.0+1.0, 1.0, 1.0);
 
	fragmentshader_textureid = textureid;
	fragmentshader_texuv = texuv;
	fragmentshader_color = color;
}
	