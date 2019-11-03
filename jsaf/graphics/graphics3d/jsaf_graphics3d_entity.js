jsaf_graphics3d_entity.prototype = Object.create ( jsaf_graphics3d_entityBase.prototype);

function jsaf_graphics3d_entity ()
{
	jsaf_graphics3d_entityBase.call(this);
	
	this.color = [1.0,1.0,1.0,1.0];	

	this.surfaces = [];
	
}


jsaf_graphics3d_entity.prototype.addMesh = function ( mesh )
{
	
}



