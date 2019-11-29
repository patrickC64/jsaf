jsaf.application = jsaf_application;


function jsaf_application(  )
{	
	this.rootpath = '';
	this.name = '';
	
	this.ticker 		= 	0;
	this.deltaLast		=   1;
	this.deltaTime 		= 	1;
					
	this.graphics 		= null;
	this.graphics2d  	= null;
	this.graphics3d 	= null;
	
	this.vr 			= null;
	this.renderVR		= false;
	
	this.gui2d 			= null;
	this.inputControl	= null;	
	this.sync = false;
	this.isMobile = false;
	
	if ( window.navigator.appVersion.toLowerCase().indexOf('android')!=-1 )
	{
		this.isMobile = true;
	}
}


jsaf_application.prototype.addUpdateHandler = function (uhi)
{
	this.updateHandlerList.addData ( uhi ) 
}

// jsaf_application entrypoint
jsaf_application.prototype.start = function ()
{
	jsaf.log("- JSAF APP START -");
	
	// @todo: add hint to error message handle error ------------------
	
	if( this.init != null)
		this.init();
	//jsaf.error("NO APPLICATION INIT HANDLER DEFINED!");
	
	if( this.update == null)
		jsaf.error("NO APPLICATION update HANDLER DEFINED!");
	
	if( this.render == null)
		jsaf.error("NO APPLICATION RENDER HANDLER DEFINED!");
	
	// ----------------------------------------------------------------

	this.renderApplication();
	
	this.enableVR();
}



jsaf_application.prototype.updateApplication = function ()
{
	var currentTime = Date.now()/1;

	this.deltaTime = ( currentTime-this.deltaLast )*.1;

	this.deltaLast  = currentTime;
	
	this.ticker++;
	
 	this.inputControl.update();
	
	if ( this.gui2d )
		this.gui2d.update();
	
	
	this.update();
	
	this.sync = false;

}

 
jsaf_application.prototype.renderApplication =function ()
{	
	this.updateApplication();
	
	if ( this.vr == null || this.vr.inVR == false)
	{	 
		if (this.sync == false)
		{

			this.render();
		}
		
 		window.requestAnimationFrame( this.renderApplication.bind(this) );	
	} 
	else
	{			
	 	this.vr.render( this.renderApplication.render.bind(this.renderApplication) ); 
	}
	
	this.sync = true;	
}


jsaf_application.prototype.enableVR = function ()
{
	this.vr			= new jsaf_vr( this.graphics );
	
	this.vr.onVRstart  = function ()
	{		

	}.bind(this);
	
	this.vr.onVRend  = function ()
	{		
		this.renderApplication();
		
	}.bind(this);
}