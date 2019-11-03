jsaf_graphics2d.prototype.drawPolygonPath = function ( polygonPath, style )
{
	
	var curCoord = [0,0];
	
	polygonPath.vertices.forEach ( function ( vertex )
	{

		this.drawLine ( curCoord[0], curCoord[1], vertex[1], vertex[2] );

		
		curCoord = [ step[1], step[2] ];
		
	}.bind(this) );

}