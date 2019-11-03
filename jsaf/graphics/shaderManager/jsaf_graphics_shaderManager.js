jsaf.use ('graphics/shaderManager/jsaf_graphics_shader.js');
jsaf.use ('graphics/shaderManager/jsaf_graphics_shaderBuffer.js');
 
function jsaf_graphics_shaderManager(graphics)
{	
	this.graphics = graphics;
	this.shaders = {};
	this.currentShader = null;
}


jsaf_graphics_shaderManager.prototype.createShader = function (name)
{
	return this.shaders[name] = new jsaf_graphics_shader(this,name);
}


jsaf_graphics_shaderManager.prototype.useShader = function (shader)
{
	if ( this.currentShader != shader )
	{	
		var gl = this.graphics.gl;
		
		gl.useProgram ( shader.program );

	}
	//console.log ('shader'+shader.name);
  
	this.currentShader = shader;
}