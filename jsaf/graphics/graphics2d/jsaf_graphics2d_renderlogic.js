jsaf_graphics2d.prototype.render = function ( )
{
	if ( this.renderCallVertices == 0)
		return;
	
	this.gl.disable( this.graphics.gl.DEPTH_TEST ) 
 
	this.renderBufferData();


}


jsaf_graphics2d.prototype.useShader = function ( shader )
{
	if ( this.currentShader && this.currentPrimitive && this.renderCallVertices > 0 )
		this.renderBufferData();
	
	this.currentShader = shader;
 	
	this.currentShader.use();	
	

	this.renderBuffer.resolution [0] =   this.graphics.resolution[0]; 
	this.renderBuffer.resolution [1] =   this.graphics.resolution[1]; 	

}


jsaf_graphics2d.prototype.pushRenderData = function ( type, position, texture, frame )
{
	// todo: description
	if ( this.currentPrimitive == null  
	|| 	 type != this.currentPrimitive || this.renderTextured != ( texture != null) )
	{		
		if ( this.renderTextured = ( texture != null) )
		{	
			this.useShader ( this.textured2dshader );
		} else
			this.useShader ( this.solid2dshader );

		this.currentPrimitive = type;	
	}

	// todo: description
	if ( this.renderTextured )
	{	
		if ( this.renderCallTextures.length == this.graphics.textureUnits-1 )
		{	
			var found = false;
	
			for (var tex = 0; tex <=  this.renderCallTextures.length;tex++)
			{
				if ( this.renderCallTextures[tex]==texture.glTexture )
				{			
					found=true;
					break;
				}
			}
			
			 if ( found == false)
			 	this.render();
		}		
	} 	
 
	var vertices = this.pushPositionData ( type, position );

	this.pushColorData ( vertices )
	
	if ( this.renderTextured )
	{	
		this.pushTextureData(texture, frame, vertices);		
	} 

	this.renderCallVertices+= vertices;	
}


jsaf_graphics2d.prototype.renderBufferData = function (  )
{ 
	
	if ( !this.currentShader || this.renderCallVertices == 0)
		 return;
 
 	var gl = this.graphics.gl;
	
	
	if ( this.currentShader == this.textured2dshader)
	{
		for (var tex = 0;tex <= this.renderCallTextures.length; tex++)
		{
			gl.activeTexture(gl.TEXTURE0 + tex);
			 
			gl.bindTexture(gl.TEXTURE_2D, this.renderCallTextures[tex]);	
			
			this.renderBuffer.textures[tex]=tex;
		}
	}

	this.renderBuffer.yflip[0] = this.graphics.yflip; 	

	this.currentShader.bindBuffersData(this.renderCallVertices);
 
	switch ( this.currentPrimitive )
	{
		case this.POINT:
			gl.drawArrays(gl.POINTS,0,this.renderCallVertices );
			break;	
			
		case this.LINE: 
			gl.drawArrays(gl.LINES,0,this.renderCallVertices);
			//gl.drawArrays(gl.TRIANGLES,0,this.renderCallVertices);
			break;
			
		case this.POLYGON: 
			gl.drawArrays(gl.TRIANGLES ,0,this.renderCallVertices);
	 //		gl.drawArrays(gl.TRIANGLE ,0,this.renderCallVertices);
	 
			break;	
			
		case this.QUAD:
			gl.drawArrays(gl.TRIANGLES,0,this.renderCallVertices);
			break;
			
		case this.QUAD_UNFILLED: 
			gl.drawArrays(gl.LINE_LOOP,0,this.renderCallVertices);
			break;				
	}
 
	this.renderCallVertices = 0;
	this.renderCallTextures.length = 0;
}


jsaf_graphics2d.prototype.cls = function ()
{
	var rgba = this.cls_rgba;

	this.gl.clearColor(rgba[0],rgba[1],rgba[2],rgba[3]);

	this.gl.clear(this.gl.COLOR_BUFFER_BIT);
}


jsaf_graphics2d.prototype.pushPositionData = function (type, v )
{ 
	this.renderBuffer.yflip[0]		  =   this.graphics.yflip; 	

	// SET ORIGIN
	v[0]+= this.rendersettings.origin[0];
	v[1]+= this.rendersettings.origin[1];
 
	if( type != this.POINT )
	{		
		// SET SCALE
		v[2]*= this.rendersettings.scale[0];
		v[3]*= this.rendersettings.scale[1];

		v[2]=v[2];
		v[3]=v[3];
	}

	switch (type)
	{		
		case this.QUAD: 
	 
			v = [ v[0],v[1]
			    , v[0]+v[2], v[1]
			    , v[0]+v[2], v[1]+v[3] 
			   
			    , v[0]+v[2], v[1]+v[3]
			    , v[0], v[1]+v[3]	
			    , v[0],v[1] ];						   
		   		
		break;
		
		case this.QUAD_UNFILLED: // DOESN'T WORK (ATM!)
			v = [ v[0],v[1]
			    , v[0]+v[2], v[1]
			    , v[0]+v[2], v[1]+v[3] 
			   
			    , v[0]+v[2], v[1]+v[3]
			    , v[0], v[1]+v[3]	
			    , v[0],v[1] ];		
		break;
	}

	var r = this.rendersettings.rotation;
	
	var handle = this.handleAttribWorker;
 
	var vertices = v.length / 2;

	if (this.rendersettings.automidhandle == true)
	{ 
					
		if(vertices == 2)
			handle = [ (v[2  ]>>1) + (v[ 0]>>1) 
					 , (v[3  ]>>1) + (v[ 1]>>1)];

		if(vertices == 6)
			handle = [ (v[6  ]>>1) + (v[ 0]>>1) 
					 , (v[7  ]>>1) + (v[ 1]>>1)];
	
	}
	else
	{
		 handle = [this.rendersettings.handle[0] + v[0]
				  ,this.rendersettings.handle[1] + v[1]];
	}
	
	var buffoffSze1 = this.renderCallVertices;
	var buffoffSze2 = this.renderCallVertices << 1;
	var vi2;
 
	for (var vertex = 0; vertex< vertices; vertex++)
	{	
		vi2 = vertex<<1;

		this.renderBuffer.position[buffoffSze2+ vi2   ]=v[vi2   ];
		this.renderBuffer.position[buffoffSze2+ vi2+1 ]=v[vi2 +1];		

		this.renderBuffer.handle[buffoffSze2+ vi2	]=handle[0];
		this.renderBuffer.handle[buffoffSze2+ vi2+1 ]=handle[1];	
		
 		this.renderBuffer.rotation[buffoffSze1 + vertex]=r;
	}
	
	return vertices;	 
}


jsaf_graphics2d.prototype.pushColorData = function (vertices)
{
	var buffoffSze4 = this.renderCallVertices << 2;
	var vi4;
 	
	if ( this.rendersettings.vertexColor.length == 4)
	{
		for (var vertex = 0; vertex < vertices ; vertex++)
		{	
			vi4 = vertex<<2;
		
			this.renderBuffer.color[buffoffSze4 + vi4  ] = this.rendersettings.vertexColor[0];
			this.renderBuffer.color[buffoffSze4 + vi4+1] = this.rendersettings.vertexColor[1];
			this.renderBuffer.color[buffoffSze4 + vi4+2] = this.rendersettings.vertexColor[2];
			this.renderBuffer.color[buffoffSze4 + vi4+3] = this.rendersettings.vertexColor[3];		
		}
	} 
	else
	{	 
		var cindizes = this.rendersettings.vertexColor.length ; // colorIndizies
		var vciOffset = 0; // vertexColorIndex
 
		for (var vertex = 0; vertex < vertices  ; vertex++)
		{	
			vi4 = vertex<<2;
			
			vciOffset = vi4  % cindizes;
 
			this.renderBuffer.color[buffoffSze4 + vi4  ] = this.rendersettings.vertexColor[vciOffset  ];
			this.renderBuffer.color[buffoffSze4 + vi4+1] = this.rendersettings.vertexColor[vciOffset+1];

			this.renderBuffer.color[buffoffSze4 + vi4+2] = this.rendersettings.vertexColor[vciOffset+2];
			this.renderBuffer.color[buffoffSze4 + vi4+3] = this.rendersettings.vertexColor[vciOffset+3];		
		}
	}
}

jsaf_graphics2d.prototype.pushTextureData = function ( texture, frame , vertices)
{
	var textureid = -1;
	var texid	= -1;
 
	for (var tex = 0; tex <=  this.renderCallTextures.length;tex++)
	{
		if ( this.renderCallTextures[tex]==texture.glTexture )
		{		
			texid = tex;
		}
	}
	
	if ( texid == -1 ) 
	{
		this.renderCallTextures.push( texture.glTexture );
		texid = this.renderCallTextures.length-1;		
	}
	
	var texuv = [0,0,1,1];
 
	// if frame == 0 then render anim image or image atlas as complete image
	if ( texture.frames > 1 && frame > 0 )
	{	 			
		frame = Math.round(frame)%texture.frames;
 
		texuv = texture.texuv[frame];
	}
	
	this.textureAttribWorker =  [  texuv[0]	,texuv[1]
								 , texuv[2] ,texuv[1]
								 , texuv[2] ,texuv[3]
								 , texuv[2] ,texuv[3]
								 , texuv[0] ,texuv[3]
								 , texuv[0] ,texuv[1]]

	var buffoffSze1 = this.renderCallVertices;
	var buffoffSze2 = this.renderCallVertices << 1;
	var vi2;
	
	for (var vertex = 0; vertex< vertices; vertex++)
	{
		vi2 = vertex<<1;
		
		this.renderBuffer.texuv[buffoffSze2+ vi2	]=this.textureAttribWorker[vi2   ];
		this.renderBuffer.texuv[buffoffSze2+ vi2+1	]=this.textureAttribWorker[vi2 +1];	
		
		this.renderBuffer.textureid[buffoffSze1 + vertex]=texid;
	}

}
