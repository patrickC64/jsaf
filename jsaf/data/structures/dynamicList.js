/* 	object	:DYNAMIC LIST V1.1
	date	:04.09.2018
	author	:Patrick Freßdorf
	license	:
	
	functionality:
	provides a simple doubly linked list
	
	// ADD A NODE
	+ var node =list.addData ( data )
	// REMOVE A NODE
	+ var node =list.addRemoveNode ( node )
	// FIND A NODE
	+ var node =list.getNodeById ( id )

	// SET A NODE ID (we should make id private and provide  SETTER & GETTER or we create an ID in addNode ?! hmmm
	+ node.id = yourID
		||
	+ list.addData (data).id = yourID

*/

 
function dynamicList()
{
	this.root = null;
	this.head = null;
	this.nodes = 0;
	this.iterator = null;
	
}

dynamicList.prototype.show = function(prefix)
{
	var content = '';
	
	this.forEach (function(node)
	{
		content+=" | "+node.data;
	});
	
	console.log(prefix+content);
} 

dynamicList.prototype.addData=function(data)
{
	var	newNode = { last: null, next:null, data:data, id:null };

	return this.insertNode ( newNode , true ) ;

}


dynamicList.prototype.insertNode = function(node , dataNode)
{

	if(this.root == null)
	{			
		this.root = node;
	}
	else
	{
		if ( this.head != null )
		{	
			
			var thead = this.head;
		
			this.head = node;
			
			thead.next = node;
			
			this.head.last = thead;
			
		}
		else 
		{

			node.last = this.root;
			
			this.head = node;

			this.root.next = node;	
		
		}
	
	}

	this.nodes++;
 
	return node;	
}


dynamicList.prototype.removeNode=function(node)
{
	
	if ( node == this.iterator )
	{	
		this.iterator = node.next;
	}
	
	if ( node == this.root )
	{	
		this.root = node.next;
		
		if ( node.next == this.head)
			this.head = null;
		
	} 
	else if ( node == this.head )
	{	
		if ( node.last )
		{
			this.head = node.last;
			this.head.next = null;
		}
		else
		{
			this.root = this.head;
			this.head = null;		
		}
	} 
	else if( node.next && node.last )
	{	
		node.last.next = node.next;					
		node.next.last = node.last;
	} 

	node.last =null;
	node.next =null;

	this.nodes--;
	
	return node;	
}

dynamicList.prototype.getDataById=function(id)
{
	var node =  this.getNodeById(id)
	
	if(node == null)
		return null;
	else
		return node.data;
}

dynamicList.prototype.getNodeById=function(id)
{	
				
	var root2head = this.root;
	var head2root = this.head;
	var search = true;
	
	while( search==true )
	{
		search=false;
		
		if(root2head !=null)
		{
			if (root2head.id == id)
				return root2head;
			
			root2head = root2head.next;
		 
			search = true;		 
		}
		
		if(head2root !=null )
		{
			if( head2root.id == id)
			return head2root;
		
			head2root = head2root.last;
			search = true;	
		}
	}
	
	return null;
}

	
dynamicList.prototype.forEach=function(callBack)
{
	if(this.root==null)return;
		
	this.iterator = this.root;
	
	while(this.iterator!=null)
	{	
		callBack(this.iterator);
		
		if ( this.iterator && this.iterator == this.iterator.next)
		{	console.dir(currentNode);
			alert("SOMETHING IS WRONG!!")
		}
		
		if( this.iterator )
			this.iterator = this.iterator.next;
	}	
}


dynamicList.prototype.forEachData=function(callBack)
{
	if(this.root==null)return;
		
	this.iterator = this.root;
	
	while(this.iterator!=null)
	{	
		callBack(this.iterator.data);
		
		if ( this.iterator && this.iterator == this.iterator.next)
		{	console.dir(currentNode);
			alert("SOMETHING IS WRONG!!")
		}
		
		if( this.iterator )
			this.iterator = this.iterator.next;
	}	
}


dynamicList.prototype.head2Root=function(callBack)
{
	var currentNode = this.head;

	if(currentNode==null)
	{
		currentNode=this.root;
	}
			
	while(currentNode!=null)
	{
		callBack(currentNode);
		
		currentNode = currentNode.last;
	}	
}


dynamicList.prototype.nodeToHead=function(node)
{
	this.removeNode (node);
	this.insertNode (node);
}
