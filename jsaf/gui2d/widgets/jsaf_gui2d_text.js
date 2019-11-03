jsaf_gui2d_text.prototype = Object.create(jsaf_gui2d_widget.prototype)
 
function jsaf_gui2d_text(text, x,y,w,h)
{
	jsaf_gui2d_widget.call(this,'text', x+1, y+1, w, h);

	this.text		= text;
 
}


jsaf_gui2d_text.prototype.render = function ()
{	
	var g = this.getRenderContext();
	
	g.resetTransform();

	var skin = this.getSkin();
	var rc = this.getRenderCoords();
	
	skin.drawTextV ( 0, 'TEST', rc );
}

