jsaf.include('application/init/initGui.js');

jsaf.include('application/include/portalOS_logic.js');

portalOS.prototype = Object.create ( jsaf.application.prototype );

function portalOS()
{	
	jsaf.application.call(this);
 		
	this.portalApplications = new dynamicList();
 
	this.loadInProgress = false;
	
	this.sessionID = null;
	this.userID = null;
	
			
}
 

portalOS.prototype.init =function ()
{	
	this.initGui();
	
 	this.startTestEnvironment();
}

portalOS.prototype.startTestEnvironment =function ()
{
	
/* // @FINAL:

	var applicationWindow = this.gui.jsaf_gui2d_applicationWindow ('scene3d',200,200,600,600),

	applicationWindow.applicationHost = this; // needs for graphics, input, ....

	applicationWindow.autostart = true;
	
	applicationWindow.guiApplication = false;
 			
	applicationWindow.loadApplication('/PORTAL_STORAGE/DEVELOPEMENT/SAMPLES','scene2d_s03');
	
*/
 
  	var app = this.bindApplication('../PORTAL_STORAGE/DEVELOPEMENT/SAMPLES','scene2d_s03');
 	 app.autostart = true;
     app.guiApplication = false;

  	var app = this.bindApplication('../PORTAL_STORAGE/DEVELOPEMENT/SAMPLES','scene2d_s03');
 	 app.autostart = true;
     app.guiApplication = false;		
	 app.startPos =[ 250, 250];	
 
  	var app = this.bindApplication('../PORTAL_STORAGE/DEVELOPEMENT/APPS','testApp2');
 	app.autostart = true;
 	app.guiApplication = false;
		
	app.startPos =[ 550, 350];	
 

}

portalOS.prototype.update =function ()
{	
 
	this.portalApplications.forEachData( function (portalOSApplication) 
	{	
		if (portalOSApplication.program && portalOSApplication.active )
		{				 
			portalOSApplication.program.deltaTime = this.deltaTime;
			
			portalOSApplication.program.ticker++;
			portalOSApplication.program.update();
			
		} else
			this.checkApplicationState( portalOSApplication )
		
	}.bind(this))
 
 
	var vr = this.vr;
	
	if ( vr && vr.inVR )
	{
		if(vr.frameData !=null)
		{
			var frameData = vr.frameData;

			var curFramePose = frameData.pose;
			var curPos = curFramePose.position;
			var curOrient = curFramePose.orientation;

			if (curOrient != null)
			{
				var ox = curOrient[1].toFixed(3); // swap X/Y make sense! have in mind device orientation in VR!
				
				var oy = curOrient[0].toFixed(3);
				
				this.obtn.text =ox+","+oy;
				
				var vrCamX = Math.round(ox*1000);
				var vrCamY = Math.round(oy*1000);
	 
				this.graphics.origin=[ vrCamX, vrCamY];				
			}	
		}  
		
	} else
		this.graphics.origin=[0,0];
 
}


portalOS.prototype.render =function ()
{
	this.fps =	this.frameCounter.getFps();

	this.gui2d.render()

	var g = this.graphics2d;

	if (  this.inputControl.touchControl )
	{
		
		for (var t = 0; t< 8;t++ )
		{
			var touchCoords = this.inputControl.touchControl.touch[t].touchCoords;
			
		//	g.drawText("TOUCH: "+touchCoords[0]+","+touchCoords[1],10,45+t*35);
		}
	}

	// returns true if right-handed controller connected
	if ( typeof( OVRInput) !='undefined' )
	{OVRInput.IsControllerConnected(OVRInput.Controller.RTrackedRemote);
			g.drawText("OVR: ",10,345 );
	}

	this.graphics2d.render();
}