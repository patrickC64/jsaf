jsaf_gui2d_scrollbarSlider.prototype = Object.create(jsaf_gui2d_widget.prototype)

function jsaf_gui2d_scrollbarSlider(direction,x,y,w,h)
{
	jsaf_gui2d_widget.call(this, direction , x, y, w, h);
	
	this.direction = direction;
	
	this.type = direction+"ScrollbarSlider";
	
 	this.slideButton = new jsaf_gui2d_button('',-1,-1,0,0);

 	this.addEventHandler (	this.ON_INIT, this.onInit );	

	
	this.range =0;
	this.value =null;
		
}


jsaf_gui2d_scrollbarSlider.prototype.onInit = function ()
{	

	var p=this.position;
	
 	this.addEventHandler (	this.ON_UPDATE_RENDERCOORDS, this.onUpdateRenderCoords );	
	
 	this.addEventHandler (	this.ON_RENDER, this.onRender );	
	
	this.slideButton.addEventHandler ( this.slideButton.ON_RENDER, function()
	{ 	
		this.getSkin().drawImageV( 'background', this.getRenderCoords() );			
	});

	
	this.slideButton.addEventHandler (this.ON_MOUSE_DOWN, function () 
	{
		if(this.parent.direction=='horizontal')
			{				
				this.setPosition(this.gui.widgetMovePosition[0],0)

				if ( this.position[0]<0 )
					this.position[0]=0;

				if ( this.position[0] + this.position[2] > this.parent.position[2] )
				{	
					this.position[0]-=(this.position[0] + this.position[2])-this.parent.position[2] ;
				}
			
				var pos2val = (this.parent.range/this.parent.position[2])*this.position[0];
				
				this.parent.setValue ( pos2val );
		 
				this.updateRenderCoords();
			}

			if(this.parent.direction=='vertical')
			{						
				this.setPosition(0,this.gui.widgetMovePosition[1])

				if ( this.position[1]<0 )
					this.position[1]=0;
				
				if ( this.position[1] + this.position[3] > this.parent.position[3] )
				{	
					this.position[1]-=(this.position[1] + this.position[3])-this.parent.position[3] ;
				}	
							 
				var pos2val = (this.parent.range/this.parent.position[3])*this.position[1];
	 
				this.parent.setValue ( pos2val );
			
				this.updateRenderCoords();
			}
		
	});

	this.addChild (	this.slideButton );
	this.slideButton.setPosition(0,0);
	
}

jsaf_gui2d_scrollbarSlider.prototype.onUpdateRenderCoords = function ()
{ 
	this.updateSliderButtonPos();	
}

jsaf_gui2d_scrollbarSlider.prototype.setRange = function (range)
{
	this.range = range;

	if ( this.value < 0 ) value = 0;
	if ( this.value > this.range ) this.value = this.range;
	
	this.updateSliderButtonPos ();
}

jsaf_gui2d_scrollbarSlider.prototype.setValue = function (value)
{ 
	if ( value < 0 ) value = 0;
	
	var size;
	
	if ( this.direction=='vertical')
		size = this.position[3];

	if ( this.direction=='horizontal')
		size = this.position[2];
	
	if ( value > this.range-size ) value = this.range-size;
	
	var oldval = this.value;
	
	this.value = value;
		
	if ( this.value != oldval)
	{
		this.updateSliderButtonPos ();
		this.callEventHandler(this.ON_VALUE_CHANGED, this.value);
	}

	return this.value;
}

jsaf_gui2d_scrollbarSlider.prototype.getValue = function (value)
{
	return this.value;
}

jsaf_gui2d_scrollbarSlider.prototype.updateSliderButtonPos = function ()
{ 
	
	if(this.direction=='horizontal')
	{	
		var size = (this.position[2]/this.range)*this.position[2];
		var pos  = (this.position[2]/this.range)*this.value;
				
		if ( size <10 )
			size = 10;

		if ( size + pos > this.position[2] )
		{	
			pos -= (size + pos) - this.position[2]; 
					
			if(pos<0)pos=0;
		
			size -= (size + pos - this.position[2]);
		 
		}
		
		this.slideButton.setPosition( pos, this.slideButton.position[1], size,this.position[3] );		
 	}
	
	
	if(this.direction=='vertical')
	{
		var size = (this.position[3]/this.range)*this.position[3];
		var pos  = (this.position[3]/this.range)*this.value;
					
		if ( size <10 )
			size = 10;

		if ( size + pos > this.position[3] )
		{	
			pos -= (size + pos) - this.position[3]; 
					
			if(pos<0)pos=0;
		
			size -= (size + pos - this.position[3]);
		 
		}
		
		this.slideButton.setPosition( this.slideButton.position[0],pos,this.position[2],size ); 		
	}
 
}

jsaf_gui2d_scrollbarSlider.prototype.onRender = function ()
{
	var g = this.getRenderContext();

	var rc = this.getRenderCoords();

	var skin = this.getSkin('slider');

	skin.drawImageV ( 'background', rc );
}

