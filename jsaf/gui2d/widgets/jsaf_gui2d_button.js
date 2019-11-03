jsaf_gui2d_button.prototype = Object.create(jsaf_gui2d_widget.prototype)
 
function jsaf_gui2d_button(text, x,y,w,h)
{
	jsaf_gui2d_widget.call(this,'button', x, y, w, h);

	this.text		= text;

	this.addEventHandler ( this.ON_MOUSE_DOWN, function (){this.buttonState =1;} );
	this.addEventHandler ( this.ON_MOUSE_UP, function (){this.buttonState =0;} );
 
	this.buttonState = 0;
}


jsaf_gui2d_button.prototype.render = function ()
{	
	var g = this.getRenderContext();
	
	g.resetTransform();

	var skin = this.getSkin();
	var rc = this.getRenderCoords();
	
	skin.drawImageV ( 'border', rc );
	
	rc = this.getRenderCoords();
	
	rc = [ rc[0],rc[1],rc[2],rc[3] ];
	
	rc = jsaf_math_rectangleResize (rc,-1);
	
	skin.drawImageV ( 'background', rc );

	var tx = rc[0];
	var ty = rc[1];
	
	var state = this.buttonState;

	//if ( this.gui.mouseOverWidget != this )
	//	state = 0;
	
	if ( state == 1 )
	{	
		tx+=1;
		ty+=1;
	}
	
	skin.drawTextV ( 0 , this.text, [ tx,ty+1 ]  );
	
	g.resetTransform();

	g.setAlpha(.4);

	
	if ( state ==0 )
		g.setColor(.8,.8,.8);
	else
		g.setColor(.4,.4,.4);
		
	g.drawImageRect ( skin.images.background.image,  rc[0],rc[1]+1, rc[2], 1 );
	g.drawImageRect ( skin.images.background.image,  rc[0] ,rc[1], 1 , rc[3]  );

	if ( state == 0 )
		g.setColor(.4,.4,.4);
	else
		g.setColor(.8,.8,.8);

	g.drawImageRect ( skin.images.background.image,  rc[0],rc[1]+rc[3]-1, rc[2], 1 );
	g.drawImageRect ( skin.images.background.image,  rc[0]+rc[2]-1 ,rc[1], 1 ,  rc[3]  );
	
}

