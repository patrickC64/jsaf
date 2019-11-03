jsaf_gui2d_applicationWindow.prototype = Object.create (jsaf_gui2d_window.prototype);

function jsaf_gui2d_applicationWindow (title, x,y,w,h , option )
{
	jsaf_gui2d_window.call( this, title, x, y, w, h );
	
	this.type ='applicationWindow';
 
	this.application = null;
	this.useSystemColor = false;
	this.container.renderBackground = false;
	
	this.addEventHandler (this.ON_CHILD_GET_FOCUS, this.onFocus );
	this.addEventHandler (this.ON_CHILD_LOST_FOCUS, this.onFocusLost );
	
	this.dummyControl = { 'getKeystate':function() { return 0;} , 'update': function (){ return true } };
	
	this.realControl = { 'getKeystate': function(k) { return this.getInputControl().getKeystate(k) }.bind(this) , 'update': function (){ return true } };
	
	this.scaleToWindow = true;
	
	if ( option ) 
	{
		if ( option.scaleToWindow )
				this.scaleToWindow = option.scaleToWindow; 		
	}
	
}


jsaf_gui2d_applicationWindow.prototype.onFocus = function ()
{ 
 	this.application.program.inputControl = this.realControl;
}


jsaf_gui2d_applicationWindow.prototype.onFocusLost = function ()
{
	this.application.program.inputControl = this.dummyControl; 
}


jsaf_gui2d_applicationWindow.prototype.setApplication = function (application)
{
	this.application = application;
	
	this.application.program.inputControl = this.dummyControl; 
	
	//this.inputControl = { 'getKeystate':function() { return 0;} };
	
	this.container.addEventHandler (this.container.ON_RENDER, this.renderApplication , this );
 
}


jsaf_gui2d_applicationWindow.prototype.renderApplication = function (application)
{ 
	//prepare viewport
	var g = this.getRenderContext()
		
	var corigin = g.getOrigin();

	var rorigin = this.container.getRenderCoords()

	if ( this.scaleToWindow )
	{
		var cRes = g.getResolution();
		
		var ratio = [ cRes[0] / rorigin[2], cRes[1] / rorigin[3]] 
		
		if ( this.useSystemColor == false)
			g.setColor (1,1,1)
		
		var wres = [ Math.round(ratio[0]*cRes[0]) ,  Math.round ( ratio[1]*cRes[1] ) ];
		
		g.setResolution( wres[0], wres[1]);
		
		g.setOrigin (rorigin[0]*ratio[0], rorigin[1]*ratio[1])
		
		// render application content
		this.application.program.render();

		// reset vieport
		g.setResolution( cRes[0],cRes[1]);

		g.setOrigin (corigin[0], corigin[1]);
	} 
	else
	{
		// render application content
		this.application.program.render();
	}

		
}