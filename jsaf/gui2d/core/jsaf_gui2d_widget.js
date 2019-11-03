function jsaf_gui2d_widget( type, x, y, w, h )
{	
	this.gui = null;

	this.id = null;
	this.name = null;
	this.type = type;
	
	this.parent			= null;
	this.parentBinding	= null;	
	
	this.childs = null;
	
	this.active = true;
	this.resizeable = true;
	this.typeChangable = true;
	this.rootWidget = false;

 
	this.position 		= [ x, y, w, h];
	this.renderCoords	= [ x, y, w, h];
	
	this.childOrigin	= [ 0, 0 ];
	
	this.dimensionMin	= null;
	this.dimensionMax	= null;
	
	this.eventHandlerCallbacks	= null;

	this.ignoreParentViewport = false;
	this.ignoreMouseCheck = false;	
	this.ignoreOrigin = false;	
	this.dimensionsMin = [null, null];
	
	this.addEventHandler ( this.ON_INIT, function ()
	{	
		this.gui = this.parent.gui;
 
		this.parent.addEventHandler ( this.ON_UPDATE_RENDERCOORDS, function ()
		{
			this.updateRenderCoords();

		}.bind( this ) )
		
	}.bind(this) )

}

jsaf_gui2d_widget.prototype.update = function()
{	

	this.callEventHandler(this.ON_UPDATE_BEGIN);	
	
	this.callEventHandler(this.ON_UPDATE);
	
	if ( this.childs )
	{ 
		if (this.gui==null)alert("UPDATE ERROR, GUI IS NULL FOR WIDGET :"+this.type);

		
		this.updateChilds();
	}

	this.callEventHandler(this.ON_UPDATE_END);	

}

jsaf_gui2d_widget.prototype.updateChilds = function()
{
	this.callEventHandler(this.ON_UPDATE_CHILDS_BEGIN);	
 	
	this.childs.forEachData( function (widget)
	{	
		widget.update();
		
	}.bind(this) );
	
	this.callEventHandler(this.ON_UPDATE_CHILDS_END);	
}


jsaf_gui2d_widget.prototype.render = function()
{	
	if ( this.inView() )
	{	
		this.callEventHandler(this.ON_RENDER_BEGIN);	
		
	//	if ( this.gui )
	//		this.gui.renderStack.push ( this.type );

		this.callEventHandler(this.ON_RENDER);	

		if ( this.childs )
		{ 
			if (this.gui==null)alert("RENDER ERROR, GUI IS NULL FOR WIDGET :"+this.type);
	
			this.renderChilds();
		}
	
		this.callEventHandler(this.ON_RENDER_END);	
	}
}


jsaf_gui2d_widget.prototype.renderChilds = function()
{
	this.callEventHandler(this.ON_RENDER_CHILDS_BEGIN);	

	var g = this.getRenderContext();
	
	g.resetTransform();
	g.setBlendmode ( g.MASK_BLEND);
	g.setScale(1,1)
	
	this.childs.forEachData( function (widget)
	{	
		if ( widget.active ) widget.render();		
	});
	
	this.callEventHandler(this.ON_RENDER_CHILDS_END);	
}


jsaf_gui2d_widget.prototype.addChild = function(widget)
{	
	if ( this.childs == null)
		this.childs = new dynamicList();
	
	widget.parent = this;	
	
	widget.parentBinding = this.childs.addData(widget);
 
	widget.callEventHandler(widget.ON_INIT);	

	widget.callEventHandler(widget.ON_PARENT_CHANGED);	
	
 	widget.updateRenderCoords();
	
	this.callEventHandler(this.ON_ADD_CHILD,widget);	
	
	widget.updateRenderCoords();
	
	return widget;
}
 

jsaf_gui2d_widget.prototype.toFront = function(ignoreParent)
{ 

	if (this.parent != null )
	{	
		if (ignoreParent)
		{
			this.parent.childs.nodeToHead (this.parentBinding);
			return;
		}

		this.parent.toFront();
	}
	
	
	if ( this.rootWidget == true )
	{ 
		if ( this.parent == null)
			return;
		
		this.parent.childs.nodeToHead (this.parentBinding);

		this.parent.callEventHandler(this.gui.ON_CHILD_TO_FRONT);
	}
}


jsaf_gui2d_widget.prototype.childToFront = function()
{ 
	
}


jsaf_gui2d_widget.prototype.getRenderCoords = function()
{		
	return [ this.renderCoords[0], this.renderCoords[1], this.renderCoords[2], this.renderCoords[3] ];
}


jsaf_gui2d_widget.prototype.updateRenderCoords = function()
{
	var rc  = [ this.position[0]
			  , this.position[1]
			  , this.position[2]
			  , this.position[3] ];
	
	if ( this.parent )
	{
		rc[0]+= this.parent.getRenderCoords()[0];
		rc[1]+= this.parent.getRenderCoords()[1];
		
		if ( this.ignoreOrigin == false )
		{	
			rc[0]+= this.parent.childOrigin[0];
			rc[1]+= this.parent.childOrigin[1];
		}	
	}

	/*
	rc  = [ Math.round(rc[0])
		  , Math.round(rc[1])
		  , Math.round(rc[2])
		  , Math.round(rc[3]) ];
	*/
	this.renderCoords = rc;
 
	this.callEventHandler ( this.ON_UPDATE_RENDERCOORDS );

	if ( this.parent )
		this.parent.callEventHandler ( this.ON_CHILD_UPDATE_RENDERCOORDS );
	
	return rc;
}


jsaf_gui2d_widget.prototype.inView = function()
{   
 
	if ( this.ignoreParentViewport == true )
		return this.parent.inView();
	
	if (!this.active)
		return false;
	
	var prc = this.parent.getRenderCoords();
	var rc = this.getRenderCoords();
	
	if ( rc[0]+rc[2] > prc[0]	  && rc[1]+rc[3] > prc[1] 
	&&  (rc[0]) < (prc[0]+prc[2]) && (rc[1]) < (prc[1]+prc[3])  )
	{
		return true;
	}
	
	return false;
}


jsaf_gui2d_widget.prototype.getRenderContext = function ()
{	
	return this.gui.renderContext;
}


jsaf_gui2d_widget.prototype.getInputControl = function ()
{
	return this.gui.inputControl; 
}


jsaf_gui2d_widget.prototype.mouseOverCheck = function()
{
	if ( this.active == false)
		return;
	
	var mouseOver = null;

	var rc = this.getRenderCoords();

	var mx = this.gui.inputControl.mouseX;
	var my = this.gui.inputControl.mouseY;

	
	if ( this.ignoreMouseCheck==false && mx>rc[0] && my>rc[1] && mx< rc[0]+rc[2] && my < rc[1]+rc[3])
	{	
		mouseOver = this;
	}

	
	if ( this.childs )
	{	
		var tmouseOver = mouseOver;
		var cmouseOver = null;

		this.childs.forEachData ( function ( widget ) 
		{
			if ( cmouseOver = widget.mouseOverCheck() )
			{		 
				if (  mouseOver == widget.parent || widget.ignoreParentViewport )
					tmouseOver = cmouseOver;
			}
		});
		
		mouseOver = tmouseOver;
	}

	return mouseOver;
}
 

jsaf_gui2d_widget.prototype.getSkin = function (type)
{
	var skin = this.gui.skin;
	
	if ( !skin )
	{
		alert("GUI HAS NO SKIN!");
		jsaf.error ('no guiskin');
	}

	if (! type )
		type = this.type;
		
	return skin.getSkin( type );
}


jsaf_gui2d_widget.prototype.setType = function (type)
{	
	if ( this.typeChangable == true)
	{	
		this.type = type;
		return true;
	}
	
	return false;
}


jsaf_gui2d_widget.prototype.mouseOver = function()
{
	return (this.gui.mouseOverWidget == this);
}