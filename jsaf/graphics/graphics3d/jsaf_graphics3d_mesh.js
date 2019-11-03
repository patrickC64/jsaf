jsaf_graphics3d_mesh.prototype = Object.create ( jsaf_graphics3d_entityBase.prototype);

function jsaf_graphics3d_mesh ( parent )
{
	jsaf_graphics3d_entityBase.call(this);

	this.parent   = parent;
	
	this.position = [0.0, 0.0, 0.0 ];
	this.rotation = [0.0, 0.0, 0.0 ];
	this.scale 	  = [1.0, 1.0, 1.0 ];

	this.surfaces = [];	
}


jsaf_graphics3d_mesh.prototype.addMesh = function ( surface )
{
	
}


jsaf_graphics3d_mesh.prototype.updateNormals = function ( )
{
	
}