jsaf_gui2d_widget.prototype.move = function(x,y)
{
	this.position[0]+=x;
	this.position[1]+=y;	
	
	this.updateRenderCoords();
}


jsaf_gui2d_widget.prototype.setPosition = function( x, y, w, h )
{
	this.position[0] = x;
	this.position[1] = y;

	if (w && h)
		this.setDimension ( w, h);
	else
		this.updateRenderCoords();
}

jsaf_gui2d_widget.prototype.setPositionV = function( v )
{
	this.position[0] = v[0];
	this.position[1] = v[1];

	 if (v.length>2)
		this.setDimension ( v[2], v[3]);
	 else
		this.updateRenderCoords();
}


jsaf_gui2d_widget.prototype.setDimension = function( w, h )
{
	
	this.position[2] = w;
	this.position[3] = h;
	
	this.updateRenderCoords();
}


jsaf_gui2d_widget.prototype.resize = function( x, y, w, h )
{
	if ( this.resizeable == false)
	return;
	
	this.position[0] += x;
	this.position[1] += y;
	this.position[2] += w;
	this.position[3] += h;

	this.updateRenderCoords();
}
