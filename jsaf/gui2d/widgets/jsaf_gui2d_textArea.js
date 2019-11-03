jsaf_gui2d_textarea.prototype = Object.create(jsaf_gui2d_widget.prototype)

function jsaf_gui2d_textarea(text,x,y,w,h)
{
	jsaf_gui2d_widget.call(this);

	this.position 	= [x,y,w,h];
	
	this.text = text;
	this.textcolor 	= [1.0,1.0,1.0];
	this.color		= [.6,.6,.6];

	this.skinBackground = false;

	this.onInput = null;

}


jsaf_gui2d_textarea.prototype.update = function ()
{
	jsaf_gui2d_widget.prototype.update.call(this)

	if (this.gui2d.focusWidget == this)
	{	
		var k = this.gui2d.inputCntl.getKeyHit();
		if (k)
		{	
			var l= this.text.length;

			if( k == 8)
			{	this.text = this.text.substr(0,l-1);
				k=0;
			}


			if (l>2)k=0;
			if( k <47 || k >57)
			 	k=0;

			if(k)this.text+=String.fromCharCode(k);

			if (this.onInput != null)
				this.onInput(this);

		}

	}
}


jsaf_gui2d_textarea.prototype.render = function ()
{	

	var g = this.gui2d.graphics;
	
	var p = this.position;
	var rc = this.getRenderCoords();



 
	g.setColor ( this.color[0], this.color[1], this.color[2]);

	if (this.gui2d.focusWidget == this)
		g.setColor ( this.color[0]*.95, this.color[1]*.95, this.color[2]*.95);

	g.setScale(1,1);
	
	g.setAlpha(1.0);

	g.drawRect (rc[0]+this.skin.sze,rc[1]+this.skin.sze,p[2]-+this.skin.sze*2, p[3]-+this.skin.sze*2);
	
	this.renderSkin(o);

	g.setScale(1,1);
	
	g.setAlpha(1.0);

	g.setColor (this.textcolor[0], this.textcolor[1], this.textcolor[2]);
	
	var text = this.text;

	if (this.gui2d.focusWidget == this)
		if ( this.gui2d.ticker%30<20)
			text +="|";

	g.drawText ( this.skin.skin_font, text, rc[0], rc[1]-2);
	

}


jsaf_gui2d_textarea.prototype.getValue = function()
{
	return this.text;
}

