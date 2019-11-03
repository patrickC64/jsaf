jsaf_scene2d_object.prototype = Object.create(jsaf_scene2d_drawableObject.prototype)

function jsaf_scene2d_object(image)
{
    jsaf_scene2d_drawableObject.call(this,image);
 	 
}

jsaf_scene2d_object.prototype.remove = function ()
{
	this.layer.removeObject(this);
}

jsaf_scene2d_object.prototype.update = function ()
{
 	jsaf_scene2d_baseObject.prototype.update.call(this)	
}
 