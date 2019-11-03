// [ color[4], rotation, scale [x,y]
jsaf_graphics2d.prototype.prepareDrawV = function ( v )
{
	var c = v[0]; 
	
	this.rendersettings.vertexColor = [ c[0], c[1], c[2],c [3] ];
	this.rendersettings.alpha		= c[3];

	this.rendersettings.rotation	= v[1];
	this.rendersettings.scale		= v[2];
}

jsaf_graphics2d.prototype.setClsColorV = function ( v )
{
	this.cls_rgba = v; 
}


jsaf_graphics2d.prototype.setColorV = function ( v )
{
	this.rendersettings.vertexColor = [ v[0], v[1], v[2],v [3] ];
	this.rendersettings.alpha = v[3];
}


jsaf_graphics2d.prototype.setScaleV = function ( v )
{
	this.rendersettings.scale = v;	
}


jsaf_graphics2d.prototype.setHandleV = function ( v )
{
	this.rendersettings.handle = v;
}


jsaf_graphics2d.prototype.setOriginV = function ( v )
{
	this.rendersettings.origin = v;
}


jsaf_graphics2d.prototype.enableViewportV = function ( v )
{
	this.enableViewport ( v[0], v[1], v[2], v[3]);
}
