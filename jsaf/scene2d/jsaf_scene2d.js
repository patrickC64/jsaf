jsaf.use('scene2d/jsaf_scene2d_baseObject.js');
jsaf.use('scene2d/jsaf_scene2d_drawableObject.js');
jsaf.use('scene2d/jsaf_scene2d_object.js'); 
jsaf.use('scene2d/jsaf_scene2d_layer.js');
jsaf.use('scene2d/jsaf_scene2d_tile.js');
jsaf.use('scene2d/jsaf_scene2d_cam.js');


function jsaf_scene2d(graphics2d)
{	
	this.graphics2d  = graphics2d; 
	this.camList = new dynamicList();
	this.layerList = new dynamicList();
	
	this.deltatime = 1.0;
}


jsaf_scene2d.prototype.createLayer = function (tilesX, tilesY, tileWidth, tileHeight)
{
	var layer = new jsaf_scene2d_layer(this, tilesX, tilesY, tileWidth, tileHeight);
	
	layer.scene = this;
	
	this.layerList.addData(layer);

	return layer;
}


jsaf_scene2d.prototype.createCam = function ()
{
	var cam = new jsaf_scene2d_cam(this);
	
	this.camList.addData(cam);

	return cam;
}


jsaf_scene2d.prototype.render = function ()
{
	this.graphics2d.setAutoMidHandle(true)
		
	this.camList.forEachData( function (cam) {
			
		cam.render()
		
	}.bind(this))
	
	this.graphics2d.setAutoMidHandle(false)
}


jsaf_scene2d.prototype.update = function (deltatime)
{
	if ( typeof(deltatime) !='undefined' )
		this.deltatime = deltatime;
	
	this.layerList.forEachData( function (layer) {
			
		layer.update()
		
	}.bind(this))
}

