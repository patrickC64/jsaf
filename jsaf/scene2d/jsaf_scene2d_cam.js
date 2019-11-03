jsaf_scene2d_cam.prototype = Object.create(jsaf_scene2d_baseObject.prototype);

function jsaf_scene2d_cam(scene2d)
{	
    jsaf_scene2d_baseObject.call(this);

	this.viewport = null;
	this.graphics2d = scene2d.graphics2d;

	this.zoom = 1.0;

	this.scene2d = scene2d;
	this.viewport = [0,0,0,0]
}


jsaf_scene2d_cam.prototype.render = function ()
{ 
	this.graphics2d.resetTransform ();	
	this.graphics2d.setBlendmode (this.graphics2d.MASK_BLEND);
	
	this.scene2d.layerList.forEachData( function (layer)
	{	
		this.renderLayer(layer);

	}.bind(this));		
}


jsaf_scene2d_cam.prototype.renderLayer = function  (layer)
{	
	this.renderTiles(layer);
	this.renderParticles(layer, layer.particleListAfo);
	this.renderObjects(layer);
	this.renderParticles(layer, layer.particleListBfo);
}

jsaf_scene2d_cam.prototype.renderTiles = function  (layer)
{	
	var zoom = this.zoom;

	var g = this.graphics2d;
	
	var tile; 
	var dx; // dest x 
	var dy; // dest y

	var tw = layer.tileWidth  *zoom; //  tilewidth 
	var th = layer.tileHeight *zoom; //  tileheight
	
	var viewSpaceX = g.graphics.resolution[0];	// viewSpaceX
	var viewSpaceY = g.graphics.resolution[1]; // viewSpaceY
	
	var cntrx = viewSpaceX/2;
	var cntry = viewSpaceY/2;
								
	var tiles_x = (viewSpaceX/tw);
	var tiles_y = (viewSpaceY/th);
	
	var cx =this.position[0];
	var cy =this.position[1];

	if ( layer.parallax != null)
	{ 
		cx *= layer.parallax[0];
		cy *= layer.parallax[1];
	}	
 
	
	var tx = Math.ceil( ( (cx + cntrx ) /tw)-(tiles_x/2)  );
	var ty = Math.ceil( ( (cy + cntry ) /th)-(tiles_y/2)  );
 
		
	var scrollx = 0;
	var scrolly = 0;
	
	scrollx = (cx % tw ) ;
	scrolly = (cy % th ) ;

	
	var offx = 0-scrollx-tw/2;
	var offy = 0-scrolly	 ;
	
	if(this.viewport != null)
	{
			
	}
						
	var iw; var ih;
	
	for(var tilex =0; tilex < tiles_x+2; tilex++)
	{ 
		for(var tiley = 0; tiley < tiles_y+1; tiley++)
		{	
			ftx = tilex + tx;
			fty = tiley + ty;
			
			if (layer.repeatX == true)
				ftx = ftx%layer.tilesX;

			if (layer.repeatY == true)
				fty = fty%layer.tilesY;
 
	
			if ( ftx <0 || fty <0 || ftx > layer.tilesX-1 || fty > layer.tilesY-1)
				continue;

			tile = layer.tileData[ftx][fty];

			if (tile==null  || tile.active == false)
			 continue;

			
			dx = offx+tile.offset[0]+ (tilex)*tw;
			dy = offy+tile.offset[1]+ (tiley)*th;
			
			iw = tile.image.width  * tile.scale[0]*zoom;
			ih = tile.image.height * tile.scale[0]*zoom;
 
			if( dx+iw  > 0 && dy+ih  > 0 && dx-iw < viewSpaceX && dy-ih < viewSpaceY)
			{ 			
				g.prepareDrawV ( [ tile.color, tile.rotation, [ tile.scale[0]*zoom , tile.scale[1]*zoom ] ] );
				
				if ( tile.midhandle )
					g.setAutoMidHandle(true);
				else
					g.setAutoMidHandle(false);

				if(tile.animated==false)
					g.drawImageRectV( tile.image, [dx,dy,iw,ih] );
				else
					g.drawAnimImageRectV( tile.image, [dx,dy,iw,ih], parseInt(tile.frame) );
				
			}
		}
	}
}
 

jsaf_scene2d_cam.prototype.renderObjects = function  (layer)
{ 	
	this.graphics2d.resetTransform();
 
	var g = this.graphics2d;
	var object = null;
	var zoom = this.zoom;
	var dx; var dy;
	var cx; var cy;

	var camViewOffsetX = 0;
	var camViewOffsetY = 0;
	
	var viewSpaceX = g.graphics.resolution[0];
	var viewSpaceY = g.graphics.resolution[1];
	
	var cntrx = viewSpaceX/2;
	var cntry = viewSpaceY/2;
							
	if ( layer.parallax == null)
	{
		cx = this.position[0];
		cy = this.position[1];
	}
	else
	{ 
		cx = this.position[0]*layer.parallax[0];
		cy = this.position[1]*layer.parallax[1];
	}	
	
	cx-=camViewOffsetX;
	cy-=camViewOffsetY;
	
	var iw; var ih; var dw; var dh;
	
	layer.objectList.forEachData( function (layer, object) 
	{	
		if ( object.active )
		{		
				
			dx =  object.position[0]  -cx;
			dy =  object.position[1]  -cy;	
			
			iw = object.image.width;
			ih = object.image.height;
					
			dx*=zoom;
			dy*=zoom;

			dw = iw *Math.abs(object.scale[0]*zoom);
			dh = ih *Math.abs(object.scale[1]*zoom);
	 
		 	if( dx+iw>0 && dy+ih>0 && dx-iw < viewSpaceX && dy-ih < viewSpaceY )
			{ 	
				g.prepareDrawV ( [ object.color, object.rotation, [object.scale[0]*zoom,object.scale[1]*zoom ] ] );

				if ( object.midhandle )
					g.setAutoMidHandle(true);
				else
					g.setAutoMidHandle(false);	
				 
				if(object.animated==false)
					g.drawImageRectV( object.image, [dx,dy,dw,dh] );
				else
					g.drawAnimImageRectV( object.image, [dx,dy, iw, ih], object.frame );
			}
		}
		
	}.bind(this,layer));
}

jsaf_scene2d_cam.prototype.renderParticles = function  (layer, particleList)
{
	var graphics = this.graphics;

	particleList.forEach( function () 
	{

	}.bind(this,layer));
}
