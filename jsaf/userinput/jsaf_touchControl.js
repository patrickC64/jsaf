function jsaf_touchControl(inputControl)
{
	this.touch=[];
	
	for (var i=0; i<8;i++)
		this.touch[i]= {'touchstart':0, 'touchCoords': [] };
		
	this.inputControl= inputControl;	
	this.canvas		 = inputControl.canvas;
	this.graphics	 = inputControl.graphics;
 
	inputControl.canvas.addEventListener("touchstart",	function(t) { this.onTouchStart(t);}.bind(this) 	, false);
	inputControl.canvas.addEventListener("touchend", 	function(t) { this.onTouchEnd(t);}.bind(this) 		, false);
	inputControl.canvas.addEventListener("touchcancel", function(t) { this.onTouchCancel(t);}.bind(this) 	, false);
	inputControl.canvas.addEventListener("touchmove",	function(t) { this.onTouchMove(t);}.bind(this)		, false);
}


jsaf_touchControl.prototype.onTouchEnd = function (touch)
{
//	this.inputControl.mouseUp(1);
	this.inputControl.mouseUp(1);	
	//touch.stopPropagation();		
//	return false;
}


jsaf_touchControl.prototype.onTouchStart = function (touch)
{
 	this.inputControl.mouseDown(1);
//	touch.stopPropagation();		
//	return false;
}


jsaf_touchControl.prototype.onTouchCancel= function (touch)
{	
	this.inputControl.mouseUp(1);	

//	touch.stopPropagation();		
	//return false;
 
}


jsaf_touchControl.prototype.onTouchMove = function (touchEvent)
{	
	var touchIndex = 0;
	var tx = 0;
	var ty = 0;

	for(var i=0;i<touchEvent.touches.length-1;i++);
	{
 
		tx = touchEvent.touches[i].pageX;
		ty = touchEvent.touches[i].pageY;
	
		this.inputControl.setMousePosition( tx, ty );
		
		this.touch[i].touchCoords = [ tx, ty ];
	//	this.inputControl.mouseDown(1);
		
	//	touchEvent.touches[i].stopPropagation();
	
	}

	
//	touch.stopPropagation();		
//	return false;
}
