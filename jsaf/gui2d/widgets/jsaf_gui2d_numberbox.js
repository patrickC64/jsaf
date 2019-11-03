jsaf_gui2d_numberbox.prototype = Object.create(jsaf_gui2d_widget.prototype)

function jsaf_gui2d_numberbox(value,x,y,w,h)
{
	jsaf_gui2d_widget.call(this);
	
	this.position = [x,y,w,h];
	
	this.inputBox		 = null;	
	this.incrementButton = null;
	this.decrementButton = null;
	
	this.buttonWidth = 20;
	this.skinBackground = null;
	this.value = value;
	this.valueOld = value;

	this.min = null;
	this.max = null;
	this.step = 1.0;
	this.numeric = true;

}

jsaf_gui2d_numberbox.prototype.onValueChangedHandler = function ()
{	
	if (this == this.gui2d.focusWidget)
	{
		var val = parseInt(this.text)
			
		if (!isNaN(val))
		{
			if (val < this.min)val = this.min;
			if (val > this.max)val = this.max;

			if (this.onChanged != null && this.value !=val)
				this.onChanged(this);
		
			this.text = val.toString()
		} 
	}
}

jsaf_gui2d_numberbox.prototype.init = function ()
{		
	var p=[ this.position[0], this.position[1], this.position[2], this.position[3] ];
	jsaf_gui2d_widget.prototype.init.call(this);


	var sze = this.skin.sze;
	var buttonWidth = this.buttonWidth = 20;
	var buttonHeight = p[3]/2-sze-1
	var btnpos		 = [ p[2]-buttonWidth-sze, 0, buttonWidth-sze, buttonHeight ];
	
	this.incrementButton = this.addChild( new jsaf_gui2d_button('',0,0,0,0 ) ); 
	this.decrementButton = this.addChild( new jsaf_gui2d_button('',0,0,0,0 ) );
		
	this.inputBox = this.addChild( new jsaf_gui2d_textbox(this.value,0,0,0,0 ) );
	
	this.inputBox.adjustPositionNeeded=false;
	
	this.inputBox.setPosition (-sze*2, 0 , p[2]-btnpos[2], p[3]);
	
	this.inputBox.skinRender=false;
	
 	this.incrementButton.setPosition (btnpos[0], btnpos[1] , btnpos[2], btnpos[3]);
	
	btnpos[1]+=buttonHeight+2;
	
	this.decrementButton.setPosition (btnpos[0], btnpos[1] , btnpos[2], btnpos[3]);
	
	this.decrementButton.type ='decrementbutton';
	this.incrementButton.type ='incrementbutton';
 
	this.decrementButton.renderOutlines = -1;
	this.incrementButton.renderOutlines = -1;
	
	this.decrementButton.adjustPositionNeeded = false;
	this.decrementButton.adjustPositionNeeded = false;
	this.incrementButton.active=-1;
	
//	this.decrementButton.backgroundColor = [1.0,.0,0.0,1.0];
//	this.incrementButton.backgroundColor = [0.0,1.0,0.0,1.0];

	//btnpos		 = [ p[2]-buttonWidth-sze, 0, buttonWidth-sze, buttonHeight ];

	
	var cb = function(btn)
	{	 
 
		var v = this.step;
		
		if (btn.type =='decrementbutton') 
			v*=-1;

		var val = parseInt(this.inputBox.text);
 

		if ( !isNaN(val) )
		 this.setValue( v + val);

	}.bind(this);

		
	this.incrementButton.onClick = cb;
	this.decrementButton.onClick = cb;

 	this.incrementButton.onMouseDown = cb;
	this.decrementButton.onMouseDown = cb;

	this.incrementButton.skinOutline = -1;
	this.decrementButton.skinOutline = -1;

}



jsaf_gui2d_numberbox.prototype.render = function ()
{	

	jsaf_gui2d_widget.prototype.render.call(this);
 
 
	var g = this.gui2d.graphics;

	var rc = this.getRenderCoords();
	
	var sze = this.skin.sze;
 
	var btnsze = this.buttonSize;
	
	this.gui2d.graphics.setScale(1,1);
	
	g.setColor( this.color[0]*.45, this.color[0]*.45, this.color[2]*.45);

	this.gui2d.graphics.setColor(1,1,1);

//	g.drawImageRect (this.skin.image[0],rc[0]+this.position[2]-btnsze-1,rc[1]+this.position[3]/2-1,btnsze+sze+1,2)
//	g.drawImageRect (this.skin.image[0],rc[0]+this.position[2]-btnsze-2,rc[1]+sze,2,this.position[3]-sze*2)	

	g.drawImageRect (this.skin.image[0],rc[0],rc[1]+sze-1,+this.position[2],20,this.position[3]+3)	
	
}



jsaf_gui2d_numberbox.prototype.setRange = function(min, max, step)
{	
	this.min  = min;
	this.max  = max;
	this.step = step;	

	this.maxlen = max.toString().length;	
}

jsaf_gui2d_numberbox.prototype.setValue = function(value)
{	
	if (this.min!=null && value < this.min)value = this.min;
	if (this.max!=null && value > this.max)value = this.max;
 
	if (this.onChanged != null && this.value !=value)
		this.onChanged(this);		
	
	this.value = value;
	this.inputBox.text  = value.toString();	

}


jsaf_gui2d_numberbox.prototype.getValue = function()
{
	return this.value;
}