jsaf.inputControl.touchInput = jsaf_touchInput;

function jsaf_touchInput(inputControl, graphics2d )
{
	this.touch=[];
	
	this.bubble = false;
	
	this.inputControl= inputControl;	
	this.canvas		 = inputControl.canvas;
	this.graphics	 = inputControl.graphics;
	this.graphics2d	 = graphics2d;
 
	inputControl.canvas.addEventListener("touchstart",	function(e) { this.onTouchStart  (e);}.bind(this) , false);
	inputControl.canvas.addEventListener("touchend", 	function(e) { this.onTouchEnd	 (e);}.bind(this) , false);
	inputControl.canvas.addEventListener("touchcancel", function(e) { this.onTouchCancel (e);}.bind(this) , false);
	inputControl.canvas.addEventListener("touchmove",	function(e) { this.onTouchMove   (e);}.bind(this) , false);
}


jsaf_touchInput.prototype.onTouchEnd = function (e)
{
	for ( index = 0; index < e.changedTouches.length; index ++) 
	{
		var id =  e.changedTouches[index].identifier;
		
		this.touch[id]=null;
	}
}


jsaf_touchInput.prototype.onTouchCancel= function (e)
{	
	for ( index = 0; index < e.changedTouches.length; index ++) 
	{
		var id =  e.changedTouches[index].identifier;
		
		this.touch[id]=null;
	} 
}


jsaf_touchInput.prototype.onTouchStart = function (e)
{	
	for ( index = 0; index < e.changedTouches.length; index ++) 
	{
		var id =  e.changedTouches[index].identifier;
		
		if ( this.touch[id] )
			return;
		
		x = e.changedTouches[index].clientX;
		y = e.changedTouches[index].clientY;

		x *= (this.graphics.resolution[0]/this.graphics.canvas.clientWidth);
		y *= (this.graphics.resolution[1]/this.graphics.canvas.clientHeight);
		
		this.touch[id] = {x:parseInt(x), y:parseInt(y)};
	}	
}


jsaf_touchInput.prototype.onTouchMove = function (e)
{	
	for ( index = 0; index < e.changedTouches.length; index ++) 
	{
		var id =  e.changedTouches[index].identifier;
		
		if ( !this.touch[id] )
			return;

		x = e.changedTouches[index].clientX;
		y = e.changedTouches[index].clientY;

		x *= (this.graphics.resolution[0]/this.graphics.canvas.clientWidth);
		y *= (this.graphics.resolution[1]/this.graphics.canvas.clientHeight);
		
		this.touch[id] = { x:parseInt(x), y:parseInt(y) };
	}
}


jsaf_touchInput.prototype.update = function ()
{ 

}
