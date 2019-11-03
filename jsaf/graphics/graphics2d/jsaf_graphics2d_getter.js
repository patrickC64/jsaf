jsaf_graphics2d.prototype.getClsColor = function ( v4f_RGBA )
{
		return this.cls_rgba;
}

jsaf_graphics2d.prototype.getColor = function ( v3f_RGB )
{
	return this.rendersettings.vertexColor;
}

jsaf_graphics2d.prototype.getColorMode = function ( )
{
	return this.rendersettings.colorMode;
}


jsaf_graphics2d.prototype.getScale = function ( v2f_scale )
{
	return this.rendersettings.scale;
}

jsaf_graphics2d.prototype.getRotation = function ( v2f_scale )
{
	return this.rendersettings.rotation;	
}

jsaf_graphics2d.prototype.getMidHandle = function (  )
{
	return this.rendersettings.automidhandle;		
}

jsaf_graphics2d.prototype.getOffset = function ( v2f_offset )
{
	
}

jsaf_graphics2d.prototype.getOrigin = function ( )
{
	return this.rendersettings.origin;	
}

jsaf_graphics2d.prototype.getResolution = function ( )
{
	return this.graphics.resolution;
}


