jsaf_gui2d.prototype = Object.create(jsaf_gui2d_widget.prototype);

function jsaf_gui2d (graphics2d, inputControl)
{
	jsaf_gui2d_widget.call ( this, 'gui', 0, 0, graphics2d.graphics.resolution[0], graphics2d.graphics.resolution[1] );

	this.gui = this;

	this.renderContext	= graphics2d;
	this.inputControl		= inputControl;
	this.viewport 			= [];
	

	this.renderStack = [];

	this.updateRenderCoords();

	this.mouseX 	= inputControl.mouseX;
	this.mouseY		= inputControl.mouseY;
	this.mouseXold  = this.mouseX;
	this.mouseYold  = this.mouseY; 
	this.mouseXspd  = 0; 
	this.mouseYspd  = 0;
	
	this.mouseOverWidget = null;
	this.focusWidget 	 = null;

	this.currentFont = null;
	this.currentCursor = null;
	
	this.ticker=0;
	this.activeFx  =20;
	this.hoverFx = 0;
	
	this.widgetMoveStartCoords	 = [];
	this.widgetMoveStartPosition = [];
	this.widgetMoveDistance		 = [];
	this.widgetMovePosition		 = [];
}


jsaf_gui2d.prototype.update = function ()
{	 
	this.ticker++;
	
	this.mouseX 	= this.inputControl.mouseX;
	this.mouseY		= this.inputControl.mouseY;

	this.mouseXspd = this.mouseX-this.mouseXold;
	this.mouseYspd = this.mouseY-this.mouseYold;
	
	this.mouseXold  = this.mouseX;
	this.mouseYold  = this.mouseY; 

	if ( this.mouseXspd !=0 || this.mouseYspd !=0)
	{	

		if ( this.focusWidget && this.inputControl.getKeystate ( this.MOUSE_LEFT ) == this.BUTTON_DOWN)
		{
			this.widgetMoveDistance[0] = this.mouseX-this.widgetMoveStartCoords[0];
			this.widgetMoveDistance[1] = this.mouseY-this.widgetMoveStartCoords[1];
						
			this.widgetMovePosition[0] = this.widgetMoveStartPosition[0]+this.widgetMoveDistance[0];
			this.widgetMovePosition[1] = this.widgetMoveStartPosition[1]+this.widgetMoveDistance[1];
		}
		
		var currentOverWidget = this.mouseOverWidget;
		
		this.mouseOverWidget = this.mouseOverCheck();
		
		if (this.mouseOverWidget && currentOverWidget != this.mouseOverWidget ) 
		{
			this.mouseOverWidget.callEventHandler (this.ON_MOUSE_HOVER);
		}

		if ( currentOverWidget && this.mouseOverWidget != currentOverWidget ) 
		{
			currentOverWidget.callEventHandler (this.ON_MOUSE_LEAVE);
		}
	}

	
	if ( this.inputControl.getKeystate ( this.MOUSE_LEFT ) == this.BUTTON_UP )
	{						
		if ( this.focusWidget )
		{				
			this.focusWidget.callEventHandler (this.ON_MOUSE_UP);
		}
		
		//	this.focusWidget.callEventHandler (this.ON_DRAG_END);
		//	this.mouseOverWidget.callEventHandler (this.ON_DROP);		
	}
	
	
	if ( this.inputControl.getKeystate ( this.MOUSE_LEFT ) == this.BUTTON_DOWN )
	{
				
		if ( this.focusWidget )
		{	


			
			this.focusWidget.callEventHandler (this.ON_MOUSE_DOWN);
		}
	}
	
	
	if ( this.inputControl.getKeystate ( this.MOUSE_LEFT ) == this.BUTTON_CLICK )
	{
		
		if ( this.mouseOverWidget != this )
		{
			if ( this.focusWidget != this.mouseOverWidget)
			{
				this.setWidgetFocus ( this.mouseOverWidget);
				//	this.focusWidget.callEventHandler (this.ON_DRAG_START);
			}
		}
		else
		{
			this.setWidgetFocus ( null );	
		}
		
		if ( this.focusWidget )
			this.focusWidget.callEventHandler (this.ON_MOUSE_CLICK);

		if ( this.focusWidget )
		{
			this.widgetMoveStartCoords 	 = [this.mouseX, this.mouseY ];
			this.widgetMoveStartPosition = [this.focusWidget.position[0], this.focusWidget.position[1] ];
			this.widgetMovePosition		 = [this.focusWidget.position[0], this.focusWidget.position[1] ];
			this.widgetMoveDistance		 = [0,0];
			//	this.focusWidget.callEventHandler (this.ON_DRAG_START);
		}		
		
	}
	
	var key = this.inputControl.getKeyHit();
	
	if ( key )
	{ 
		if (this.focusWidget)
		{
			this.focusWidget.callEventHandler(this.ON_KEY_PRESS, key )
		}
	}
 

	jsaf_gui2d_widget.prototype.update.call(this);
}


jsaf_gui2d.prototype.setWidgetFocus = function (widget)
{
	if ( this.focusWidget )
	{	
		this.focusWidget.callEventHandler (this.ON_FOCUS_LOST);					

		if ( this.focusWidget.parent )
			this.focusWidget.parent.callEventHandler (this.focusWidget.parent.ON_CHILD_LOST_FOCUS);
		
	}
	
	this.focusWidget = widget;
		
	if ( this.focusWidget ) 
	{		
		this.focusWidget.callEventHandler (this.ON_FOCUS);
		
		if ( this.focusWidget.parent )
		{
			this.focusWidget.parent.callEventHandler (this.focusWidget.parent.ON_CHILD_GET_FOCUS);	
		}
				
		this.focusWidget.toFront();	
	}
}


jsaf_gui2d.prototype.render = function ()
{
	var g = this.renderContext;
	
	g.resetTransform();	
	g.setScale(1,1)
	var skin = this.skin.getSkin('gui');
 
	if ( skin  && skin.widgetType == 'gui' )
	{		
		var bgCoords = [this.position[0],this.position[1],this.position[2],this.position[3]]
		if ( this.focusWidget == null)
		{
			if ( this.activeFx < 20 )this.activeFx+=1.5;
		} 
		else
		{
			if ( this.activeFx > 00 )this.activeFx-=2.5;
		}	
			
		bgCoords[0]-=this.activeFx;
		bgCoords[1]-=this.activeFx;
		
		bgCoords[2]+=this.activeFx*2;
		bgCoords[3]+=this.activeFx*2;
		 
		skin.drawImageV('background', bgCoords );
	}
	
	if (!skin)jsaf.error('jsaf_gui2d, font not found!');
 
	this.renderStack = [];

	jsaf_gui2d_widget.prototype.render.call(this);
	

	g.setAlpha(.1);

	if ( this.mouseOverWidget &&  this.mouseOverWidget  != this) 
	{	
		g.setColor (0,.5,0);	

		var rc = this.mouseOverWidget.renderCoords;
 
	}

	if ( this.focusWidget ) 
	{
		g.setColor (0,0,1);
		
		var rc = this.focusWidget.renderCoords;

	//	g.drawRectV (rc);
	}
	
	var cp = [ this.mouseX ,this.mouseY,8,10];
	
	if ( this.currentCursor )
	{
		this.getSkin().drawImageV ( this.currentCursor , cp) 						
	} 
	else
	{			
		if ( this.mouseOverWidget )
		{
			this.getSkin().drawImageV ( 'cursor',cp ) 					
		}
		else
		{
			this.getSkin().drawImageV ( 'cursor', cp ) 	
		}		
	}
	
}


jsaf_gui2d.prototype.inView = function()
{
	return true;
}


jsaf_gui2d.prototype.useSkin = function(skin)
{	
	this.skin =	skin;
}
 