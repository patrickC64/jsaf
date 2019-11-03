jsaf_gui2d_control.prototype = Object.create(jsaf_gui2d_widget.prototype)

function jsaf_gui2d_control(type, x,y,w,h)
{
	jsaf_gui2d_widget.call( this, type , x, y, w, h );
}

