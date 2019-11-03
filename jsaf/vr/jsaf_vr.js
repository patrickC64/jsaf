function jsaf_vr ( graphics )
{ 

	this.canvas = graphics.canvas;
	
	this.graphics = graphics;
		
	this.inVR = false;

	this.vrDisplay = null;
	
	this.frameData  = null;
	
	this.canvasSizeNonVR = [graphics.canvas.width,graphics.canvas.height];
	
	this.vrBrowser = false;

	this.onVRstart = null;
	this.onVRend = null;

	this.renderEyeCallback = null;
	this.eye = null;
	
	this.init();	
}


jsaf_vr.prototype.init = function ()
{
	if ( typeof ( navigator.getVRDisplays )!= 'undefinded' && navigator.getVRDisplays !=null )
 	navigator.getVRDisplays(). then ( function (displays)
	{	
		this.addVRbutton();	
		
		this.vrDisplay = displays[0];
		
		this.frameData = new VRFrameData();
			
		window.addEventListener('vrdisplaypresentchange', function () 
		{				
			// no VR display, exit
			if (this.vrDisplay  == null)
				return;

			// are we entering or exiting VR?
			if ( this.vrDisplay.isPresenting && this.inVR == false ) 
			{	
				this.startVR();
				this.inVR = true;
			} 
			else 
			{
				this.stopVR();
	
			}
			  
		}.bind(this));	
	
	}.bind(this))
}


jsaf_vr.prototype.stopVR = function ()
{  	  
	var width =	this.canvas.width = this.canvasSizeNonVR[0];
	var	height = this.canvas.height = this.canvasSizeNonVR[1];	
	this.graphics.gl.viewport(0, 0, width , height);

	this.inVR = false;	
	
	this.onVRend();
}				

jsaf_vr.prototype.startVR = function ()
{

	if ( this.vrDisplay == null || this.inVR == true )
		return;

	this.vrDisplay.requestPresent([{ source: this.canvas }]);//
	// We should make our canvas the size expected
	// by WebVR
	this.eye = this.vrDisplay.getEyeParameters("left");
	
	this.canvas.width = this.eye.renderWidth * 2;
	this.canvas.height = this.eye .renderHeight;	 
	
}

jsaf_vr.prototype.addVRbutton = function ()
{		
	var vrbtn = document.createElement('div')

	vrbtn.innerHTML = 'ENTER VR'

	vrbtn.style.position="fixed";
	vrbtn.style.top='35px';
	vrbtn.style.left='30px';
	vrbtn.style.color='#fff';
	vrbtn.style.display='block';

	vrbtn.style.fontSize='12px';
	vrbtn.style.fontWeight ='1000';
	vrbtn.style.padding='6px';
	vrbtn.style.border='2px solid white';
	vrbtn.style.backgroundColor='#324';
	vrbtn.style.borderRadius='8px';
	vrbtn.style.cursor ='grab';
	vrbtn.style.opacity='0.5';

	vrbtn.onclick=this.startVR.bind(this);

	var currentDiv = document.getElementById('jsafRenderCanvas');

	document.body.insertBefore(vrbtn, null); 

	// optional, but recommended
	//vrDisplay.depthNear = /* near clip plane distance */;
	//vrDisplay.depthFar = /* far clip plane distance */;
}

// entry point for non-WebVR rendering
// called by whatever mechanism (likely keyboard/mouse events)
// you used before to trigger redraws
jsaf_vr.prototype.render = function ( rendercallback ) 
{ 	
		
	if (this.vrDisplay == null || this.inVR == false)  
	{
		return;
	}

	const gl = this.graphics.gl;
	
	// set clearColor and call gl.clear()
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER)
	
	this.vrDisplay.getFrameData(this.frameData);	
	
	this.renderEyes(rendercallback);
	
	this.vrDisplay.submitFrame(); 	
	

	this.vrDisplay.requestAnimationFrame( this.render.bind (this,rendercallback) );
	
}

// entry point for WebVR, called by vrCallback()
jsaf_vr.prototype.renderEyes  = function (rendercallback) 
{	
	this.renderEye(true , rendercallback);
	this.renderEye(false, rendercallback);
}


jsaf_vr.prototype.renderEye = function (isLeft, rendercallback ) 
{
    const gl = this.graphics.gl;
	
	var width = this.canvas.width;
	var	height = this.canvas.height;
		
	//width = this.graphics.width;
//	height = this.graphics.height;
	
 

    // choose which half of the canvas to draw on
    if (isLeft) {
        gl.viewport(0, 0, width/2 , height);
    } else {
        gl.viewport(width/2 , 0, width/2 , height);
    }
	
	rendercallback();

	//this.renderEyeCallback();
}
 
jsaf_vr.prototype.requestAnimationFrame = function (callback)
{	
	// reregister callback if we're still in VR
	if ( this.inVR == true)
		this.vrDisplay.requestAnimationFrame(callback);
}




