jsaf_gui2d_widget.prototype.callEventHandler = function (eventId, eventArgs)
{
	if (this.eventHandlerCallbacks == null)
		return;
	
	var eventNode = this.eventHandlerCallbacks.getNodeById ( eventId ) 

	if (eventNode)
	{			
		eventNode.data.forEach ( function (eventCallback)
		{ 		
			var callerType = eventCallback.widgetContext.type;
			
			if ( !eventCallback.callback )
				jsaf.error (this.gui.eventName[eventId] +' for widget '+ callerType +" not implemented!");
			
			//if(callerType=='desktopBarImageButton')
		  	//console.log(this.eventName[eventId]  +' for widget '+ callerType+" was called!");
			
			eventCallback.callback.call(eventCallback.widgetContext, eventArgs);	
			
		}.bind( this ) );
	}
}

jsaf_gui2d_widget.prototype.addEventHandler = function (eventId, handlerCallback, widgetContext )
{	

	if (this.eventHandlerCallbacks == null)
		this.eventHandlerCallbacks = new dynamicList();

	if ( widgetContext == null )
		widgetContext = this;
	
	var eventNode = this.eventHandlerCallbacks.getNodeById (eventId);
	
	if ( eventNode == null )
	{
		eventNode = this.eventHandlerCallbacks.addData ([]);
		eventNode.id = eventId;
	}

	return eventNode.data.push ( { 'name': this.eventName[eventId], 'callback': handlerCallback, 'widgetContext': widgetContext } );	
}

jsaf_gui2d_widget.prototype.removeEventHandler = function ( eventHandler )
{	

	if (this.eventHandlerCallbacks == null)
		this.eventHandlerCallbacks = new dynamicList();

	if ( widgetContext == null )
		widgetContext = this;
	
	var eventNode = this.eventHandlerCallbacks.getNodeById (eventId);
	
	if ( eventNode == null )
	{
		eventNode = this.eventHandlerCallbacks.addData ([]);
		eventNode.id = eventId;
	}

    eventNode.data.push ( { 'name': this.eventName[eventId], 'callback': handlerCallback, 'widgetContext': widgetContext } );	
}


