jsaf_graphics3d.prototype.createCamera = function ()
{
	var cam = new jsaf_graphics3d_camera( this );
	
	this.cameras.push(cam);
	
	return cam;	
}


jsaf_graphics3d.prototype.createSprite = function ( texture )
{
	var entity = new jsaf_graphics3d_sprite( texture );

	this.world.push(entity);
	
	return sprite;
}


jsaf_graphics3d.prototype.createPlane = function ()
{
	var entity = new jsaf_graphics3d_entity();
	
	var mesh = new jsaf_graphics3d_mesh ();
	
	var brush = new jsaf_graphics3d_brush( 255, 255, 255 );
	
	var surface = new jsaf_graphics3d_surface(mesh, brush);

	surface.addTriangle ( [ 0.0 ,0.0 ,-1.0 
						  , 1.0 ,0.0 ,-1.0
						  , 0.0 ,0.0 ,-1.0 ] );

	surface.addTriangle ( [ 0.0 ,0.0 , 0.0 
						  , 0.0 ,0.0 ,-1.0
						  , 1.0 ,0.0 ,-1.0 ] );
	
	mesh.updateNormals();
	
	entity.addMesh ( mesh );
	
	this.world.push(entity);	
	
	return entity;
}


jsaf_graphics3d.prototype.createCube = function ()
{
	var mesh = new jsaf_graphics3d_mesh ();
	
	var brush = new jsaf_graphics3d_brush( 255, 255, 255 );
	
	var surface = new jsaf_graphics3d_surface(mesh, brush);

	let v1 = surface.addVertex ( 0, 0, 0);
	let v2 = surface.addVertex ( 1,-1, 0);
	let v3 = surface.addVertex (-1,-1, 0);
	
	surface.addTriangle ( v1, v2, v3 );
	
	mesh.updateNormals();
	
	this.world.push(mesh);	
	
	return mesh;		 
}


jsaf_graphics3d.prototype.createSphere = function ()
{
	var entity = new jsaf_graphics3d_entity();
	
	var mesh = new jsaf_graphics3d_mesh ();
	
	var brush = new jsaf_graphics3d_brush( 255, 255, 255 );
	
	var surface = new jsaf_graphics3d_surface(mesh, brush);

	surface.addTriangle ( [ 0.0 ,0.0 ,0.0 
						  , 0.0 ,0.0 ,0.0
						  , 0.0 ,0.0 ,0.0 ] );

	surface.addTriangle ( [ 0.0 ,0.0 ,0.0 
						  , 0.0 ,0.0 ,0.0
						  , 0.0 ,0.0 ,0.0 ] );
	
	mesh.updateNormals();
	
	entity.addMesh ( mesh );
	
	this.world.push(entity);
		
	return entity;
}


jsaf_graphics3d.prototype.createCone = function ()
{
	var entity = new jsaf_graphics3d_entity();
	
	var mesh = new jsaf_graphics3d_mesh ();
	
	var brush = new jsaf_graphics3d_brush( 255, 255, 255 );
	
	var surface = new jsaf_graphics3d_surface(mesh, brush);

	surface.addTriangle ( [ 0.0 ,0.0 ,0.0 
						  , 0.0 ,0.0 ,0.0
						  , 0.0 ,0.0 ,0.0 ] );

	surface.addTriangle ( [ 0.0 ,0.0 ,0.0 
						  , 0.0 ,0.0 ,0.0
						  , 0.0 ,0.0 ,0.0 ] );
	
	mesh.updateNormals();
	
	entity.addMesh ( mesh );
	
	this.world.push(entity);
	
	return entity;
}



