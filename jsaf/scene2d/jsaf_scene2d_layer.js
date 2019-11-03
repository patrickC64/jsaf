function jsaf_scene2d_layer( scene2d , tilesX, tilesY, tileWidth, tileHeight)
{	
	this.scene2d	= scene2d;
	
	this.offset 	= [0.0,0.0];
	this.scale  	= [0.0,0.0];
	this.rotation  	= 0.0;

	this.parallax	= null;
	this.repeatX	= false;
	this.repeatY	= false;
				
	this.tilesX		= tilesX;
	this.tilesY		= tilesY;
	this.tileWidth	= tileWidth;
	this.tileHeight = tileHeight;

	this.objectList = new dynamicList();	
	this.particleListBfo = new dynamicList();// before objects
	this.particleListAfo = new dynamicList(); // after objects

	this.tileData = [];	

	for(var x = 0; x<tilesX;x++)
	{
		this.tileData[x] = [];
	}

	for(var x = 0; x<tilesX;x++)
	{
		for(var y = 0; y<tilesY;y++)
		{
			this.tileData[x][y] = null;
		}
	}
}

jsaf_scene2d_layer.prototype.addTile = function (tile,x,y)
{	
	this.tileData[x][y] = tile;
}

jsaf_scene2d_layer.prototype.addTiles = function (tile,ox,oy,tx,ty)
{		
	for(var x = 0; x<tx;x++)
	{
		for(var y = 0; y<ty;y++)
		{
			this.tileData[ox+x][oy+y] = tile;
		}
	}
}

jsaf_scene2d_layer.prototype.fill = function (tile)
{	
 	for(var x = 0; x<this.tilesX;x++)
	{
		for(var y = 0; y<this.tilesY;y++)
		{
			this.tileData[x][y] = tile;
		}
	}
}


jsaf_scene2d_layer.prototype.addObject = function (object)
{
	if(object.layer !=null)
		object.layer.removeObject(object);
	
	object.layer = this;
	object.scene = this.scene;
	
	object.blendmode=this.scene2d.graphics2d.MASK_BLEND;
	
	object.layerBinding = this.objectList.addData (object);
}

jsaf_scene2d_layer.prototype.removeObject = function (object)
{
	if(object.layer == null) // should we generate an error or a warning?
		return;

	object.layer.objectList.removeNode(object.layerBinding);
	
	object.layer = null;
	object.layerBinding = null;
}


jsaf_scene2d_layer.prototype.addParticleBfo = function (particle)
{
	return this.particleListBfo.addData (object)
}


jsaf_scene2d_layer.prototype.addParticleAfo = function (particle)
{
	return this.particleListAfo.addData (object)
}


jsaf_scene2d_layer.prototype.createObject = function ()
{
	var object = new jsaf_scene2d_object()
	
	this.objectList.addData (object)
	
	return object
}


jsaf_scene2d_layer.prototype.update = function ()
{
	this.objectList.forEachData (function (object)
	{ 	
		object.update (  )
		
	}.bind(this))	
}

jsaf_scene2d_layer.prototype.enableParallax = function (px,py)
{
	this.parallax	= [px,py];
}

jsaf_scene2d_layer.prototype.disableParallax = function ()
{
	this.parallax	= null;
}
