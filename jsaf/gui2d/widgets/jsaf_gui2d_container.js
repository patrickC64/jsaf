jsaf_gui2d_container.prototype = Object.create(jsaf_gui2d_widget.prototype)


function jsaf_gui2d_container(x,y,w,h)
{
	jsaf_gui2d_widget.call(this ,'container', x, y, w, h);
 
	this.overflow ='hidden';
	
	this.clientRectDimension = [w,h];
	this.childOrigin = [0,0];
	this.childOffset = [0,0];
						
	this.renderBackground = true;
	
	this.scrollbarv = new jsaf_gui2d_scrollbar ( 'vertical' ,0,0,0,0);
	this.scrollbarv.ignoreOrigin = true;

					
	this.scrollbarh = new jsaf_gui2d_scrollbar ( 'horizontal' , 0,0,00,0); 
	this.scrollbarh.ignoreOrigin = true;
 
					
	this.addEventHandler ( this.ON_RENDER_BEGIN,  this.onRenderBegin );
	this.addEventHandler ( this.ON_RENDER_END, this.onRenderEnd );

  	this.addEventHandler ( this.ON_UPDATE_RENDERCOORDS, this.onUpdateRenderCoords );	
  //	this.addEventHandler ( this.ON_UPDATE_RENDERCOORDS, this.scrollbarsToFront );	
 
	this.addEventHandler ( this.ON_CHILD_UPDATE_RENDERCOORDS, this.updateClientRect );	
	this.addEventHandler ( this.ON_CHILD_TO_FRONT, this.scrollbarsToFront );	
 	this.addEventHandler ( this.ON_ADD_CHILD, this.onAddChild );
  	this.addEventHandler ( this.ON_INIT, this.onInit ,this);	
}


jsaf_gui2d_container.prototype.onInit = function ()
{
	
 	this.addChild (this.scrollbarv);
	
 	this.addChild ( this.scrollbarh );

	this.scrollbarh.active = false;
	this.scrollbarv.active = false;
	
	this.scrollbarh.addEventHandler ( this.ON_SCROLL, this.onScroll.bind(this, this.scrollbarh));
	this.scrollbarv.addEventHandler ( this.ON_SCROLL, this.onScroll.bind(this, this.scrollbarv) );
					
}


jsaf_gui2d_container.prototype.updateClientRect = function (child)
{	
	var cx = this.position[2];
	var cy = this.position[3];
 
	this.childs.forEachData ( function (child)
	{	
		if ( child != this.scrollbarh && child !=this.scrollbarv )
		{ 	
 
			if ( child.position[0]+child.position[2]> cx )
			{
				cx = child.position[0]+child.position[2];
				
			}

			if ( child.position[1]+child.position[3]> cy )
			{
				cy = child.position[1]+child.position[3];
			}
		}
				
	}.bind(this))

	if ( child != this.scrollbarh && child !=this.scrollbarv )
	{
		this.clientRectDimension = [cx, cy];
		
		this.scrollbarh.setRange(this.clientRectDimension[0]-8);	
		this.scrollbarv.setRange(this.clientRectDimension[1]-10);

	}
}


jsaf_gui2d_container.prototype.scrollbarsToFront = function ()
{
	this.scrollbarh.toFront(1);
	this.scrollbarv.toFront(1);
}


jsaf_gui2d_container.prototype.onAddChild = function (widget)
{	
	if ( widget != this.scrollbarh && widget !=this.scrollbarv)
	{
		this.scrollbarsToFront();
		this.updateClientRect(widget);
		this.updateRenderCoords();
		return true;
	}

	return false;	 
}


jsaf_gui2d_container.prototype.updateScrollbars = function ()
{ 
}




jsaf_gui2d_container.prototype.onScroll = function ( scrollbar ,val )
{

	if ( scrollbar == this.scrollbarv )
	{	
	//	this.childOrigin[1]=-val+this.childOffset[0];
		this.updateRenderCoords();
	}
	
	if ( scrollbar == this.scrollbarh )
	{	
	//	this.childOrigin[0]=-val+this.childOffset[1];
		this.updateRenderCoords();
	}
}


jsaf_gui2d_container.prototype.onUpdateRenderCoords = function ()
{
	var width = 8;
	
 	this.scrollbarv.setPosition( this.position[2]-width, 0, width+1, this.position[3]-width-3 );

	width+=2;
	
 	this.scrollbarh.setPosition( 0, this.position[3]-width-1, this.position[2]-width+2, width+3 );  	
 
	this.updateClientRect();	

	this.childOrigin[0] = -this.scrollbarh.getValue()+this.childOffset[0];
 	this.childOrigin[1] = -this.scrollbarv.getValue()+this.childOffset[1];	
}

	
jsaf_gui2d_container.prototype.onRenderBegin = function ()
{ 
	if (!this.active)return;
	
	var rc = this.getRenderCoords();

	if ( this.renderBackground )
		this.getSkin().drawImageV ( 'background', rc );	
	
	if ( this.overflow == 'hidden' || this.overflow == 'scroll' || this.overflow=='auto' )
	{ 	 
		this.gui.viewportPushV( rc );	
	}

}


jsaf_gui2d_container.prototype.onRenderEnd = function ()
{ 
	if ( this.overflow == 'hidden' || this.overflow == 'scroll' || this.overflow == 'auto' )
	{	
		this.gui.viewportPop();
	}
}


jsaf_gui2d_container.prototype.setOverflow = function (overflow)
{ 	
	if( overflow=='scroll')
	{
		this.enableScrollbars();
	}
	
	this.overflow = overflow;
}


jsaf_gui2d_container.prototype.updateScrollbars = function (overflow)
{

}


jsaf_gui2d_container.prototype.enableScrollbars = function ()
{ 
	this.scrollbarv.active = true;
	this.scrollbarh.active = true;
	this.childOffset =[-14,-14];	
	this.childOrigin = [ this.childOffset[0], this.childOffset[1] ];
	this.updateRenderCoords();
}


jsaf_gui2d_container.prototype.disableScrollbars = function ()
{ 
	this.scrollbarv.active = false;
	this.scrollbarh.active = false;
	this.childOffset =[00,00];
}