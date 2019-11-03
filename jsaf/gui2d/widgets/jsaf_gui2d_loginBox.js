jsaf_gui2d_loginBox.prototype = Object.create(jsaf_gui2d_window.prototype);

function jsaf_gui2d_loginBox(title, x,y )
{
	jsaf_gui2d_window.call(this, title, x, y, 220, 155);
	
	this.dimensionMin =[ 220, 24];
	
	this.input_id =   new jsaf_gui2d_inputBox( 10,20,200,26);
	this.input_password =  new jsaf_gui2d_inputBox(10,65,200,26);
 
	this.input_type = 'password';
	
	this.button_ok =   new jsaf_gui2d_button('OK',10,110,90,26);
	this.button_cancel =  new jsaf_gui2d_button('ABORT',120,110,90,26);
 
	this.resizeable = false;
}	

jsaf_gui2d_loginBox.prototype.onInit = function()
{
	jsaf_gui2d_window.prototype.onInit.call(this);
	
	this.addChild ( this.input_id		);
	this.addChild ( this.input_password );	
	
	this.addChild ( this.button_ok		);
	this.addChild ( this.button_cancel	);
}