jsaf_gui2d_textbox.prototype = Object.create(jsaf_gui2d_widget.prototype)

function jsaf_gui2d_textbox( text, x, y, w, h )
{
	jsaf_gui2d_widget.call( this, 'textBox', x, y, w, h );
	
	this.text = text;
	
	this.color		= [.6,.6,.6];
	
	this.alignment = 1;

	this.numeric = false;
	this.maxlen = null;
	this.corsorPos=[1,1];
	this.glyphWidth = 14;

}

jsaf_gui2d_textbox.prototype.update = function ()
{
	jsaf_gui2d_widget.prototype.update.call(this)

	if (this.gui2d.focusWidget == this)
	{	
		var k = this.gui2d.inputCntl.getKeyHit();
		if (k)
		{	
			var text = this.text.toString();

			var l= text.length;
			
			if( k == 8 && l>0 )
			{	text = text.substr(0,l-1);
				k=0;
			}
 
			if (this.maxlen!=null  && l>this.maxlen-1)
				k=0;

			if( this.numeric && (k <47 || k >57) )
				k=0;

			if(k)text+=String.fromCharCode(k);
						
			

			if (this.onInput != null)
				this.onInput(this);

			if (this.onChanged != null && this.text !=text)
				this.onChanged(this);

			this.text = text;

		}

	}
}


jsaf_gui2d_textbox.prototype.render = function ()
{		
	var g = this.gui2d.graphics;

	var rc = this.getRenderCoords();

	g.resetTransform();
	
	g.setColor (this.textColor[0], this.textColor[1], this.textColor[2]);
	
	var text = this.text.toString();
	var ox = 0;
	var gw = this.glyphWidth;
	
	if ( this.alignment == 1 )
	{
		ox = (rc[2]+4)/gw;
	}
	
	g.drawText ( text, rc[0]-sze/2+ox, rc[1]-sze/2);

	if (this.gui2d.focusWidget == this)
	{
		var cx  =  3+ ( this.corsorPos[0]*gw);
			
		if ( this.gui2d.ticker%30<20)
		{
			g.setColor (this.cursorColor[0], this.cursorColor[1], this.cursorColor[2]);

			g.drawImageRect ( this.skin.image[0], rc[0]+cx, rc[1]+1 ,2,rc[3]-2);
		}
	}
		
}


