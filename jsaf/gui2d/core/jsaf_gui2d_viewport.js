jsaf_gui2d.prototype.viewportPushV  = function (vi)
{
								
	var v = [ vi[0], vi[1], vi[2], vi[3] ];
 
	if ( this.viewport.length>0 )
	{
		var pv = this.viewport[ this.viewport.length-1 ];
 			
		v = jsaf_math_rectanglePassInto (  vi ,pv);		
	}
	
	this.viewport.push (v);
	
	this.renderContext.enableViewportV ( [v[0],v[1],v[2],v[3]] );
}


jsaf_gui2d.prototype.viewportPop  = function ()
{
 	var v = this.viewport.pop();

	if ( this.viewport.length == 0 )
	{
		this.renderContext.disableViewport (  );	
	} 
	else
	{
		var v = this.viewport[this.viewport.length-1];
		
		this.renderContext.enableViewport ( v[0], v[1], v[2], v[3] );		
	}

}
