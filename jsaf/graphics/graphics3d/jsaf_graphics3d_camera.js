jsaf_graphics3d_camera.prototype = Object.create ( jsaf_graphics3d_entityBase.prototype);

jsaf_graphics3d_camera.PERSPEKTIVE_CAMERA = 0;
jsaf_graphics3d_camera.ORTHOGONAL_CAMERA = 1;


function jsaf_graphics3d_camera  (graphics3d)
{
	jsaf_graphics3d_entityBase.call(this);
	
	this.graphics3d = graphics3d;

	this.projection = jsaf_graphics3d_camera.PERSPEKTIVE_CAMERA;

	this.zfar		= 100.0;
	this.znear		= 0.0;
	
	this.fog		= 0;
	this.fogColor	= [1.0,1.0,1.0];
	
	this.viewMatrix = null;
	
}


jsaf_graphics3d_camera.prototype.update = function ()
{

	
	
}


jsaf_graphics3d_camera.prototype.render = function ()
{	
	let gl = this.graphics3d.gl;
	
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER );
	
	
	
}