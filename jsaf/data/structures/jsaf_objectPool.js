function jsaf_objectPool( createObjectCallback, context )
{
	this.objectPool = new dynamicList();
	this.objectList = new dynamicList();
	
	this.context = context;
	
	this.createObjectCallback = createObjectCallback;

	this.maxObjects = 1000;
	this.objects = 0;
	
}

jsaf_objectPool.prototype.getObject = function ()
{ 
	if ( this.objectPool.nodes == 0 && this.objects < this.maxObjects-1 )
	{ 
		var poolObject = {};
		
		poolObject._object	= this.createObjectCallback.call(this.context);
		poolObject._binding = this.objectList.addData ( poolObject );
		poolObject._list	= this.objectList;

		poolObject._object.back2pool = function(poolObject) {
 
			this.back2pool(poolObject);
			
		}.bind(this,poolObject);
		
		this.objects++;	
		
		return poolObject._object;
	}

	if ( this.objectPool.nodes > 1 )
	{		
		var	poolObject = this.objectPool.root.data;

		// is in Pool! (remove from pool)
		poolObject._list.removeNode (poolObject._binding);
		
		// add to objectlist
		poolObject._list = this.objectList;		
		
		// insert into 
		this.objectList.insertNode( poolObject._binding );
  				
		return poolObject._object;				
	}	
	
	return null;
}


jsaf_objectPool.prototype.back2pool = function (poolObject)
{ 
	poolObject._list.removeNode (poolObject._binding);
	poolObject._list = this.objectPool;
	poolObject._list.insertNode (poolObject._binding);
}

jsaf_objectPool.prototype.forEach = function (callback)
{	
	this.objectList.forEachData( function ( poolObject ) 
	{		
		callback(poolObject._object);

	}.bind(this));	
}
