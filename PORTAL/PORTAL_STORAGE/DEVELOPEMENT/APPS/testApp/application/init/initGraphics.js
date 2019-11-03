testApp.prototype.initGraphics = function ()
{
	this.graphics	= new jsaf_graphics		( 'rendercanvas', 1024,768 )

	this.graphics2d	= new jsaf_graphics2d	( this.graphics )
		
	this.graphics2d.setClsColor (0,0,0,0);
}

