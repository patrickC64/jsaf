//3D FRAGMENT_SHADER (textured)
//
##PRECISION

varying vec4 fragmentshader_color;

varying float fragmentshader_textureid;

varying vec2 fragmentshader_texuv;

##getFragmentColor

void main()
{
	
	gl_FragColor = getFragmentColor();
	
}