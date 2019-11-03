jsaf_gui2d_stackPanel.prototype = Object.create(jsaf_gui2d_container.prototype)

function jsaf_gui2d_stackPanel(x,y,w,h)
{
	jsaf_gui2d_container.call(this,x ,y , w, h);
	
	this.type = 'stackPanel';
	this.align = 'horizontal';
 
}
 
jsaf_gui2d_stackPanel.prototype.setAlign = function (align)
{

}

jsaf_gui2d_stackPanel.prototype.setAlign = function (align)
{
	
}

jsaf_gui2d_stackPanel.prototype.setMargin = function (margin)
{
	
}

jsaf_gui2d_stackPanel.prototype.onAddChild = function (widget)
{		

	if ( jsaf_gui2d_container.prototype.onAddChild.call(this,widget)  )
	{	 
		widget.setPosition(this.position[2]-widget.position[2],10);			
	}

}
