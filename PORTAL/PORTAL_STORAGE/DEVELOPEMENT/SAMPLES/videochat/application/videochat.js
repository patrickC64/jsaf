// INCLUDES ------------------------------

// ---------------------------------------


function startApplication()
{
	new jsaf_application( new videochat () ).start();	 
}

	
function videochat()
{
	this.appname ="videochat";

}
 

videochat.prototype.init =function ()
{
 
	this.font = this.graphics2d.loadImageFont("media/font.png",16,16,1);

	//this.localCam = this.gui2d.addChild(jsaf_gui2d_window('local cam',200,200,640,480));
	
	
	this.ticker =0;	
}

videochat.prototype.update =function ()
{	
}


videochat.prototype.render =function ()
{
}