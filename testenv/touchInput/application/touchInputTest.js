touchInputTest.prototype = Object.create ( jsaf.application.prototype );

window.onerror = function (e) {alert(e)};

function touchInputTest()
{
	jsaf.application.call(this);
		
	this.name ='touchInputTest Demo';	
}

touchInputTest.prototype.init = function()
{
	console.log ("INIT");
	
	this.font = this.graphics2d.loadFont("../../shared/fonts/default.png",16,16,1);
	
	this.graphics2d.setFont(this.font);
	
	this.touchInput = new jsaf.inputControl.touchInput(this.inputControl, this.graphics2d );
	this.touchControl = new jsaf.inputControl.touchControl( this.touchInput );
}

touchInputTest.prototype.update = function()
{
	this.touchInput.update();
	this.touchControl.update();
}


touchInputTest.prototype.render = function()
{
	var g2d = this.graphics2d;
 
	var mx = this.inputControl.mouseX;
	var my = this.inputControl.mouseY;
	
 	g2d.drawText ("JSAF touchInputTest",10,10);
	
	var rx = 20;
	
	if ( typeof(this.touchInput.touch[0]) != 'undefined' )
	{
 
	}
	

	
	g2d.setColor(1,1,1);
	
	var touch = this.touchInput.touch;
	
	for ( id =0; id < touch.length ; id++)
	{	if ( touch[id] )
		{
			g2d.drawText ( "ID:"+id, touch[id].x-30,touch[id].y-100 );
			g2d.drawRect ( touch[id].x-30,touch[id].y-30,60,60 );
		}
	}
	
	this.touchContoller.render();
	this.graphics2d.render();
}
