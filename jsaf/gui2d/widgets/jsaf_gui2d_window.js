jsaf_gui2d_window.prototype = Object.create(jsaf_gui2d_widget.prototype)

function jsaf_gui2d_window(title, x,y,w,h)
{
	jsaf_gui2d_widget.call( this, 'window', x, y, w, h );
 
	this.title = title;
	this.titleBarHeight = 28;
	this.dimensionMin = [255,28];
	
	this.titleBar	= new jsaf_gui2d_titleBar ( this.title, this.position[2], this.titleBarHeight );
	this.container	= new jsaf_gui2d_container ( 0, this.titleBarHeight , this.position[2],this.position[3] );
	this.border		= new jsaf_gui2d_border ( 6 );
			
	this.addEventHandler ( this.ON_INIT, this.onInit );
	
	this.rootWidget = true;	
}

jsaf_gui2d_window.prototype.onInit = function()
{	
	this.position[3]+=this.titleBarHeight;
	
	this.container.overflow ='hidden';
	
	this.addChild ( this.titleBar );
	this.addChild ( this.container );
	this.addChild ( this.border	 );


	this.addEventHandler ( this.ON_UPDATE_RENDERCOORDS, function ()
	{	
		
		if ( this.parent != this.gui )
		{
			if (this.position[0]<18)
				this.setPosition(18,this.position[1]);
			
			if (this.position[1]<18)
				this.setPosition(this.position[0],18);
		}
		
		if ( this.dimensionMin[0] && this.position[2]< this.dimensionMin[0])
			this.setDimension(this.dimensionMin[0],this.position[3]);

		if (this.dimensionMin[0] && this.position[3]< this.dimensionMin[1])
			this.setDimension(this.position[2],this.dimensionMin[1]);

		if (this.position[3]< this.titleBar.position[3]-3)
			this.setDimension(this.position[2],this.titleBar.position[3]-3);
		
		this.titleBar.setDimension( this.renderCoords[2], this.titleBar.position[3]);

		this.container.setDimension( this.getRenderCoords()[2], this.getRenderCoords()[3]-this.titleBar.position[3]);

		this.border.setDimension( this.renderCoords[2], this.titleBar.position[3]-this.titleBar.position[3]);

		
	}.bind(this))	
}

jsaf_gui2d_window.prototype.addChild = function (widget)
{	
	if ( widget == this.container ||  widget == this.titleBar || widget == this.border )
	{	
		jsaf_gui2d_widget.prototype.addChild.call ( this, widget );	
	}
	else
	{	 
		this.container.addChild ( widget );
	}
	
	return widget;
}
