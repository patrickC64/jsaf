jsaf_scene2d_physicObject.prototype = Object.create(jsaf_scene2d_object.prototype)


function jsaf_scene2d_physicObject(layer)
{
	jsaf_scene2d_object.call(this, layer)
 
	this.accelerationImpulse = 0.0
	this.rotationImpulse = 0.0	
	this.speed = 0.0
	this.rotationSpeed = 0.0
		
}

jsaf_scene2d_physicObject.prototype.update = function ()
{
	jsaf_scene2d_object.prototype.update.call(this)

	
}

jsaf_scene2d_physicObject.prototype.setRotationImpulse = function (impulse)
{
	this.rotationImpulse = impulse
}


jsaf_scene2d_physicObject.prototype.setAccelerationImpulse = function (impulse)
{
	this.accelerationImpulse = impulse
}


jsaf_scene2d_physicObject.prototype.update = function ()
{
	this.rotationSpeed +=this.rotationImpulse*.03
	this.speed += this.accelerationImpulse*.025
	
	this.rotation +=this.rotationSpeed
	this.move(this.speed)	
	
	this.rotationImpulse*=.05
	this.accelerationImpulse*=.075

	this.speed*=.975 
	this.rotationSpeed*=.95
}	