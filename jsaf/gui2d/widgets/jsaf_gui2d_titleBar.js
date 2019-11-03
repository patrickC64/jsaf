jsaf_gui2d_titleBar.prototype = Object.create(jsaf_gui2d_widget.prototype)

function jsaf_gui2d_titleBar( title, w, h )
{
	jsaf_gui2d_widget.call(this,'titleBar',0 ,0 ,w ,h );

	this.text = title;
	
 	this.addEventHandler (	this.ON_INIT, this.onInit );	

	this.transformOrigin = null;
	this.transformCoords = null;	
}


jsaf_gui2d_titleBar.prototype.onInit = function ()
{
	this.addEventHandler ( this.ON_MOUSE_UP, function()
	{
		this.transformOrigin = null;
		this.transformCoords =[0,0];		
	});	
	
	this.addEventHandler ( this.ON_MOUSE_DOWN, function()
	{	

		if ( this.transformOrigin == null)
		{
			this.transformOrigin = [ this.parent.position[0]
								   , this.parent.position[1] ];
			
			this.transformCoords =[0,0];
		
		} 
		else
		{
			
			this.transformCoords[0]= this.gui.widgetMoveDistance[0];
			this.transformCoords[1]= this.gui.widgetMoveDistance[1];			
				
			var transform = [ this.transformOrigin[0] + this.transformCoords[0] 
							, this.transformOrigin[1] + this.transformCoords[1] ];

			this.parent.setPosition(transform[0],transform[1]);
		}
		
	});
}


jsaf_gui2d_titleBar.prototype.render = function ()
{ 
	var g = this.getRenderContext();

	var rc = this.getRenderCoords();

	var skin = this.getSkin();
	
	g.resetTransform();

	skin.drawImageV ( 'background', rc );

	skin.drawTextV ( 0 , this.text, rc  );
	
	var h = 4;
	
	rc[1] +=rc[3]-h;
	rc[3] -=rc[3]-h;
	
	rc[0]-=1;
	rc[2]+=2;

	skin.drawImageV ( 'border', rc );
}

