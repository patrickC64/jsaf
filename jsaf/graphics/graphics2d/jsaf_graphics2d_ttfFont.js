jsaf.use("3thdParty/opentypejs/dist/opentype.min.js");
jsaf.use("3thdParty/earcut/earcut.js");

jsaf_graphics2d_ttfFont.prototype = Object.create ( jsaf_graphics2d_font.prototype );


function jsaf_graphics2d_ttfFont( graphics2d )
{
	jsaf_graphics2d_font.call ( this, graphics2d );
	
	this.letterSpacing = 6;
	
	this.isload = false;

	this.glyphs = [];
	
}


jsaf_graphics2d_ttfFont.prototype.loadFont = function ( url, fontSize  )
{
	fontSize = fontSize ? fontSize : 32;
	
	this.fontSize = fontSize;
		
    opentype.load( url, function (err, font) {
	//console.log(font);
		var amount, glyph, ctx, x, y, fontSize;
		
        if (err) {
            console.log("LOAD TTFFONT ERROR :"+err);
        }
 
		//console.log ( font );
		
     //   var buffer = font.toArrayBuffer(font);

      //  outFont = opentype.parse(buffer);

		var x;
		var y;
		var path,cPoly,unicode, offset;

		// console.log ( outFont )

		for (var gi = 0; gi < font.glyphs.length; gi++) {
			
			glyph = font.glyphs.get(gi);

			path = glyph.getPath( 0 ,  0 , fontSize, {kerning: true } );
	
			glyph.advanceWidth=0;
			
			cPoly = new jsaf_graphics2d_polygonPath();	;

			for (let i = 0; i < path.commands.length; i += 1) 
			{
				const cmd = path.commands[i];
				
				/* // obsolete
				cmd.y *=-1.0;
				cmd.y1*=-1.0;
				cmd.y2*=-1.0;
				*/
				
				switch ( cmd.type )
				{
					case 'M':
						cPoly.beginPath();
						cPoly.moveTo ( { x:cmd.x, y:cmd.y } );	 
						break;
					case 'L':
						cPoly.lineTo ( { x:cmd.x , y:cmd.y  } );
						break;
					case 'C':
					 	cPoly.bezierCurveTo( { x:cmd.x2, y:cmd.y2 } ,  { x:cmd.x1 , y:cmd.y1  }, { x:cmd.x  , y:cmd.y    } );
						break;
					case 'Q':
					 	cPoly.quadraticCurveTo( { x:cmd.x , y:cmd.y  } ,  { x:cmd.x1  , y:cmd.y1   } );

						break;
					case 'Z':
						cPoly.closePath();	
						break;
				}
							
		
			}
			
			cPoly.closePath();

			this.glyphs[glyph.unicode] = { 'polygon': cPoly, 'metrics': glyph.getMetrics() };

		}	
		
		this.isload = true;
		
		
    }.bind(this) );

}


jsaf_graphics2d_ttfFont.prototype.drawText = function ( text, x, y, center)
{
	if( this.isload == false )
		return;

	text+='';
 
	let xoff = x;
	let yoff = y;
	let scale = this.graphics2d.getScale();//[ 1.0, 1.0];
	let glyph = null;
	
	// draw each glyph seperate
	for(c=0;c<text.length;c++)
	{	
		if (text.charCodeAt(c) == 10)
		{
			yoff += this.fontSize;
			xoff = x;			
			continue;
		}
	
		if ( glyph = this.glyphs[text.charCodeAt(c)] )
		{	
			if( text.charCodeAt(c)!=32 )
			this.drawGlyph( glyph , xoff , yoff);
		}
		
		xoff += (this.fontSize*1.6)* scale[0];
						
		if (this.letterSpacing !=0 )
			xoff += this.letterSpacing * scale[1];
		
		
	}
 
}


jsaf_graphics2d_ttfFont.prototype.drawGlyph = function ( glyph, x, y)
{
	this.graphics2d.drawPolygon ( glyph.polygon.triangles, x, y); 
}


jsaf_graphics2d_ttfFont.prototype.convertToBitmapFont = function ()
{

		var g = this.graphics2d;
 
		var gl = this.graphics2d.gl;


		var cells =  Math.round ( Math.sqrt( outFont.glyphs.length )*2 );
 
		var imgsize = (cells  )*fontSize;
	 
  /*
	 	var imgsizeNonPow2 = imgsize;
		
		imgsize =  Math.pow( 2, Math.round( Math.log( imgsize ) / Math.log( 2 ) ) ); 

		if ( imgsizeNonPow2 > imgsize )
		{ imgsize*=2;
		} 
  
 */
		var settings = {   
						   'wrap_s':gl.CLAMP_TO_EDGE, 'wrap_t':gl.CLAMP_TO_EDGE,
					       'filter':gl.NEAREST	 

					   } ;

		this.image = this.graphics2d.createImage( imgsize   , imgsize , settings );
	
		g.setRenderTarget( this.image );
	
		g.setColor(.5,.5,.5);
		g.drawRect(0,0,1024,1024)
		g.setColor(1,1,1);

		g.setAlpha(1);
		g.setScale(1,1);		
}
