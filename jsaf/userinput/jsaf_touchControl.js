jsaf.inputControl.touchControl = jsaf_touchControl;


function jsaf_touchControl( touchInput )
{	
	this.inputControl = touchInput.inputControl;
	this.touchInput = touchInput;
	this.graphics2d = touchInput.graphics2d;	
	// { type: rect, coords: [x,y,sx,sy] , key: id}
	// { type: oval, coords: [x,y,r], key: id }	
	// { type: image, coords: [x,y], key: id}	
	this.touchZone = [];
}


jsaf_touchControl.prototype.addTouchZone = function ( args )
{	
	args.state = 0;
	return this.touchZone.push ( args );
}


jsaf_touchControl.prototype.update = function ()
{	
	var touch,x,y;
 		
	for ( index = 0; index < this.touchInput.touch.length; index ++) 
	{
		touch = this.touchInput.touch[index];
		
		if ( !touch ) 
			continue;
		
		x = touch.x;
		y = touch.y;

		this.touchZone.forEach ( function (zone) {

			zone.state = 0;
		
			var c = zone.coords;
			
			switch (zone.type)
			{
				case 'image':
				case 'rect':
					if ( x > c[0] && x < (c[0]+c[2])
					&&   y > c[1] && y < (c[1]+c[3]) )
					{	
						if ( this.inputControl.keystate[zone.keyCode]==0 )
							this.inputControl.keystate[zone.keyCode]=1;
						
						zone.state = 1;
					}	 
				break;

				case 'oval':
				break;
			}
		}.bind(this));	

	}
	
}


jsaf_touchControl.prototype.render = function ()
{	
	var g = this.graphics2d;
	
	this.touchZone.forEach ( function (zone) {
		var c = zone.coords;

		switch (zone.state)
		{
			case 0:
			g.setColor ( 1,1,1);
			break;
			case 1:
			g.setColor ( 0,1,0);
			break;
		}
		
		switch (zone.type)
		{
			case 'rect':
			g.drawRectV (c);
			break;
			case 'oval':
			g.drawRectV (c);
			break;
			case 'image':
			g.drawRectV (c);
			break;
		}
	});
}