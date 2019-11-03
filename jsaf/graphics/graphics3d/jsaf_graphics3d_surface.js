jsaf_graphics3d_surface = function ( mesh, brush )
{
	this.brush = brush ? brush : null;
	
	this.triangles = [];
	this.normals = [];	
}


jsaf_graphics3d_surface.prototype.addTriangle = function ( triangle )
{
	this.triangles.push( triangle );
}