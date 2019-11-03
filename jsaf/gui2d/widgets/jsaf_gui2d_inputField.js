jsaf_gui2d_inputField.prototype = Object.create(jsaf_gui2d_widget.prototype)

function jsaf_gui2d_inputField( text, x, y, w, h )
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

jsaf_gui2d_inputField.prototype.update = function ()
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


jsaf_gui2d_inputField.prototype.onRenderBegin = function ()
{		
	var g = this.getRenderContext();

	var rc = this.getRenderCoords();

	g.resetTransform( );
		
	g.setColorV ( this.gui.skin.color.background );	
 
	g.drawImageRectV( this.gui.skin.bg, rc);

	
	var text = this.text.toString();
	var ox = 0;
	var gw = this.glyphWidth;
	
	if ( this.alignment == 1 )
	{
		ox = (rc[2]+4)/gw;
	}
	
	g.setScaleV ( this.gui.currentFont.scale );
	g.setColorV ( this.gui.currentFont.color );

 	g.drawText ( text, rc[0]+ox, rc[1] );

	
	if (this.gui.focusWidget == this)
	{
		var cx  =  3+ ( this.corsorPos[0]*gw);
			
		if ( this.gui.ticker%30<20)
		{
			g.setColorV ( this.gui.skin.widget.inputBox.color.cursor );

			//g.drawImageRect ( this.skin.image[0], rc[0]+cx, rc[1]+1 ,2,rc[3]-2);
		}
	}
		
}


