function jsaf_graphics2d_image( )
{
 	this.maskColor = null;
	
	this.frames = 1;
	this.anim = false;
	
	this.width = 1;
	this.height = 1;
	
	this.texture = null;
}


jsaf_graphics2d_image.prototype.createAnimImage = function ( cw, ch , cx, cy) // cell-Width/Height, cells-X/Y
{
	var image = new jsaf_graphics2d_image ();
 	
	image.texture = this.textureManager.createTexture( w, h, settings );
  	image.width = w;
	image.height = h;
	
	return image;
}


jsaf_graphics2d.prototype.createImage = function ( w, h , settings )
{
	var image = new jsaf_graphics2d_image ();
 	
	image.texture = this.textureManager.createTexture( w, h, settings );
  	image.width = w;
	image.height = h;
	
	return image;
}


jsaf_graphics2d.prototype.loadImage = function (url, settings)
{
	var image = new jsaf_graphics2d_image ();
 
	var textureLoadSuccess = function ()
	{	
		this.width = this.texture.width;
		this.height = this.texture.height;
		
	}.bind(image);

	
	if ( !settings )
		settings ={};
	
	
	if ( !settings || !settings.filter)
		settings.filter= this.gl.LINEAR;
				   	
				   
	image.texture = this.textureManager.loadTexture(url, settings, textureLoadSuccess);
  	
	return image;
}


jsaf_graphics2d.prototype.loadAnimImage = function (url, cellsX, cellsY , settings )
{	
	var image = new jsaf_graphics2d_image ();
	
	image.anim	 = true;	
		
	var textureLoadSuccess = function ()
	{			
		var texture = this.texture;
		
		texture.createTextureAtlas ( cellsX, cellsY )	
		
		image.frames = texture.frames;	
		image.width	 = texture.cellWidth;
		image.height = texture.cellHeight;		

		image.cellsX = cellsX;
		image.cellsY = cellsY;

		
	}.bind(image);
				   	
	image.texture = this.textureManager.loadTexture(url, settings, textureLoadSuccess);
 
	return image;
}



jsaf_graphics2d.prototype.textureMaskColor = function ( texObj_owner, r, g, b)
{
	texObj_owner.maskColor = [r,g,b];	
}