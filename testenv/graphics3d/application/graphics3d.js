graphics3d.prototype = Object.create ( jsaf.application.prototype );

function graphics3d()
{
	jsaf.application.call(this);
		
	this.name ='scene2d demo';	
}

graphics3d.prototype.init = function()
{
	console.log ("INIT");
	
	this.font = this.graphics2d.loadFont("../../shared/fonts/default.png",16,16,1);
	
	this.graphics2d.setFont(this.font);
	
}

graphics3d.prototype.update = function()
{

}


graphics3d.prototype.render = function()
{
	var g2d = this.graphics2d;
			
 	g2d.drawText ("JSAF GRAPHICS3D TEST",10,10);


	
	this.graphics2d.render();
}
