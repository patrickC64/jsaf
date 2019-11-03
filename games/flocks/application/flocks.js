flocks.prototype = Object.create ( jsaf.application.prototype );

function flocks()
{
	//jsaf.application.call(this);
		
	this.name ='scene2d demo';	
}

flocks.prototype.init = function()
{
	console.log ("INIT");
}

flocks.prototype.update = function()
{

}


flocks.prototype.render = function()
{
console.log("zZz");
}
