jsaf_graphics_shaderBuffer.ATTRIBUTE_BUFFER = 0;
jsaf_graphics_shaderBuffer.UNIFORM_BUFFER = 1;

function jsaf_graphics_shaderBuffer (shader, shaderType, bufferType, name, decl )
{	
	this.gl = shader.shaderManager.graphics.gl;
	
	this.shaderType = shaderType;
	this.bufferType = bufferType;
	
	this.name = name;
	this.decl = decl;
	
	// i dont know realy what i mean at this location with size ??? ....
	// ... i think i can be the vertex count ...
	var size = parseInt(decl.match(/\d/g) );	
	if ( isNaN (size) )
		size = 1;
	
	this.size = size;
	
	this.shader = shader;
	this.location = null;

	this.dataBindings = [];
	
	this.offset = 0;
	
	this.buffer = null;	
	this.glBuffer = null;	
}


jsaf_graphics_shaderBuffer.prototype.getName = function ( )
{ 	
	var name = this.name;
	var vdecl = name.indexOf('[');	
	if( vdecl !=-1 )
	{
	 	name = name.substr(0,vdecl);
	}
	return name;
}



jsaf_graphics_shaderBuffer.prototype.setBinding = function (decl)
{
	this.decl = decl;
}


jsaf_graphics_shaderBuffer.prototype.addBinding = function (decl, name, size )
{ 
	var vdecl = name.indexOf('[');	
	if( vdecl !=-1 )
	{
	 	name = name.substr(0,vdecl);
	}
 
	this.dataBindings.push( {'name':name, 'decl':decl, 'size':size, 'offset':this.offset } );

	this.offset+=size;
	
	return this;
}


jsaf_graphics_shaderBuffer.prototype.bindBuffer = function ( buffer )
{
	this.buffer = buffer;
}


jsaf_graphics_shaderBuffer.prototype.flush = function ( buffer )
{
	this.buffer.length = 0;
}


jsaf_graphics_shaderBuffer.prototype.bindLocation = function ()
{
	

	var shader  = this.shader;
	var gl		= shader.shaderManager.graphics.gl;
	var name	= this.name;

 	var vdecl = name.indexOf('[');	
	if( vdecl !=-1 )
	{
	 	name = name.substr(0,vdecl);
	}	
	
	if ( this.shaderType == jsaf_graphics_shader.VERTEX_SHADER )
	{
		if ( this.bufferType == jsaf_graphics_shaderBuffer.ATTRIBUTE_BUFFER )
			this.location = gl.getAttribLocation(shader.program, name );
	
		if ( this.bufferType == jsaf_graphics_shaderBuffer.UNIFORM_BUFFER )
			this.location = gl.getUniformLocation(shader.program, name )	
	}

	else if ( this.shaderType == jsaf_graphics_shader.FRAGMENT_SHADER )
	{

		if ( this.bufferType == jsaf_graphics_shaderBuffer.ATTRIBUTE_BUFFER )
			this.location = gl.getAttribLocation(shader.program, name );
	
		if ( this.bufferType == jsaf_graphics_shaderBuffer.UNIFORM_BUFFER )
			this.location = gl.getUniformLocation(shader.program, name )	
	}

	this.glBuffer = gl.createBuffer();
	  
}


jsaf_graphics_shaderBuffer.prototype.bindBufferData = function (vertices)
{
	var gl = this.gl;
 
	if ( this.bufferType == jsaf_graphics_shaderBuffer.ATTRIBUTE_BUFFER )	
	{
		gl.enableVertexAttribArray(this.location);
		 
	  	gl.bindBuffer(gl.ARRAY_BUFFER, this.glBuffer);	
	
	 	gl.vertexAttribPointer(this.location, this.size , gl.FLOAT, false, 0,0);

 		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.buffer) , gl.STATIC_DRAW);	
	}
	
	
	if ( this.bufferType == jsaf_graphics_shaderBuffer.UNIFORM_BUFFER )
	{
		 switch ( this.decl ) 
		 {
			 case 'vec2':
 
				gl.uniform2fv(this.location, this.buffer );
		
				break;
	
			case 'float':

				gl.uniform1f(this.location, this.buffer[0]  );
		//		gl.uniform1f(this.location, 2.0 );
		
				break;
		
			default:
				gl.uniform1iv(this.location, this.buffer  );		
			 
		 }
	}

}