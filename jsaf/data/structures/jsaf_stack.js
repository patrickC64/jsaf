jsaf_stack = function( size )
{
	this.stack = new Array(size);
	this.count = 0;
}

jsaf_stack.prototype.push = function (data)
{
	this.stack.push(data);
}