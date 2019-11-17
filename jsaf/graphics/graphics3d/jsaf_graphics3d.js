jsaf.graphics.graphics3d = jsaf_graphics3d;

jsaf.use("graphics/graphics3d/jsaf_graphics3d_entityBase.js")
jsaf.use("graphics/graphics3d/jsaf_graphics3d_entity.js");

jsaf.use("graphics/graphics3d/jsaf_graphics3d_mesh.js");
jsaf.use("graphics/graphics3d/jsaf_graphics3d_surface.js");
jsaf.use("graphics/graphics3d/jsaf_graphics3d_brush.js");

jsaf.use("graphics/graphics3d/jsaf_graphics3d_pivot.js");

jsaf.use("graphics/graphics3d/jsaf_graphics3d_camera.js");

jsaf.use("graphics/graphics3d/jsaf_graphics3d_createcalls.js")
jsaf.use("graphics/graphics3d/jsaf_graphics3d_renderlogic.js")


function jsaf_graphics3d( graphics ,resx, resy)
{

	
	if ( typeof(graphics) == 'string')
	{
		graphics = new jsaf_graphics (graphics, resx,resy);
	}

	this.sceneGraph =  [];
	this.cameras	=  [];	
	
	this.canvas = graphics.canvas;
	this.graphics = graphics;
 
	this.gl = graphics.gl;

	
	this.shaderManager = graphics.shaderManager;
	this.textureManager = graphics.textureManager;
		
	this.rendersettings = null // DO NOT INSERT OBJECTS INTO RENDERsettings!!
 	
	this.cls_rgba = [0.0, 0.0, 0.3, 1.0];

	this.currentShader = null;
	
	this.renderCalls = 0; 
	this.drawCalls = 0;
									
	this.rendersettings =
	{ 
	} 
	
	this.currentShader		= null;
	this.renderTextured		= false;
	this.currentTextureId = 0;	
	
	this.renderCallTextures = [];
	this.renderCallTexturesCount = 0;
	this.renderCallVertices = 0;	
	
	this.renderBuffer = { 'position': []
						, 'normals': []
						
						, 'color': []
						, 'textureid':  []
						, 'texuv':[]
						, 'textures': []

						, 'resolution': []
						
						, 'worldMatrix': []
						, 'viewMatrix': []
						, 'projMatrix': []
						
						};

	this.initShaders();
	
	//this.graphics.glViewport();			
}
 

jsaf_graphics3d.prototype.initShaders = function()
{
	var path = jsaf.getPath();	
 
	this.textured3dshader = this.shaderManager.createShader('textured3d');
 	this.textured3dshader.useTextures = true;
	
	this.textured3dshader.loadVertexShader	 (path+'graphics/shader/3dVertexShader.glsl.tpl.c');
	this.textured3dshader.loadFragmentShader (path+'graphics/shader/3dFragmentShader.glsl.tpl.c');
								
	this.textured3dshader.createVertexAttribute ('position','vec3')
	.bindBuffer(this.renderBuffer.position);
	
	this.textured3dshader.createVertexAttribute ('normals','vec3')
	.bindBuffer(this.renderBuffer.position);
 	
	this.textured3dshader.createVertexAttribute ('resolution','vec2')
	.bindBuffer(this.renderBuffer.resolution);	

 /*
 	this.textured3dshader.createVertexUniform	  ('worldMatrix','mat4')
	.bindBuffer(this.renderBuffer.worldMatrix);	

 	this.textured3dshader.createVertexUniform	  ('viewMatrix','mat4')
	.bindBuffer(this.renderBuffer.viewMatrix);	

 	this.textured3dshader.createVertexUniform	  ('projMatrix','mat4')
	.bindBuffer(this.renderBuffer.projMatrix);	
	*/
	this.textured3dshader.createFragmentAttribute ('color','vec4')
	.bindBuffer(this.renderBuffer.color);

 	this.textured3dshader.createFragmentAttribute ('textureid','float' )
	.bindBuffer(this.renderBuffer.textureid);
	
 	this.textured3dshader.createFragmentAttribute ('texuv','vec2' )
	.bindBuffer(this.renderBuffer.texuv);
	
 	this.textured3dshader.createFragmentUniform	  ('textures['+this.textureUnits+']','sampler2D')
	.bindBuffer(this.renderBuffer.textures);
 					 
	this.textured3dshader.compile();
	
}