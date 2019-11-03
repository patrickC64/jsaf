function init_graphics()
{
	myApp.global.graphics	= new jsaf_graphics		( 'rendercanvas', 1024,768 )

	myApp.global.graphics2d	= new jsaf_graphics2d	( myApp.global.graphics )
		
	myApp.global.graphics2d.setClsColor (0,0,0,0);
}