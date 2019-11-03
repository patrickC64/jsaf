jsaf_gui2d_checkbox.prototype = Object.create(jsaf_gui2d_widget.prototype)


function jsaf_gui2d_checkbox( text,x,y )
{
	jsaf_gui2d_widget.call(this,'checkbox',x,y,24,24);

	this.text		= text;	
}


jsaf_gui2d_checkbox.prototype.render = function ()
{
	var g  = this.getRenderContext();
	var rc = this.getRenderCoords();
	var skin = this.getSkin();
	
	g.setColor(.1,.1,.1);
	
	skin.drawImageV ( 'background', rc );
		
	rc[0]+=32;
 
	skin.drawTextV ( 0, this.text, rc);
 
}

