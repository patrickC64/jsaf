jsaf_scene2d_drawableObject.prototype = Object.create(jsaf_scene2d_baseObject.prototype);

function jsaf_scene2d_drawableObject (image)
{	
	jsaf_scene2d_baseObject.call(this);

	this.image = image;

	this.color	  = [1.0,1.0,1.0,1.0];	
	
	this.rotation = 0.0;
	
	this.flip = [1,1];
	
	this.blendmode	= 0;
	this.midhandle  = true;

	this.animated = false;
	this.frame = 1;
}


jsaf_scene2d_drawableObject.prototype.animate = function (spd)
{
	this.frame += spd*this.scene.deltatime;
}

jsaf_scene2d_drawableObject.prototype.setAlpha = function (alpha)
{
	this.color[3] = alpha;
}


jsaf_scene2d_drawableObject.prototype.getAlpha = function ()
{
	return this.color[3];
}


jsaf_scene2d_drawableObject.prototype.setColor = function (color)
{
	this.color = [color[0],color[0],color[0],this.color[3]];
}


jsaf_scene2d_drawableObject.prototype.getColor = function ()
{
	return [ this.color[0], this.color[1], this.color[2], this.color[3] ];
}
