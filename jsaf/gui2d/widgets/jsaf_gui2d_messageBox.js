jsaf_gui2d_messageBox.prototype = Object.create(jsaf_gui2d_window.prototype);

function jsaf_gui2d_messageBox(title, text, x,y )
{
	jsaf_gui2d_window.call(this, title, x, y, 220, 165);
	
	this.dimensionMin =[ 220, 24];

	this.button_ok =   new jsaf_gui2d_button('OK',10,120,90,26);
	this.button_cancel =  new jsaf_gui2d_button('ABORT',120,120,90,26);
	
	this.box_text =  new jsaf_gui2d_text(text,10,10,210,140);
	this.checkBox =  new jsaf_gui2d_checkbox('CheckboxTest',10, 60 );

	
	
	this.resizeable = false;
	
}	

jsaf_gui2d_messageBox.prototype.onInit = function()
{
	jsaf_gui2d_window.prototype.onInit.call(this);
	
	this.addChild ( this.box_text		);  	
	this.addChild ( this.button_ok 		);
	this.addChild ( this.button_cancel  );
	this.addChild ( this.checkBox  		);

}