jsaf_graphics2d_vertexPath = function ()
{
	this.path = [];
}

jsaf_graphics2d_vertexPath.prototype.beginPath = function ()
{
	this.path.push ( [0,0,0] );

}


jsaf_graphics2d_vertexPath.prototype.closePath = function ()
{
 
}


jsaf_graphics2d_vertexPath.prototype.moveTo = function ( x, y)
{
	this.path.push ( [0,x,y] );
}


jsaf_graphics2d_vertexPath.prototype.lineTo = function ( x, y )
{
	this.path.push ( [1,x,y] );
}


jsaf_graphics2d_vertexPath.prototype.bezierCurveTo = function ( x1, y1, x2, y2, x, y)
{
	this.path.push ( [1,x,y] );
}

jsaf_graphics2d_vertexPath.prototype.quadraticCurveTo = function ( x1, y1,  x,  y)
{
	this.path.push ( [1,x,y] );
}

