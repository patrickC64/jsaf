jsaf_gui2d_imageButton.prototype = Object.create(jsaf_gui2d_widget.prototype)

function jsaf_gui2d_imageButton(image, x,y,w,h)
{
	jsaf_gui2d_widget.call( this, 'imageButton' , x, y, w, h );

	this.image = image;
	this.frame = 0;
	this.flip  = [1,1];
	
	this.fade = .5;
	this.fadeMult = 1.0;
	this.fadeMin = 0.5;
	this.fadeMax = 0.85;
	
	this.addEventHandler ( this.ON_RENDER_END, this.onRenderEnd );	
	this.addEventHandler ( this.ON_MOUSE_HOVER , this.fadeIn );	
	this.addEventHandler ( this.ON_MOUSE_LEAVE, this.fadeOut);	
	
	this.fadeHandler = null;
}

jsaf_gui2d_imageButton.prototype.updateFade = function ()
{	
	this.fade*=this.fadeMult;
	
	var removeFadeHandler = false;
	
	if(this.fade>this.fadeMax)
	{
		this.fade=this.fadeMax;
		removeFadeHandler = true;
	}

	if(this.fade<this.fadeMin)
	{
		this.fade=this.fadeMin;
		removeFadeHandler = true;		
	}
	
	//@TODO: add Callbabacks for FadeHandler, needs remove Events in Eventupdate!
}
	
	
jsaf_gui2d_imageButton.prototype.fadeIn = function ()
{  
	this.fadeMult =1.025;							
}

jsaf_gui2d_imageButton.prototype.fadeOut = function ()
{  
	this.fadeMult =0.98;							
}

jsaf_gui2d_imageButton.prototype.onRenderEnd = function ()
{ 
 
	if (this.fadeMult != this.fadeMin && this.fadeMult != this.fadeMax )
		this.updateFade();

	var image = this.image;
	
	var g = this.getRenderContext();
	var rc = this.getRenderCoords();
	
	var skin = this.getSkin();
	
	var flip = this.flip;
	
	g.resetTransform();
	
	g.setScale ( 1*flip[0], 1*flip[1]);
	
	skin.useDefaultColor();

	var f = this.fade;

	skin.useColorIfExists('image', [ f, f, f, f] ); 
	
	if ( flip[0] <1 )
		rc[0]-=flip[0]*rc[2];

	if ( flip[1] <1 )
		rc[1]-=flip[1]*rc[3];
 	
	if ( image.anim )
	{
		g.drawAnimImageRectV( image, rc,this.frame);	
	}
	else
		g.drawImage( image, rc[0],rc[1]);

 
}

