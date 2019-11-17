jsaf.graphics.graphics2d = jsaf_graphics2d;
//jsaf.graphics2d = jsaf_graphics2d;


jsaf.use("math/jsaf_math2d.js");

jsaf.use("graphics/graphics2d/jsaf_graphics2d_image.js");
jsaf.use("graphics/graphics2d/jsaf_graphics2d_polygonPath.js");

jsaf.use("graphics/graphics2d/jsaf_graphics2d_font.js");
jsaf.use("graphics/graphics2d/jsaf_graphics2d_imageFont.js");
jsaf.use("graphics/graphics2d/jsaf_graphics2d_ttfFont.js");
jsaf.use("graphics/graphics2d/jsaf_graphics2d_loadFont.js");

jsaf.use("graphics/graphics2d/jsaf_graphics2d_setter.js");
jsaf.use("graphics/graphics2d/jsaf_graphics2d_setterV.js");
jsaf.use("graphics/graphics2d/jsaf_graphics2d_getter.js");

jsaf.use("graphics/graphics2d/jsaf_graphics2d_drawcalls.js");
jsaf.use("graphics/graphics2d/jsaf_graphics2d_drawcallsV.js");

jsaf.use("graphics/graphics2d/jsaf_graphics2d_renderlogic.js");

jsaf_graphics2d.prototype.MASK_BLEND	= jsaf_graphics.prototype.MASK_BLEND;
jsaf_graphics2d.prototype.SOLID_BLEND	= jsaf_graphics.prototype.SOLID_BLEND;
jsaf_graphics2d.prototype.LIGHT_BLEND	= jsaf_graphics.prototype.LIGHT_BLEND;
jsaf_graphics2d.prototype.SHADE_BLEND	= jsaf_graphics.prototype.SHADE_BLEND;
jsaf_graphics2d.prototype.ALPHA_BLEND	= jsaf_graphics.prototype.ALPHA_BLEND;
 

jsaf_graphics2d.prototype.POINT				= 1;
jsaf_graphics2d.prototype.LINE 				= 2;
jsaf_graphics2d.prototype.QUAD 				= 3;
jsaf_graphics2d.prototype.QUAD_UNFILLED 	= 4;
jsaf_graphics2d.prototype.OVAL				= 5;
jsaf_graphics2d.prototype.OVAL_UNFILLED 	= 6;
jsaf_graphics2d.prototype.POLYGON			= 7;
jsaf_graphics2d.prototype.POLYGON_UNFILLED 	= 8;


function jsaf_graphics2d( graphics ,resx, resy)
{
	if ( typeof(graphics) == 'string')
	{ 
		graphics = new jsaf_graphics (graphics, resx,resy);
	}

	this.canvas = graphics.canvas;
	this.graphics = graphics;
 
	this.gl = graphics.gl;
	
	this.shaderManager = graphics.shaderManager;
	this.textureManager = graphics.textureManager;
	
	this.blendmode = this.SOLID_BLEND; 
	
	this.rendersettings = null // DO NOT INSERT OBJECTS INTO RENDERsettings!!
 	
	this.cls_rgba = [0.0, 0.0, 0.0, 1.0];
  
	this.currentShader = null;
	this.__renderObject = null;
	
	this.renderCalls = 0; 
	this.drawCalls = 0;
								
	
	this.rendersettings =
	{ 'rotation': 0.0 
	, 'scale': [1.0, 1.0] 
	, 'vertexColor': [1.0, 1.0, 1.0, 1.0]
	, 'alpha': 1.0
	, 'automidhandle': false
	, 'handle': [0.0,0.0]	
	, 'origin': [0.0, 0.0]
	} 
	
	this.currentShader		= null;
	this.currentPrimitive	= null;
	this.currentBlendmode 	= null;
	this.currentFont 		= null;
	this.renderTextured		= false;
	
	this.renderCallTextures = [];
	this.renderCallTexturesCount = 0;
	this.renderCallVertices = 0;
	
	this.currentTextureId = 0;	
 
	this.renderBuffer = { 'position': []
						, 'handle':  []
						, 'rotation': []
						, 'resolution':  []
						, 'yflip':[]
						, 'color': []
						, 'textureid':  []
						, 'texuv':[]
						, 'textures': []
						};
 
	this.setBlendmode(this.ALPHA_BLEND);
	
	this.initShaders();	
	
	this.vertexAttribWorker = [];
	this.handleAttribWorker = [];
	this.textureAttribWorker = [];
	this.colorAttribWorker = [];
	
}


jsaf_graphics2d.prototype.initShaders = function()
{
	var path = jsaf.getPath();	

	//console.log (this.textured2dshader.shaderSource);
	
	this.solid2dshader = this.shaderManager.createShader('solid2d');
	
	this.solid2dshader.loadVertexShader	 (path+'graphics/shader/solid2dVertexShader.glsl.tpl.c');
	this.solid2dshader.loadFragmentShader (path+'graphics/shader/solid2dFragmentShader.glsl.tpl.c');
								
	this.solid2dshader.createVertexAttribute ('position','vec2')
	.bindBuffer(this.renderBuffer.position);
	
	this.solid2dshader.createVertexAttribute ('handle'	 ,'vec2')
	.bindBuffer(this.renderBuffer.handle);

	this.solid2dshader.createVertexAttribute ('rotation','float')
	.bindBuffer(this.renderBuffer.rotation);

	this.solid2dshader.createVertexUniform ('resolution','vec2')
	.bindBuffer(this.renderBuffer.resolution);

	this.solid2dshader.createVertexUniform ('yflip','float')
	.bindBuffer(this.renderBuffer.yflip);

	
	this.solid2dshader.createFragmentAttribute ('color','vec4')
	.bindBuffer(this.renderBuffer.color);

	this.solid2dshader.compile();

	this.textured2dshader = this.shaderManager.createShader('textured2d');
 	this.textured2dshader.useTextures = true;
	
	this.textured2dshader.loadVertexShader	 (path+'graphics/shader/textured2dVertexShader.glsl.tpl.c');
	this.textured2dshader.loadFragmentShader (path+'graphics/shader/textured2dFragmentShader.glsl.tpl.c');
								
	this.textured2dshader.createVertexAttribute ('position','vec2')
	.bindBuffer(this.renderBuffer.position);
	
	this.textured2dshader.createVertexAttribute ('handle' ,'vec2')
	.bindBuffer(this.renderBuffer.handle);

	this.textured2dshader.createVertexAttribute ('rotation','float')
	.bindBuffer(this.renderBuffer.rotation);

	this.textured2dshader.createVertexUniform ('resolution','vec2')
	.bindBuffer(this.renderBuffer.resolution);

	this.textured2dshader.createVertexUniform ('yflip','float')
	.bindBuffer(this.renderBuffer.yflip);
	
	this.textured2dshader.createFragmentAttribute ('color','vec4')
	.bindBuffer(this.renderBuffer.color);

 	this.textured2dshader.createFragmentAttribute ('textureid','float' )
	.bindBuffer(this.renderBuffer.textureid);
	
 	this.textured2dshader.createFragmentAttribute ('texuv','vec2' )
	.bindBuffer(this.renderBuffer.texuv);
	
 	this.textured2dshader.createFragmentUniform	  ('textures['+this.textureUnits+']','sampler2D')
	.bindBuffer(this.renderBuffer.textures);
 					 
	this.textured2dshader.compile();

}