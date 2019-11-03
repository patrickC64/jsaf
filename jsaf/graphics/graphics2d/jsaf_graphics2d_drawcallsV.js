jsaf_graphics2d.prototype.drawPointV = function ( v )
{	
	this.pushRenderData ( this.POINT, v );
}


jsaf_graphics2d.prototype.drawLineV = function ( v )
{
	this.pushRenderData ( this.LINE, v);
}


jsaf_graphics2d.prototype.drawOvalV = function ( v )
{
	//this.pushRenderData ( this.TRIANGLES, [x1, y1, x2, y2 ]);

	/*
	 glBegin(GL_TRIANGLE_FAN);
	  for(int deg=0;deg<=63;deg++)
	  {
		float x=glib_sin[deg]*width;
		float y=glib_cos[deg]*height;
		glVertex2f (x,y);
	  }

    break;

    case true:
         glBegin(GL_LINE_STRIP);
          for(int deg=0;deg<=63;deg++)
          {

            float x=glib_sin[deg]*width;
            float y=glib_cos[deg]*height;

            glVertex2f (x,y);
          }	
	*/

}
 
 
jsaf_graphics2d.prototype.drawRectV = function ( v, unfilled)
{
	if ( typeof (unfilled) === 'undefined' || unfilled === false )
		this.pushRenderData ( this.QUAD, v);
	else
		this.pushRenderData ( this.QUAD_UNFILLED, v);
}

jsaf_graphics2d.prototype.drawImageV = function (img, v )
{
	this.pushRenderData ( this.QUAD, v, img.texture, 0);
}


jsaf_graphics2d.prototype.drawImageRectV = function (img, v)
{
	this.pushRenderData ( this.QUAD, v, img.texture, 0);	 
}


jsaf_graphics2d.prototype.drawAnimImageRectV = function (img, v, frame)
{
	if( img.anim == false )
	{
		alert("isn't animImage! check your imageload calls!");
		return;
	}	
	
	this.pushRenderData ( this.QUAD, v, img.texture, frame);
}


jsaf_graphics2d.prototype.drawTextV = function ( text, v , center )
{
	this.drawText ( text, v[0], v[1] );
}