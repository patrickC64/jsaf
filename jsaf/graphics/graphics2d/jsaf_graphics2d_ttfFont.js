jsaf_graphics2d_ttfFont.prototype = Object.create ( jsaf_graphics2d_font.prototype );


function jsaf_graphics2d_ttfFont( graphics2d )
{
	jsaf_graphics2d_font.call ( this, graphics2d );
	
	this.letterSpacing = 6;
	
	this.polygons = [];
}


jsaf_graphics2d_ttfFont.prototype.loadFont = function ( url  )
{
	var fontSize = 60;
	this.image = this.graphics2d.createImage(1,1);
	
    opentype.load( url, function (err, font) {
		
        if (err) {
            console.log(err);
        }

        inFont = font;
        var buffer = inFont.toArrayBuffer();
        outFont = opentype.parse(buffer);

		var g = this.graphics2d;
 
		var gl = this.graphics2d.gl;

		var cellsxy =  Math.round ( Math.sqrt( outFont.glyphs.length ) );
 
		var imgsize = (cellsxy  )*fontSize;
	 
  /*
	 	var imgsizeNonPow2 = imgsize;
		
		imgsize =  Math.pow( 2, Math.round( Math.log( imgsize ) / Math.log( 2 ) ) ); 

		if ( imgsizeNonPow2 > imgsize )
		{ imgsize*=2;
		} 
  
 */
		var settings = {   
						//  'wrap_s':gl.CLAMP_TO_EDGE, 'wrap_t':gl.CLAMP_TO_EDGE
					       'filter':gl.LINEAR	 
					   } ;

		this.image = this.graphics2d.createImage( imgsize   , imgsize +fontSize  , settings );
	
		g.setRenderTarget( this.image );
	
		g.setColor(0,0,0);
		g.setAlpha(1);
		g.setScale(1,1);	

		var x;
		var y;
		var glyph,path,cPoly,unicode, offset;

		for (var gi = 0; gi < outFont.glyphs.length; gi++) {
			
			glyph = outFont.glyphs.get(gi);

			path = glyph.getPath( 0 ,  -fontSize*.25 , fontSize );
 	
			cPoly = new jsaf_graphics2d_polygonPath();	;

			for (let i = 0; i < path.commands.length; i += 1) 
			{
				const cmd = path.commands[i];
				
				cmd.y *=-1.0;
				cmd.y1*=-1.0;
				cmd.y2*=-1.0;
				
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
			 
			this.polygons.push (cPoly);
			
			offset = glyph.unicode+2   ;
			
			x = ( (offset+3 ) % (cellsxy    )) * (fontSize) 
			y = this.image.height-(Math.round( (offset-2  )/(cellsxy  ) ) )*fontSize ;
	 
			g.drawPolygon 	( cPoly.triangles , x+.375  ,y+fontSize*2+.375  );		  
		}				
				 	
		g.setRenderTarget( null );	
 		
	 	this.image.texture.createTextureAtlas (cellsxy, cellsxy+1    )

    }.bind(this) );
	
}





jsaf_graphics2d_ttfFont.prototype.drawText = function ( text, x, y, center)
{
	if( !this.image || this.image.texture.texuv == null)
		return;

	text+='';
	
	var scale = this.graphics2d.getScale();

	var texture = this.image.texture;
	
	var cellWidth =  texture.cellWidth;
	

 
	var xoff = x;
	var yoff = y;
	
	var charOff = ( ( texture.cellsX*texture.cellsY ) >>1 ) % 100;
 
	// draw each glyph seperate
	for(c=0;c<text.length;c++)
	{	
		if (text.charCodeAt(c) == 10)
		{
			yoff += texture.cellHeight;
			
			xoff = v[0];
		}
	
		this.drawChar( text.charCodeAt(c) -25, xoff , yoff);
		
			xoff += (cellWidth *.525)* scale[0];

		if (this.letterSpacing !=0 )
			xoff += this.letterSpacing * scale[1];
		
	}
 
}


jsaf_graphics2d_ttfFont.prototype.drawChar = function ( char, x, y)
{	
	this.graphics2d.pushRenderData ( this.graphics2d.QUAD, [ x, y, this.image.texture.cellWidth, this.image.texture.cellHeight], this.image.texture, char);	
}