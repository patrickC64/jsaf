function jsaf_keyControl(canvas)
{
	this.KEY_PRESS = 1
	this.KEY_DOWN = 2
	this.KEY_UP = 3
					
	this.mouseX = 0;
	this.mouseY = 0;
	
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
			this.keyState[e.which]=1;
		else
			this.keyState[e.which]=2;
		
		if(e.which==8)
		{
			e.stopPropagation();
			return false;
		}

	}.bind(this)
	
 
	document.onmousedown = function (e)
	{
			this.keyState [300]=1;
			
		e.stopPropagation();
		return false;

	}.bind(this)	

	
	document.onmouseup = function (e) 
	{
			this.keyState [300]=3;
			
		e.stopPropagation();
		return false;

	}.bind(this)


	document.onmousemove = function (e) 
	{
		this.mx=e.offsetX;
		this.my=e.offsetY;
		
	}.bind(this)

}


jsaf_keyControl.prototype.getKeystate = function(key)
{
	var keyState = this.keyState[key];


	return keyState;
}	


jsaf_keyControl.prototype.update = function(key)
{
 
	for (key=0;	key<this.keyState.length; key++)
	{

		
		if(this.keyState[key]==3)
		{	
			this.keyState[key]=0;
		}
		
		if(this.keyState[key]==1)
			this.keyState[key]=2;
	}
}