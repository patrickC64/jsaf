
  	var cshemeWindow = gui.addChild ( new jsaf_gui2d_window( 'COLOR SCHEME', 100, 100, 271,18*3 ) )
	
	cshemeWindow.resizeable = false;

	var  initRGBSlider = function (slider)
	{
		slider.setRange(255);
		slider.setValue(255);
		
		slider.addEventHandler ( slider.ON_VALUE_CHANGED, function (v)
		{ 
			var nc = v/255;
			defaultSkin.color[this.name]=nc;
		})	
		
		return slider;
	}
	
	widget = cshemeWindow.addChild ( new jsaf_gui2d_slider( 'horizontal',1,1,270,16) );		
	initRGBSlider(widget).name=0;
	
	widget = cshemeWindow.addChild ( new jsaf_gui2d_slider( 'horizontal',1,18,270,16) );
	initRGBSlider(widget).name=1;

 	widget = cshemeWindow.addChild ( new jsaf_gui2d_slider( 'horizontal',1,35,270,16) );
	initRGBSlider(widget).name=2;