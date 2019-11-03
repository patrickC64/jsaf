jsaf_graphics3d_sprite.prototype = Object.create (jsaf_graphics3d_entity.prototype);

function jsaf_graphics3d_sprite ( texture )
{
	jsaf_graphics3d_entity.call ( this );
	
	var sprite = new jsaf_graphics3d_sprite();
	
	var mesh = new jsaf_graphics3d_mesh ();
	
	var brush = new jsaf_graphics3d_brush( 255, 255, 255 );
	
	var surface = new jsaf_graphics3d_surface(mesh, brush);
	
	surface.addTriangle ( [ 0.0 ,1.0 ,0.0 
						  , 1.0 ,1.0 ,0.0
						  , 0.0 ,0.0 ,0.0 ] );

	surface.addTriangle ( [ 1.0 ,1.0 ,0.0 
						  , 1.0 ,0.0 ,0.0
						  , 0.0 ,0.0 ,0.0 ] );
	
	sprite.updateNormals();
	
	return sprite;
}
