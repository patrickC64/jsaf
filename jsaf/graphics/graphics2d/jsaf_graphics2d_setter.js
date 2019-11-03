jsaf_graphics2d.prototype.setClsColor = function ( r,g,b,a )
{
	this.cls_rgba = [r,g,b,a]; 
}


jsaf_graphics2d.prototype.setColor = function ( r,g,b )
{										
	this.rendersettings.vertexColor = [r*this.graphics.rgb[0],g*this.graphics.rgb[1],b*this.graphics.rgb[2]];
	
	this.rendersettings.vertexColor[3]=this.rendersettings.alpha;	
}

jsaf_graphics2d.prototype.setVertexColor = function ( v )
{	
	this.rendersettings.vertexColor = v;
}

jsaf_graphics2d.prototype.setVertexRGBA = function ( vf_RGBA )
{
	this.rendersettings.vertexColor = vf_RGBA.slice ();
}


jsaf_graphics2d.prototype.setAlpha = function ( alpha )
{
	this.rendersettings.alpha = alpha;
	this.rendersettings.vertexColor[3]= alpha;
}


jsaf_graphics2d.prototype.setScale = function ( scaleX,scaleY )
{
	this.rendersettings.scale = [scaleX,scaleY];	
}


jsaf_graphics2d.prototype.setRotation = function ( fRotation )
{
	this.rendersettings.rotation = fRotation;
}


jsaf_graphics2d.prototype.setAutoMidHandle = function ( automidhandle )
{
	this.rendersettings.automidhandle = automidhandle;
}


jsaf_graphics2d.prototype.setHandle = function ( handleX, handleY )
{
	this.rendersettings.handle = [handleX, handleY];
}


jsaf_graphics2d.prototype.setBlendmode = function ( blendmode )
{	
	if( this.currentBlendmode == blendmode)
	 	return;
 
	this.currentBlendmode = blendmode;

	this.renderBufferData ( this.currentPrimitive );

	this.graphics.setBlendmode(blendmode);
}


jsaf_graphics2d.prototype.setOrigin = function ( x,y )
{
	this.rendersettings.origin = [x,y];
}

jsaf_graphics2d.prototype.setFont = function (font)
{
	this.currentFont = font;
}

jsaf_graphics2d.prototype.enableViewport = function ( x,y,w,h )
{ 
	this.renderBufferData (   );
	
	this.graphics.enableViewport( x , y , w , h );
}



jsaf_graphics2d.prototype.disableViewport = function ()
{	
	this.renderBufferData (  );

	this.graphics.disableViewport();
	
	this.renderBufferData (  );	
}	


jsaf_graphics2d.prototype.resetTransform = function ( )
{
	this.setRotation(0);
	this.setScale(1,1);
}


jsaf_graphics2d.prototype.setResolution = function ( resx, resy )
{	
	this.renderBufferData (  );	
	
	this.graphics.setResolution(resx,resy);
	
	this.renderBuffer.resolution [0] =   this.graphics.resolution[0]; 
	this.renderBuffer.resolution [1] =   this.graphics.resolution[1]; 		
}


jsaf_graphics2d.prototype.setRenderTarget = function ( target )
{
	this.render ();
	
	var gl = this.gl;
	
	if ( target )
	{			
		// Create and bind the framebuffer
		var fb = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  
		// attach the texture as the first color attachment
		var attachmentPoint = gl.COLOR_ATTACHMENT0;
		gl.framebufferTexture2D(	gl.FRAMEBUFFER, attachmentPoint, gl.TEXTURE_2D
								,	target.texture.glTexture, 0);
								
		var wx = target.texture.width  //* window.devicePixelRatio;
		var wy = target.texture.height  //* window.devicePixelRatio;
 
		this.resolution = this.graphics.getResolution();
		
		this.setResolution( wx   , wy   );
				
		gl.viewport(0,  0  , wx   , wy  );
 
	} 
	else
	{
		

		
		gl.bindFramebuffer(gl.FRAMEBUFFER, null );
		
		this.setResolution(this.resolution[0],this.resolution[1]);
 
	  	this.graphics.syncCanvasViewport()
	}
}
