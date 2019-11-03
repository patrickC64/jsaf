function jsaf_scene2d_baseObject ()
{
	this.active		= true;
	
	this.position	= [0.0,0.0];
	this.offset 	= [0.0,0.0];
	this.scale  	= [1.0,1.0];
	this.rotation  	= 0.0;
	
	this.layer = null;
	this.scene = null;
}

jsaf_scene2d_baseObject.prototype.update = function ()
{
 
	
}

jsaf_scene2d_baseObject.prototype.setPosition = function (x,y)
{
	this.position=[x,y]
}


jsaf_scene2d_baseObject.prototype.setRotation = function (r)
{
	this.rotation = r
}


jsaf_scene2d_baseObject.prototype.setScale= function (scaleX,scaleY)
{
	this.scale = [scaleX,scaleY]
}


jsaf_scene2d_baseObject.prototype.setColor = function ( r, g, b )
{
	this.color	  = [r, g, b, this.color [3] ];	
}	

jsaf_scene2d_baseObject.prototype.setAlpha = function ( alpha )
{
	this.color[3] = alpha;	
}	

jsaf_scene2d_baseObject.prototype.getPosition = function (x,y)
{
	return [this.position[0], this.position[1]];
}


jsaf_scene2d_baseObject.prototype.getRotation = function (r)
{
	return this.rotation;
}


jsaf_scene2d_baseObject.prototype.getScale= function (scaleX,scaleY)
{
	return this.scale;
}

jsaf_scene2d_baseObject.prototype.rotate = function (r)
{
	this.rotation+=r;
}


jsaf_scene2d_baseObject.prototype.translate = function (x,y)
{
	this.position[0]+=x*this.scene.deltatime;
	this.position[1]+=y*this.scene.deltatime;
}


jsaf_scene2d_baseObject.prototype.translateRelative = function (x,y)
{
	this.position[0]+=x*this.scene.deltatime;
	this.position[1]+=y*this.scene.deltatime;
}


jsaf_scene2d_baseObject.prototype.move = function (distance)
{
	this.position[0]+=Math.sin(this.rotation)*distance*this.scene.deltatime;
	this.position[1]-=Math.cos(this.rotation)*distance*this.scene.deltatime;
}

jsaf_scene2d_baseObject.prototype.show = function ()
{
	this.active = true;
}

jsaf_scene2d_baseObject.prototype.hide = function ()
{
	this.active = false;
}
