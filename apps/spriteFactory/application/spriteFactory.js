jsaf.include('application/include/initGui.js');
jsaf.include('application/include/createGui.js');

spriteFactory.prototype = Object.create ( jsaf.application.prototype );

function spriteFactory()
{	
	jsaf.application.call(this);
}


spriteFactory.prototype.init =function ()
{	
	this.createGui();
 
	this.font = this.graphics2d.loadFont("../../shared/fonts/default.png",16,16,1);	
}


spriteFactory.prototype.update =function ()
{	

}


spriteFactory.prototype.render =function ()
{
	var g = this.graphics2d;		
	
	this.gui2d.render();
	
	g.setColor(1,1,1);
	g.setAlpha(1);
	g.setScale(.5,.75);	
	g.setFont(this.font);
	
	g.drawText("fps:"+this.frameCounter.getFps(),5,5);
	g.setScale(1,1);	
	g.render(); 
}