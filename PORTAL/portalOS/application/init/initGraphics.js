portalOS.prototype.initGraphics = function ()
{
	this.graphics	= new jsaf_graphics ( 'jsafRenderCanvas', 1024,768 );

	this.graphics2d	= new jsaf_graphics2d ( this.graphics );
		
	this.graphics2d.setClsColor (0,0,0,0);

 	this.font = this.graphics2d.loadImageFont ( "media/font.png",16,16,2);

	this.graphics2d.setFont ( this.font);


			
}

