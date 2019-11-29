app.prototype = Object.create ( jsaf.application.prototype );

function app()
{
	//jsaf.application.call(this);
		
	this.name ='scene2d demo';	
}

app.prototype.init = function()
{
	console.log ("INIT");
	
	this.font = this.graphics2d.loadFont("../../shared/fonts/default.png",16,16,1);
	
	this.graphics2d.setFont(this.font);
	
}

app.prototype.update = function()
{

}


app.prototype.render = function()
{
	var g2d = this.graphics2d;
	
	g2d.drawRect ( 500,100,200,200);
	g2d.drawText ("HELLO",100,200);
	
	this.graphics2d.render();
}
