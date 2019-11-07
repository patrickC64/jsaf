jsaf_graphics3d_surface = function ( mesh, brush )
{
	// if no brush given set it to null ( but, why? atm. i don't know)
	this.brush = brush ? brush : null;
	
	// store vertexdata
	this.vertices	= [];
	// store normals
	this.normals	= [];	
}


jsaf_graphics3d_surface.prototype.addTriangle = function ( vertices )
{
	this.vertices = this.vertices.concat( vertices );
	
	console.log ( this.vertices );
}


jsaf_graphics3d_surface.prototype.addVertex = function ( vertex )
{
	this.vertices = this.vertices.concat( vertex );
	
	console.log ( this.vertices );
}
