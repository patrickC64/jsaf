jsaf_scene2d_tile.prototype = Object.create(jsaf_scene2d_drawableObject.prototype);


function jsaf_scene2d_tile(image)
{
	jsaf_scene2d_drawableObject.call(this,image);						
}


jsaf_scene2d_tile.prototype.update = function()
{
	jsaf_scene2d_drawableObject.update(this);		
}
