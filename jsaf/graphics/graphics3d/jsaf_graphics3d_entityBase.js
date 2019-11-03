function jsaf_graphics3d_entityBase ()
{
	this.position = [ 0.0, 0.0, 0.0 ];
	this.rotation = [ 0.0, 0.0, 0.0 ];
	this.scale 	  = [ 1.0, 1.0, 1.0 ];
}


jsaf_graphics3d_entityBase.prototype.move = function ( x, y, z )
{
	this.position[0]+=x;
	this.position[1]+=y;
	this.position[2]+=z;
}


jsaf_graphics3d_entityBase.prototype.translate = function ( x, y, z )
{
	this.position[0]+=x;
	this.position[1]+=y;
	this.position[2]+=z;
}


jsaf_graphics3d_entityBase.prototype.rotate = function ( x, y, z )
{
	this.rotation[0]+=x;
	this.rotation[1]+=y;
	this.rotation[2]+=z;
}


jsaf_graphics3d_entityBase.prototype.setPosition = function ( x, y, z )
{
	this.position[0]=x;
	this.position[1]=y;
	this.position[2]=z;
}


jsaf_graphics3d_entityBase.prototype.setRotation = function ( x, y, z )
{
	this.rotation[0]=x;
	this.rotation[1]=y;
	this.rotation[2]=z;
}


jsaf_graphics3d_entityBase.prototype.setScale = function ( x, y, z )
{
	this.scale[0]=x;
	this.scale[1]=y;
	this.scale[2]=z;
}

