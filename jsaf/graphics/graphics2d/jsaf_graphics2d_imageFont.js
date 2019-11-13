jsaf_graphics2d_imageFont.prototype = Object.create ( jsaf_graphics2d_font.prototype );

function jsaf_graphics2d_imageFont( graphics2d )
{
	jsaf_graphics2d_font.call ( this, graphics2d );
}



jsaf_graphics2d_imageFont.prototype.loadFont = function (url, cellsX, cellsY)
{
	var gl = this.graphics2d.gl;
	
	var settings = {
				    'filter':gl.LINEAR
				   } ;
 
	this.image = this.graphics2d.loadAnimImage ( url, cellsX, cellsY, settings );
 
}
 

jsaf_graphics2d_imageFont.prototype.drawText = function ( text, x, y, center)
{
	if( !this.image || this.image.texture == null)
		return;

	text+='';
	
	var scale = this.graphics2d.getScale();

	var texture = this.image.texture;
	
	var cellWidth =  texture.cellWidth;

	var xoff = x;
	var yoff = y;

	// draw each glyph seperate
	for(c=0;c<text.length;c++)
	{	
		if (text.charCodeAt(c) == 10 )
		{
			yoff += texture.cellHeight;
			
			xoff = v[0];
		}
	 
		this.drawChar( text.charCodeAt(c) , xoff , yoff);
		
			xoff += (cellWidth *.525)* scale[0];

		if (this.letterSpacing !=0 )
			xoff += this.letterSpacing * scale[1];
		
	}
 
}


jsaf_graphics2d_imageFont.prototype.drawChar = function ( char, x, y)
{	
	this.graphics2d.pushRenderData ( this.graphics2d.QUAD, [ x, y, this.image.texture.cellWidth, this.image.texture.cellHeight], this.image.texture, char);	
}

