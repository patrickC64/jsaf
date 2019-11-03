 
jsaf_gui2d_widget.prototype.eventName = [
	,'_'
	,'ON_INIT'

	,'ON_ACTIVATE'
	,'ON_DEACTIVATE'

	,'ON_SHOW'
	,'ON_HIDE'

	,'ON_UPDATE_RENDERCOORDS'
	
	,'ON_UPDATE_BEGIN'
	,'ON_UPDATE_END'
	,'ON_UPDATE'

	,'ON_RENDER_BEGIN'
	,'ON_RENDER_END'
	,'ON_RENDER'

	,'ON_ADD_CHILD'
	,'ON_REMOVE_CHILD'
	,'ON_PARENT_CHANGED'
	
	,'ON_UPDATE_CHILDS_BEGIN'
	,'ON_UPDATE_CHILDS_END'
	,'ON_RENDER_CHILDS_BEGIN'
	,'ON_RENDER_CHILDS_END'
	
	,'ON_CHILD_TO_FRONT'
	,'ON_CHILD_GET_FOCUS'
	,'ON_CHILD_LOST_FOCUS'
	,'ON_CHILD_UPDATE_RENDERCOORDS'

	
	,'ON_FOCUS'
	,'ON_FOCUS_LOST'

	,'ON_MOUSE_HOVER'
	,'ON_MOUSE_LEAVE'
	
	,'ON_MOUSE_CLICK'
	,'ON_MOUSE_DOWN'
	,'ON_MOUSE_UP'

	,'ON_KEY_PRESS'
	,'ON_KEY_DOWN'
	,'ON_KEY_UP'
	
	,'ON_VALUE_CHANGED'
	,'ON_SCROLLBAR_CHANGED'
			
]

for (var eventid = 0; eventid< jsaf_gui2d.prototype.eventName.length; eventid++)
{
	jsaf_gui2d_widget.prototype[jsaf_gui2d.prototype.eventName[eventid]] = eventid;		
}
