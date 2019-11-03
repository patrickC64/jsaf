//VERTEX_SHADER

precision mediump float;

attribute vec2 position;

attribute vec2 handle;

attribute float rotation;

attribute vec2 resolution;

attribute vec4 binding_color;
varying vec4 color;

attribute float binding_textureid;
varying float textureid;

attribute vec2 binding_texcoords;
varying vec2 texcoords;


void main(void) {
	color = binding_color;
	textureid = binding_textureid;
	texcoords = binding_texcoords;



	vec2 tcoord = position+.5-handle;

	

	vec2 coord = vec2(handle[0]+(cos(rotation)*(tcoord.x))-(sin(rotation)*(tcoord.y)),handle[1]+(cos(rotation)*(tcoord.y))+(sin(rotation)*(tcoord.x)));	



	gl_Position = vec4( (coord[0])/ resolution[0] *2.0-1.0, (resolution[1]-coord[1])/resolution[1]*2.0-1.0, 0.5, 1.0);

}
//FRAGMENT_SHADER

precision mediump float;

varying vec4 color;

varying float textureid;

varying vec2 texcoords;

uniform sampler2D textures[16];


vec4 getFragmentColor( ) {
  int id = int(textureid);   vec4 fcolor;
    if (id == 0) {
      fcolor = texture2D(textures[0], texcoords);
    }else if (id == 1) {
      fcolor = texture2D(textures[1], texcoords);
    }else if (id == 2) {
      fcolor = texture2D(textures[2], texcoords);
    }else if (id == 3) {
      fcolor = texture2D(textures[3], texcoords);
    }else if (id == 4) {
      fcolor = texture2D(textures[4], texcoords);
    }else if (id == 5) {
      fcolor = texture2D(textures[5], texcoords);
    }else if (id == 6) {
      fcolor = texture2D(textures[6], texcoords);
    }else if (id == 7) {
      fcolor = texture2D(textures[7], texcoords);
    }else if (id == 8) {
      fcolor = texture2D(textures[8], texcoords);
    }else if (id == 9) {
      fcolor = texture2D(textures[9], texcoords);
    }else if (id == 10) {
      fcolor = texture2D(textures[10], texcoords);
    }else if (id == 11) {
      fcolor = texture2D(textures[11], texcoords);
    }else if (id == 12) {
      fcolor = texture2D(textures[12], texcoords);
    }else if (id == 13) {
      fcolor = texture2D(textures[13], texcoords);
    }else if (id == 14) {
      fcolor = texture2D(textures[14], texcoords);
    }else if (id == 15) {
      fcolor = texture2D(textures[15], texcoords);
    }
  else    {
      fcolor = color;
   }
    return fcolor*color; 
}

void main(void) {



	gl_FragColor = getFragmentColor();

	

	

}
jsaf_graphics_shader.js:110:2
//VERTEX_SHADER

precision mediump float;

attribute vec2 position;

attribute vec2 handle;

attribute float rotation;

attribute vec2 resolution;

attribute vec4 binding_color;
varying vec4 color;


void main(void) {
	color = binding_color;

	gl_PointSize = 1.0;



	vec2 coord = position;	

	vec2 tcoord = position;



	tcoord-=handle;



	coord.x =handle[0]+(cos(rotation)*(tcoord.x))-(sin(rotation)*(tcoord.y));

	coord.y =handle[1]+(cos(rotation)*(tcoord.y))+(sin(rotation)*(tcoord.x));



	vec2 pos=vec2( (coord[0]+0.5)/ resolution[0] *2.0-1.0, (resolution[1]-coord[1]-0.5)/resolution[1]*2.0-1.0);



	gl_Position = vec4(pos, 0.5, 1.0);

}
//FRAGMENT_SHADER

precision mediump float;

varying vec4 color;


void main(void) {

	gl_FragColor = color;

}