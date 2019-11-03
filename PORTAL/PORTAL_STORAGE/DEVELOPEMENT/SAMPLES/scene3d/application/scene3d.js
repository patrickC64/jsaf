scene3d.prototype = Object.create ( jsaf.application.prototype );

function scene3d()
{
	jsaf.application.call(this);	
}


scene3d.prototype.init =function ()
{
	this.font = this.graphics2d.loadFont(this.rootpath+"media/font.png",16,16,1);	

	this.createWorld3d();	
}


scene3d.prototype.update =function ()
{
	this.cube.rotate( 0.05*this.deltaTime, 0.1*this.deltaTime, 0.075*this.deltaTime);

	
	if ( this.inputControl.getKeystate( 38 ) == 2 )
	{
		this.cam3d.translate(0,0,  .25);	
	}

	if ( this.inputControl.getKeystate( 40 ) == 2 )
	{
		this.cam3d.translate(0,0, -.25);	
	}
	
	if ( this.inputControl.getKeystate( 37 ) == 2 )
	{
		this.cam3d.translate(-.25,0,0);	
	}

	if ( this.inputControl.getKeystate( 39 ) == 2 )
	{
		this.cam3d.translate( .25,0, 0);	
	}	
	
	this.graphics3d.update(this.deltaTime);		
}


scene3d.prototype.render =function ()
{

	this.graphics3d.render();
	
	var g2d = this.graphics2d;	
	 
 	g2d.resetTransform();
 	
	g2d.setColor(1.0,1.0,1.0,1.0)
 
	g2d.setFont(this.font);
	
	g2d.drawText("fps:"+this.frameCounter.getFps(),10,20);

	g2d.drawText("delta:"+ Math.round(this.deltaTime*10)/10,10,45);

	var txt =  this.cam3d.position[0] + ","+ this.cam3d.position[1] +","+ this.cam3d.position[2] ;
	g2d.drawText("cam pos:"+ txt,10,75);

	txt =  this.cam3d.rotation[0] + ","+ this.cam3d.rotation[1] +","+ this.cam3d.rotation[2] ;
	g2d.drawText("cam rot:"+ txt,10,105);
	 
 	g2d.render();
}


scene3d.prototype.createWorld3d =function ()
{
	this.cam3d = this.graphics3d.createCamera();

	this.cube  = this.graphics3d.createCube();
	
	this.cube.move( 0, 0, 5);
}
