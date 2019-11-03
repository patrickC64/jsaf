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
}
 
dynamicList.prototype.addData=function(data)
{
	const	newNode = { last:this.head, next:null, data:data, id:null };

	if(this.root == null)
		this.root = newNode;

	if(this.head == null)
	{
		this.head = newNode;
	}
	else 
	{
		this.head.next = newNode;
		
		this.head = newNode;
	}
	
	if(this.root == null)
		this.root = newNode;

	return newNode;
	
}


dynamicList.prototype.insertNode = function(node)
{
	node.next = null
	node.last = null
	

	if(this.root == null)
		this.root = node;

	if(this.head == null)
	{
		this.head = node;
	}
	else 
	{
		this.head.next = node;
		
		this.head = node;
	}
	
	if(this.root == null)
		this.root = node;

	//console.log('in')
	return node;
	
}


dynamicList.prototype.removeNode=function(node)
{
	if(node == this.root)
	{
		this.root = node.next;
 
		if(node.next==null)
			return;
	}
	
	if(node == this.head)
	{	
		this.head = node.last;

		if(this.head != null)
			this.head.next = null;
	}
	
	if(node.next != null && node.last !=null)
	{
		node.last.next = node.next;
	
		node.next.last = node.last;
		
	}
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
		
	var currentNode = this.root;
	
	while(currentNode!=null)
	{	
		callBack(currentNode);
		
		currentNode = currentNode.next;
	}	
}


dynamicList.prototype.forEachData=function(callBack)
{
	if(this.root==null)return;
		
	var currentNode = this.root;
	
	while(currentNode!=null)
	{
		callBack(currentNode.data);
		
		currentNode = currentNode.next;
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
