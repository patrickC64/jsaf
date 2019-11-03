jsaf_gui2d_scrollbar.prototype = Object.create(jsaf_gui2d_widget.prototype)

function jsaf_gui2d_scrollbar(direction, x, y, w, h)
{
	jsaf_gui2d_widget.call(this,direction, x, y, w, h);


	this.direction = direction;	
	this.type = direction+"Scrollbar";	
	
 	this.scrollUpButton = new jsaf_gui2d_button('',0,0,00,00);
 	this.scrollDownButton = new jsaf_gui2d_button('',0,0,00,00);
	
	this.slider 		 = new jsaf_gui2d_scrollbarSlider(this.direction,0,0,0,0);

	
 	this.addEventHandler (	this.ON_INIT, this.onInit );	
	this.addEventHandler (	this.ON_UPDATE_RENDERCOORDS, this.onUpdateRenderCoords );
	
	this.scrollpos = 0;
	this.mouseDown = 0;
}

 
jsaf_gui2d_scrollbar.prototype.onInit = function ()
{ 		
	this.addChild (	this.slider );
	this.addChild (	this.scrollUpButton );
	this.addChild (	this.scrollDownButton );
 
	this.addEventHandler (this.ON_MOUSE_UP, function (){this.mouseDown=false;} ); 
	
	this.scrollUpButton.addEventHandler (this.ON_MOUSE_DOWN, function (  ) 
	{	
		if ( this.mouseDown == 0 )
				this.mouseDown = this.gui.ticker;
			
		if ( (this.gui.ticker - this.mouseDown) %5==1 )		
			this.scrollpos-=15;
			
			this.scrollpos =  this.setValue(this.scrollpos);
 
		
	},this);
	
	this.scrollDownButton.addEventHandler (this.ON_MOUSE_DOWN, function (  ) 
	{	
		if ( this.mouseDown == 0 )
				this.mouseDown = this.gui.ticker;
			
		if ( (this.gui.ticker - this.mouseDown) %5==1 )		
			this.scrollpos+=15;
 		
		this.scrollpos =  this.setValue(this.scrollpos);
		
	},this);
	
	this.slider.addEventHandler (this.ON_VALUE_CHANGED, function ( value ) 
	{
		this.scrollpos = value;
		
		this.callEventHandler(this.ON_SCROLL, value);
		
	},this);
	
	this.onUpdateRenderCoords();
}


jsaf_gui2d_scrollbar.prototype.setValue = function (value)
{   
	return this.slider.setValue(value);
}


jsaf_gui2d_scrollbar.prototype.getValue = function (value)
{ 
	return this.slider.getValue();
}


jsaf_gui2d_scrollbar.prototype.setRange = function (range)
{ 
	this.slider.setRange(range-33);
}


jsaf_gui2d_scrollbar.prototype.onUpdateRenderCoords = function ()
{ 
	if(this.direction=='horizontal')
	{
		this.slider.setPosition(16,0,this.position[2]-32,this.position[3]);
 	 	this.scrollUpButton.setPosition(0,0,16,this.position[3]);
 	 	this.scrollDownButton.setPosition(this.position[2]-16,0,16,this.position[3]);
 	
	}

	if(this.direction=='vertical')
	{
		this.slider.setPosition(0,16,this.position[2],this.position[3]-32);
	 	this.scrollUpButton.setPosition(0,0,this.position[2],16);
	 	this.scrollDownButton.setPosition(0,this.position[3]-16,this.position[2],16);
 	}
}

