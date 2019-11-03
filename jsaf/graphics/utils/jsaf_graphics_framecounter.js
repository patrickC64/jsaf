jsaf.frameCounter = jsaf_graphics_frameCounter;

function jsaf_graphics_frameCounter()
{
	this.fps=0;
	this.framesAverage=0;
	this.nframe=0;
	this.lastTime=1;
	this.currentTime = 0;
}


	 
jsaf_graphics_frameCounter.prototype.getFps = function ()
{
	this.currentTime = new Date()/1000;
	
	this.nframe++;
	
	if ( this.currentTime - this.lastTime > 1)
	{
		this.fps=this.nframe;
		this.nframe=0;
		this.lastTime = this.currentTime;
	}
	
	return this.fps;	
}
 