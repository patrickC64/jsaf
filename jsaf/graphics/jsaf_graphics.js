jsaf.graphics = jsaf_graphics;

jsaf.use("graphics/shaderManager/jsaf_graphics_shaderManager.js");
jsaf.use("graphics/jsaf_graphics_textureManager.js");
jsaf.use("graphics/jsaf_graphics_texture.js");

jsaf.use("3dParty/gl-matrix/gl-matrix.js");


jsaf_graphics.prototype.SOLID_BLEND = 0;
jsaf_graphics.prototype.MASK_BLEND  = 1;	
jsaf_graphics.prototype.ALPHA_BLEND = 2;
jsaf_graphics.prototype.LIGHT_BLEND = 3;
jsaf_graphics.prototype.SHADE_BLEND = 4;
	
function jsaf_graphics( canvasID , resx, resy )
{
	if ( !resx )
	{ 
		var resx = window.screen.width;
		var resy = window.screen.height;		
	}
 
	this.canvas = document.getElementById(canvasID);

	window.addEventListener ('resize', function() { this.syncCanvasViewport(); }.bind(this) );
	
	var contextOptions = null;
		
	contextOptions = { 'antialias': false, 'preserveDrawingBuffer': false, 'alpha':false, 'premultipliedAlpha':false };
	this.gl = this.canvas.getContext("experimental-webgl", contextOptions);
	

	if (!this.gl) 
	{
		this.gl = this.canvas.getContext("webgl" , contextOptions);
		
		if (!this.gl) 
		{
			alert("NO WEBGL IN YOUR ENVIRONMENT POSSIBLE!");
			return;
		}
	}	
	
	document.getElementsByTagName('body')[0].onunload = function () { console.log("CLOSE WEBGL CONTEXT!");this.gl.getExtension('WEBGL_lose_context').loseContext() }.bind(this);
 	
	this.shaderManager = new jsaf_graphics_shaderManager (this);
	this.textureManager = new jsaf_graphics_textureManager (this.gl);

	this.resolution  = [resx, resy];
	
	this.pixelRatio  = [1.0,1.0];					
	this.viewport	 = null;				
	this.blendmode	 = this.SOLID_BLEND;
	
	this.textureUnits = this.gl.getParameter(this.gl.MAX_TEXTURE_IMAGE_UNITS );
	//this.precession = this.gl.getParameter(this.gl.MAX_TEXTURE_IMAGE_UNITS );
			
	this.origin = [0,0];
	
	this.syncCanvasViewport();
	
	this.setResolution ( resx, resy );
	
	this.rgb = [1.0,1.0,1.0];
}


// @TODO: implement corret(named!)  & more Blenmodes! (for 2D works fine, but naming conventions are ignored!)
jsaf_graphics.prototype.setBlendmode = function (mode)
{ 	
	if(this.blendmode == mode)return;

	var gl = this.gl;
  
	this.blendmode = mode;
	
	switch (mode)
	{
		case this.LIGHT_BLEND:  
			gl.enable(gl.BLEND);
			gl.blendFunc (gl.SRC_ALPHA,gl.DST_ALPHA);
		break;
		
		case this.SHADE_BLEND:  
			gl.enable(gl.BLEND);
			gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_COLOR,gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
		break;

		case this.ALPHA_BLEND:  
		//	gl.enable(gl.BLEND);
		//	gl.blendFunc (gl.SRC_ALPHA,gl.ONE_MINUS_SRC_COLOR);
			gl.enable(gl.BLEND);
			gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);					 
		break;

		
		case this.MASK_BLEND: // alpha blend
			gl.enable(gl.BLEND);
			gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);					 
		break;
	
		case this.ALPHA_BLEND2: // alpha blend
			gl.enable(gl.BLEND);
			gl.blendFunc (gl.SRC_ALPHA,gl.ONE_MINUS_SRC_COLOR);
			
		break;
			
		default: // lwgl_context.SOLID_BLEND
			gl.disable(gl.BLEND);
			
	}

}


jsaf_graphics.prototype.syncCanvasViewport = function ( )
{ 
	this.canvas.width	=  ( this.canvas.clientWidth  * window.devicePixelRatio);
	this.canvas.height	=  ( this.canvas.clientHeight * window.devicePixelRatio);
	
	this.pixelRatio[0]= ( this.canvas.width /this.resolution[0] ); 
	this.pixelRatio[1]= ( this.canvas.height/this.resolution[1] );
 
	this.gl.viewport(0, 0, this.canvas.width ,this.canvas.height); 
}


jsaf_graphics.prototype.setResolution = function (resx,resy)
{ 
	this.resolution = [ resx, resy ];	
 
	this.pixelRatio[0]= ( this.canvas.width /this.resolution[0] ) ; 
	this.pixelRatio[1]= ( this.canvas.height/this.resolution[1] ) ; 
}


jsaf_graphics.prototype.getResolution = function ( )
{			
	return [ this.resolution[0], this.resolution[1] ];	
}


jsaf_graphics.prototype.enableViewport = function ( x, y, w, h )
{
	this.viewport = [x,y,w,h];

	var pixelRatio =  this.pixelRatio;
	
	this.viewport = [x,y,w,h];
	
	x= Math.round ( x * pixelRatio[0])
	w= Math.round ( w * pixelRatio[0])

	y= Math.round ( ( this.resolution[1]-y-h  )*this.pixelRatio[1] );
	h= Math.round ( h * pixelRatio[1] )
 
	this.gl.enable  (this.gl.SCISSOR_TEST);
	
 	this.gl.scissor ( x, y ,w, h );
}
 

jsaf_graphics.prototype.disableViewport = function ()
{
	this.gl.disable (this.gl.SCISSOR_TEST);
	this.viewport = [ 0, 0, this.resolution[0], this.resolution[1] ];	
}