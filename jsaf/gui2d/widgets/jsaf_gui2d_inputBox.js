jsaf_gui2d_inputBox.prototype = Object.create(jsaf_gui2d_widget.prototype)

function jsaf_gui2d_inputBox(  x, y, w, h )
{ 
	jsaf_gui2d_widget.call( this, 'inputBox', x, y, w, h );
	
	this.text = '';
	
	this.alignment = 1;

	this.numeric = false;
	this.maxlen = null;
	this.cursorPos=[1,1];
	this.glyphWidth = 14;
 
	this.addEventHandler (	this.ON_INIT, this.onInit );	
}

jsaf_gui2d_inputBox.prototype.onKeyPress = function (k)
{
	var text = this.text.toString();

	var l= text.length;
	
	switch (k)
	{
		case 8:
			if( l>0 )
			{
				text = text.substr(0,l-1);
				this.cursorPos[0]-=1;
			}
			
			k=0;	
			break;
		
		default:
			if(k<32 || k>65+46)
				k=0;
			
	}
 
	if (this.maxlen!=null  && l>this.maxlen-1)
		k=0;

	if( this.numeric && (k <47 || k >57) )
		k=0;

	if(k!=0)
	{
		this.cursorPos[0]+=1;
		text+=String.fromCharCode(k);
	}			
/*
	if (this.onInput != null)
		this.onInput(this);

	if (this.onChanged != null && this.text !=text)
		this.onChanged(this);
*/
	this.text = text;

}

jsaf_gui2d_inputBox.prototype.onInit = function ()
{
	this.addEventHandler (	this.ON_KEY_PRESS	, this.onKeyPress );
	this.addEventHandler (	this.ON_KEY_DOWN	, this.onKeyPress );
}


jsaf_gui2d_inputBox.prototype.render = function ()
{
	var g = this.getRenderContext();

	var rc = this.getRenderCoords();
	
	rc = [ rc[0],rc[1],rc[2],rc[3] ];
	
	var skin = this.getSkin();
	
	g.resetTransform( );
 
	skin.drawImageV ( 'background', rc );
 	
	var text = this.text.toString();
	var ox = 0;
	var gw = this.glyphWidth;
	
	if ( this.alignment == 1 )
	{
		ox = (rc[2]+4)/gw;
	}
	
	var gspace = Math.round((rc[2]-4)/gw);
	
	if ( text.length > gspace ) 
	{
		text = text.substr ( (text.length - gspace ) );
	}
	
	var cp = [rc[0]+2, rc[1]+3, 2,20 ]; 
	
	rc[0]-=ox+1-16;
	rc[1]+=   1;
	
	skin.drawTextV ( 0, text, rc );
	
	if (this.gui.focusWidget == this)
	{
		var cursorPos = this.cursorPos[0];
		
		if ( cursorPos > gspace+1 )
			cursorPos = gspace+1;
		
		cursorPos =  ( ( cursorPos ) *( (gw *.95) )  )-9;//text.length
		
		cp[0]+= cursorPos;
	 	
		if ( this.gui.ticker%30<10)
		{
			g.resetTransform();
			skin.useColor ( 'cursor' );

			g.drawRectV ( cp );
		}
	}
		
}


