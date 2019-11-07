graphics3d.prototype = Object.create ( jsaf.application.prototype );

function graphics3d()
{
	jsaf.application.call(this);
		
	this.name ='Graphics3D Demo';	
}

graphics3d.prototype.init = function()
{
	console.log ("INIT");
	
	this.font = this.graphics2d.loadFont("../../shared/fonts/default.png",16,16,1);
	
	this.graphics2d.setFont(this.font);
	
	var g3d = this.graphics3d;
	
	this.cam3d = g3d.createCamera();
	
	this.cube = g3d.createCube();
	
	this.cube.setPosition ( 0,0, -5 );
	
}

graphics3d.prototype.update = function()
{

}


graphics3d.prototype.render = function()
{
	var g2d = this.graphics2d;
	var g3d = this.graphics3d;
			
 	g2d.drawText ("JSAF GRAPHICS3D TEST",10,10);

	

	this.graphics3d.render();
	this.graphics2d.render();
}
