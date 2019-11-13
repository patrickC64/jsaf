function jsaf_graphics_texture (textureManager, w, h, settings)
{
	this.gl = textureManager.gl;
  
	this.texuv = [0,0,1,1];
	
	this.frames =1;
	
	this.width	= w;
	this.height = h; 
	
	this.cellsX 	= 1;
	this.cellsY 	= 1;
	
	this.cellWidth 	= 1;
	this.cellHeight = 1;
	
	this.wrap_s = this.gl.CLAMP_TO_EDGE;
	this.wrap_t = this.gl.CLAMP_TO_EDGE;
	this.filter_mag = this.gl.LINEAR;
	this.filter_min = this.gl.LINEAR;
//	this.filter_mag = this.gl.NEAREST;
//	this.filter_min = this.gl.NEAREST;
	
	
	if ( settings )
	{
		if ( settings.wrap_t )
			this.wrap_s = settings.wrap_s;

		if ( settings.wrap_t)
			this.wrap_t =settings.wrap_t;
		
		if ( settings.filter)
		{
			this.filter_min = settings.filter;
			this.filter_mag = settings.filter;
		}
 		
		if ( settings.filter_min)
	 		this.filter_min = settings.filter_min;

		if ( settings.filter_mag)
	 		this.filter_mag = settings.filter_mag;
		
	}

	this.glTexture = null;
}

jsaf_graphics_texture.prototype.init = function ()
{ 	
	var gl = this.gl;
	
	this.glTexture = gl.createTexture();

	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);

	var pxlData = [];
	for (var i = 0; i < this.width * this.height ;i++)
	{
		pxlData[i*4		]=0;
		pxlData[i*4 +1  ]=0;
		pxlData[i*4 +2  ]=0;
		pxlData[i*4 +3  ]=0;
	}
	
	// Fill the texture  
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA,  this.width ,  this.height , 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array( pxlData ) )
 
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER, this.filter_min );
	gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER, this.filter_mag );

	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.wrap_s );
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.wrap_t );
	
}

jsaf_graphics_texture.prototype.createTextureAtlas = function ( cellsX, cellsY , width, height )
{
	if ( width )
	{
		this.width = width;
		this.height = height;	
	}
	
	this.frames = (cellsX*cellsY);
	
	this.cellsX = cellsX;
	this.cellsY = cellsY;
	
	this.cellWidth = this.width/ cellsX;
	this.cellHeight = this.height/ cellsY;
 
	this.cellTexWidth = this.cellWidth/this.width;
	this.cellTexHeight = this.cellHeight/this.height;
  
	var texoffx = 0;
	var texoffy = 0;
	
	for (frame=0;frame<this.frames;frame++)
	{	
		texoffx =  (this.cellTexWidth	)* (frame % this.cellsX );
		texoffy =  (this.cellTexHeight	)*Math.floor( frame/this.cellsX);

		this.texuv[frame]=[ texoffx, texoffy ,texoffx+this.cellTexWidth ,texoffy+this.cellTexHeight];		
	}	
		
}