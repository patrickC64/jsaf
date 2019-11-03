jsaf.inputControl = jsaf_inputControl;

jsaf.use('userinput/jsaf_touchControl.js')

function jsaf_inputControl(graphics)
{	
	
	this.KEY_PRESS = 1
	this.KEY_DOWN = 2
	this.KEY_UP = 3
					
	this.mouseX = 0;
	this.mouseY = 0;
	this.keyhit = false;

	this.graphics = graphics;
 
	var canvas = this.canvas = graphics.canvas;
	
	this.touchControl = new jsaf_touchControl ( this );
	
	
	this.keyState = new Array(310);
	for (var key=0;key<310;key++)
		this.keyState[key]=0;

	document.onkeyup = function (e)
	{
			this.keyState [e.which]=3;
			//alert("KU"+e.which);

		if(e.which==8)
		{
			e.stopPropagation();
			return false;
		}
	}.bind(this)

	
	document.onkeydown = function(e)
	{		
		if(this.keyState[e.which]==0)
		{
			this.keyState[e.which]=4;
			this.keyhit=e.which;
		}
		
		if(e.which==8)
		{
			e.stopPropagation();
			return false;
		}

	}.bind(this)
	
 
	canvas.onmousedown = function (e)
	{		
		this.mouseDown ( e.which )
 			
	//	e.stopPropagation();
	//	return false;

	}.bind(this)	

	
	canvas.onmouseup = function (e) 
	{
		this.mouseUp (e.which);
 
	//	e.stopPropagation();
	//return false;

	}.bind(this)


	canvas.onmousemove = function (e) 
	{
		this.setMousePosition ( e.offsetX, e.offsetY )
		
	}.bind(this)


}

jsaf_inputControl.prototype.setMousePosition = function (x,y)
{
	x *= (this.graphics.resolution[0]/this.graphics.canvas.clientWidth);
	y *= (this.graphics.resolution[1]/this.graphics.canvas.clientHeight);
	
	this.mouseX=Math.round(x);
	this.mouseY=Math.round(y);
}

jsaf_inputControl.prototype.mouseDown = function (mouseButton)
{	
	mouseButton+=299;
	
	if(this.keyState[mouseButton]==0)
		this.keyState[mouseButton]=4;
}

jsaf_inputControl.prototype.mouseUp = function (mouseButton)
{
	mouseButton+=299;
	
	this.keyState [mouseButton]=5;
}

jsaf_inputControl.prototype.getKeystate = function(key)
{
	var keyState = this.keyState[key];


	return keyState;
}	


jsaf_inputControl.prototype.getKeyHit = function()
{
	var key = this.keyhit;
 
	this.keyhit = false;

	return key;
}	


jsaf_inputControl.prototype.update = function(key)
{
 
	for (key=0;	key<this.keyState.length; key++)
	{
		if(this.keyState[key]==3)
		{	
			this.keyState[key]=0;
		}
		
		if(this.keyState[key]==5)
		{	
			this.keyState[key]=3;
		}
		
		if(this.keyState[key]==1)
			this.keyState[key]=2;	
		
		if(this.keyState[key]==4)
			this.keyState[key]=1;
	}
}