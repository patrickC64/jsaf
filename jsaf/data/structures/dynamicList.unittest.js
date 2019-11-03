
dynamicList.prototype.unitTest = function ()
{
	var mlist = new dynamicList();
	
	var c=0;
	
	for (c=1; c<11;c++)
	{
		mlist.addData(c);
	}
	mlist.show('CREATE LIST:');

	mlist.forEach (function (node)
	{
		if ( node.data == 5)
		{	
			mlist.removeNode(node);
		}
	})
	mlist.show('REMOVE 5:');

	
	mlist.forEach (function (node)
	{
		if ( node.data == 10)
		{	
			mlist.removeNode(node);
		}
	})
	mlist.show('REMOVE HEAD:');
	

	mlist.forEach (function (node)
	{	if ( node.data == 4)
		{	
			mlist.removeNode(node);
		}
		if ( node.data == 2)
		{	
			mlist.removeNode(node);
		}
		if ( node.data == 3)
		{	
			mlist.removeNode(node);
		}
		if ( node.data == 8)
		{	
			mlist.removeNode(node);
		}
	})
	mlist.show('REMOVE 4,2,3,8:');
}