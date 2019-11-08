jsaf_graphics3d_surface = function ( mesh, brush )
{
	// if no brush given set it to null ( but, why? atm. i don't know)
	this.brush = brush ? brush : null;
	this.mesh  = mesh ? brush : mesh;
				
	// store vertexdata
	this.vertices	= [];
	this.triangles   = [];
	this.texuvw = []
	// store normals (do we need this realy?)
	this.normals	= [];	
	
	
}


jsaf_graphics3d_surface.prototype.addTriangle = function ( v1,v2,v3 )
{
	// returns TriangleIndex
	return this.mesh.triangles.push ( [v1,v2,v3] );
}


jsaf_graphics3d_surface.prototype.addVertex = function ( x, y, z ) // [ ,u ,v ,w] (TODO!)
{	
	this.texuvw.push ( [ 0.0, 0.0, 1.0 ] );
	
	// returns VertexIndex
	return this.mesh.vertices.push( [ x, y, z ] );					
}
