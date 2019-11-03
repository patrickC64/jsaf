jsaf_graphics3d.prototype.update = function ()
{
	this.updateSceneGraph();
	
	this.cameras.forEach ( function ( cam )
	{
		cam.update();
	}); 
}


jsaf_graphics3d.prototype.renderCameras = function ()
{
	this.cameras.forEach ( function ( cam )
	{
		cam.render();
	}); 
}



jsaf_graphics3d.prototype.render = function ( )
{
	if ( this.renderCallVertices == 0)
		return;
	
	this.renderCameras();
}

jsaf_graphics3d.prototype.updateSceneGraph = function ()
{

}

jsaf_graphics3d.prototype.pushRenderData = function ( type, position, texture, texuv )
{
	
	if ( this.currentPrimitive != null && type != this.currentPrimitive 
	||   this.renderTextured != ( texture != null) )
	{		
		this.currentShader.use();
		this.render();
		
		if ( this.renderTextured = ( texture != null) )
		{	
			this.currentShader = this.textured2dshader;
		} else
			this.currentShader = this.solid2dshader;
				
		this.currentShader.use()
	}
	
	this.currentPrimitive = type;	
 
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


jsaf_graphics3d.prototype.renderBufferData = function (  )
{ 	
	if (!this.currentShader || this.renderCallVertices == 0)
		return;
	
 	var gl = this.graphics.gl;
	
	for (var tex = 0;tex <= this.renderCallTextures.length; tex++)
	{
		gl.activeTexture(gl.TEXTURE0 + tex);
		 
		gl.bindTexture(gl.TEXTURE_2D, this.renderCallTextures[tex]);	
		
		this.renderBuffer.textures[tex]=tex;
	}
	
	this.currentShader.bindBuffersData(this.renderCallVertices);
 
	switch ( this.currentPrimitive )
	{
		case this.POINT: 
			gl.drawArrays(gl.POINTS, 0, this.renderCallVertices );
			break;	
			
		case this.LINES: 
			gl.drawArrays(gl.LINES, 0, this.renderCallVertices );
			break;
			
		case this.LINE: 
			gl.drawArrays(gl.LINE, 0, this.renderCallVertices );
			break;
			
		case this.POLYGON:
			gl.drawArrays( gl.TRIANGLES, 0, this.renderCallVertices);
			break;			
	}
 
	this.renderCallVertices=0;
	this.renderCallTextures.length=0;
}


jsaf_graphics3d.prototype.cls = function ()
{
	var rgba = this.cls_rgba;
 
	this.gl.clearColor(rgba[0],rgba[1],rgba[2],rgba[3]);

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER );
}


jsaf_graphics3d.prototype.pushPositionData = function (type, v )
{ 
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
	
	var position = this.vertexAttribWorker;

	switch (type)
	{
		case this.LINE:
			break;
		
		case this.QUAD: 
	 
			position = [ v[0],v[1]
					   , v[0]+v[2], v[1]
					   , v[0]+v[2], v[1]+v[3] 
					   
					   , v[0]+v[2], v[1]+v[3]
					   , v[0], v[1]+v[3]	
					   , v[0],v[1] ];						   
	 
		/*
			position[0] = v[0];
			position[1] = v[1];
			position[2] = v[0]+v[2];
			position[3] = v[1];
			position[4] = v[0]+v[2];
			position[5] = v[1]+v[3];
			
			position[6] = v[0]+v[2];
			position[7] = v[1]+v[3];
			position[8] = v[0];
			position[9] = v[1]+v[3];
			position[10] = v[0];
			position[11] = v[1];
		*/			   		
		break;
		
		case this.QUAD_UNFILLED: // DOESN'T WORK (ATM!)
			position = [ v[0],v[1]
					   , v[0]+v[2], v[1]
					   , v[0]	  , v[1]+v[3] 
					   
					   , v[0] 	  , v[1]+v[3] 
					   , v[0]+v[2], v[1]+v[3]	
					   , v[0]+v[2],v[1] ];
		break;
	}

	var r = this.rendersettings.rotation;
	
	var handle = this.handleAttribWorker;
				 
 
 
	var vertices = position.length/2

	if (this.rendersettings.automidhandle == true)
	{ 
					
		if(vertices == 2)
			handle = [ (position[2  ]>>1) + (position[ 0]>>1) 
					 , (position[3  ]>>1) + (position[ 1]>>1)];

		if(vertices == 6)
			handle = [ (position[6  ]>>1) + (position[ 0]>>1) 
					 , (position[7  ]>>1) + (position[ 1]>>1)];
				 
	}
	else
	{
		 handle = [this.rendersettings.handle[0] + position[0]
				  ,this.rendersettings.handle[1] + position[1]];
	}
	
	var buffoffSze1 = this.renderCallVertices;
	var buffoffSze2 = this.renderCallVertices << 1;
	var vi2;
	
	for (var vertex = 0; vertex< vertices; vertex++)
	{	
		vi2 = vertex<<1;

		this.renderBuffer.position[buffoffSze2+ vi2   ]=position[vi2   ];
		this.renderBuffer.position[buffoffSze2+ vi2+1 ]=position[vi2 +1];		

		this.renderBuffer.rotation[buffoffSze1 + vertex]=r;
		
		this.renderBuffer.handle[buffoffSze2+ vi2	]=handle[0];
		this.renderBuffer.handle[buffoffSze2+ vi2+1 ]=handle[1];		

		this.renderBuffer.resolution[buffoffSze2+ vi2	]=this.graphics.width;
		this.renderBuffer.resolution[buffoffSze2+ vi2+1 ]=this.graphics.height;
	}
	
	return vertices;	 
}


jsaf_graphics3d.prototype.pushColorData = function (vertices)
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

jsaf_graphics3d.prototype.pushTextureData = function ( texture, frame , vertices)
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
	
	var texOffX=0.0;
	var texOffY=0.0;
	var texWidth=1.0;
	var texHeight=1.0;

	if ( texture.frames > 1 )
	{	 			
		frame = Math.round(frame)%texture.frames;
 
		texOffX=texture.texuv[frame][0];
		texOffY=texture.texuv[frame][1];
 
		texWidth=texture.texuv[frame][2];
		texHeight=texture.texuv[frame][3];	
	}
	
	this.textureAttribWorker =  [  texOffX	,texOffY
								 , texWidth ,texOffY
								 , texWidth ,texHeight
								 , texWidth ,texHeight
								 , texOffX  ,texHeight
								 , texOffX  ,texOffY]

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
