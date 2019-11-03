jsaf_graphics2d.prototype.drawPoint = function ( x, y)
{
	this.pushRenderData ( this.POINT, [ x, y] );
}


jsaf_graphics2d.prototype.drawLine = function ( x1, y1, x2, y2 )
{
	this.pushRenderData ( this.LINE, [x1, y1, x2, y2 ]);
}
 
 
jsaf_graphics2d.prototype.drawOval = function ( x1, y1, rx, ry ,fill )
{
		
}
 
 
jsaf_graphics2d.prototype.drawRect = function ( x, y, w, h, unfilled)
{
	if ( typeof (unfilled) === 'undefined' || unfilled === false )
		this.pushRenderData ( this.QUAD, [ x, y, w, h ]);
	else
		this.pushRenderData ( this.QUAD_UNFILLED, [ x, y, w, h ]);
}
 

jsaf_graphics2d.prototype.drawImage = function (img, x, y )
{
	this.pushRenderData ( this.QUAD, [ x, y, img.width, img.height], img.texture, 0);
}


jsaf_graphics2d.prototype.drawImageRect = function (img, x, y, w, h)
{
	this.pushRenderData ( this.QUAD, [ x, y, w, h ], img.texture, 0);
}


jsaf_graphics2d.prototype.drawAnimImage = function (img, x, y, frame)
{
	this.pushRenderData ( this.QUAD, [ x, y, img.width,img.height], img.texture, frame);
}


jsaf_graphics2d.prototype.drawAnimImageRect = function (img, x, y, w, h, frame)
{
	this.pushRenderData ( this.QUAD, [ x, y, w, h ], img.texture, frame);
}

jsaf_graphics2d.prototype.drawText = function ( text, x, y , center)
{	
	if ( this.currentFont )
		this.currentFont.drawText ( text, x, y, center );
} 


jsaf_graphics2d.prototype.drawLines = function ( verticesVV ,x ,y )
{	
	var last;
	var vertex;
	
	verticesVV.forEach ( function ( vertices )
	{
		last = vertices[0]
		
		for ( var i = 1; i< vertices.length; i++)
		{
			vertex = vertices[i];
			
			this.drawLine ( last.x+x, last.y+y, vertex.x+x, vertex.y+y );
			
			last = { x:vertex.x, y:vertex.y };		
		}
		
	}.bind(this));
}


jsaf_graphics2d.prototype.drawPolygon  = function ( vertices ,x ,y )
{	
	if ( !vertices )
		return;
 
	
	var rvertices =[];

	for ( var i = 0; i< vertices.length; i+=2)
	{
		rvertices[i  ] =  (vertices[i  ]+x);
		rvertices[i+1] =  (vertices[i+1]+y);			
	}
 
	this.pushRenderData ( this.POLYGON, rvertices );
}


jsaf_graphics2d.prototype.drawPolygons = function ( poligonsV )
{
	var curCoord = vertices[0];
	var vertex;
	
	for ( var i = 0; i< vertices.length; i++)
	{
		vertex = vertices[i];
		
		this.drawPolygon ( curCoord.x, curCoord.y, vertex.x, vertex.y );
		
		curCoord = { x:vertex.x, y:vertex.y };		
	}
	
}
