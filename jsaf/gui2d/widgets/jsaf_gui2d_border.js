jsaf_gui2d_border.prototype = Object.create ( jsaf_gui2d_widget.prototype );

function jsaf_gui2d_border( width )
{
	jsaf_gui2d_widget.call(this,'border',0,0,0,0 );
 	
	this.width = width;
	this.shadowOffset = [6,10];
	
	this.addEventHandler (	this.ON_INIT, this.onInit );
	
	this.transformOrigin = null;
	this.transformCoords = null;
}


jsaf_gui2d_border.prototype.onInit = function ()
{	 
	var skin = this.getSkin();

	this.parent.addEventHandler ( this.gui.ON_RENDER_BEGIN, this.renderShadow, this );
	 
	this.ul = this.addChild ( new jsaf_gui2d_control ( 'border_ul' ) );

	this.ur = this.addChild ( new jsaf_gui2d_control ( 'border_ur' ) );
	
	this.dr = this.addChild ( new jsaf_gui2d_control ( 'border_dr' ) );

	this.dl = this.addChild ( new jsaf_gui2d_control ( 'border_dl' ) );
		

	this.u = this.addChild ( new jsaf_gui2d_control ( 'border_u' ) );

	this.d = this.addChild ( new jsaf_gui2d_control ( 'border_d' ) );

	this.l = this.addChild ( new jsaf_gui2d_control ( 'border_l' ) );

	this.r = this.addChild ( new jsaf_gui2d_control ( 'border_r' ) );
	
		
 	this.position[2] = this.parent.position[2];
	this.position[3] = this.parent.position[3];

	var width = this.width;
	var position = [];
	
	position.push( [ -width,-width,width,width ] );
	position.push( [this.position[2],-width,width,width ] );
	position.push( [this.position[2],this.position[3],width,width ] );
	position.push( [-width,this.position[3],width,width ] );

	position.push( [0,-width,this.position[2],width ] );
	position.push( [0,this.position[3],this.position[2],width ] );
	position.push( [-width,0,width,this.position[3] ] );
	position.push( [this.position[2],0,width,this.position[3] ] );
	
	var index=0;	
	this.childs.forEachData ( function (child) {	
		child.ignoreParentViewport = true;
		child.setPositionV(position[index]);
		
		child.addEventHandler ( child.ON_RENDER, function()
		{
			this.getSkin(this.type).drawImageV( this.type, this.getRenderCoords() );			
		});
		
		child.addEventHandler ( child.ON_MOUSE_DOWN, function()
		{	

			if ( this.transformOrigin == null)
			{
				this.transformOrigin = [ this.parent.parent.position[0]
									   , this.parent.parent.position[1]
									   , this.parent.parent.position[2]
									   , this.parent.parent.position[3] ];
				
				this.transformCoords =[0,0,0,0];
			
			} 
			else
			{
				if ( !this.parent.parent.resizeable )
					return;
				
				var transform = [ this.transformOrigin[0] + this.transformCoords[0] 
								, this.transformOrigin[1] + this.transformCoords[1]
								, this.transformOrigin[2] + this.transformCoords[2]
								, this.transformOrigin[3] + this.transformCoords[3] ];
 
				if ( transform[2]<this.parent.parent.dimensionMin[0] && this.transformCoords[0] !=0 )
				{
					transform[0]-=this.parent.parent.dimensionMin[0]-transform[2];
					transform[2]=this.parent.parent.dimensionMin[0];
				}

				if ( transform[3]<this.parent.parent.dimensionMin[1] && this.transformCoords[1] !=0 )
				{
					transform[1]-=this.parent.parent.dimensionMin[1]-transform[3];
					transform[3]=this.parent.parent.dimensionMin[1];
				}
				
				this.parent.parent.setPosition(transform[0],transform[1],transform[2],transform[3]);
			}
			
		},child);
		
		child.addEventHandler ( child.ON_MOUSE_UP, function()
		{
			this.transformOrigin = null;
			this.transformCoords =[0,0,0,0];
			
		},child);
		
	});

 
	this.ignoreParentViewport = true;	
	this.ignoreMouseCheck = true;
 	
	this.ul.addEventHandler ( this.ON_MOUSE_DOWN, function ()
	{
		this.transformCoords[0]= this.gui.widgetMoveDistance[0];
		this.transformCoords[1]= this.gui.widgetMoveDistance[1];
		this.transformCoords[2]=-this.gui.widgetMoveDistance[0];
		this.transformCoords[3]=-this.gui.widgetMoveDistance[1];
	})
	
	this.ur.addEventHandler ( this.ON_MOUSE_DOWN, function ()
	{
		this.transformCoords[1]= this.gui.widgetMoveDistance[1];
		this.transformCoords[2]= this.gui.widgetMoveDistance[0];
		this.transformCoords[3]=-this.gui.widgetMoveDistance[1];
	})
	
	this.dr.addEventHandler (this.ON_MOUSE_DOWN, function ()
	{
		this.transformCoords[2]= this.gui.widgetMoveDistance[0];
		this.transformCoords[3]= this.gui.widgetMoveDistance[1];		
	})

	this.dl.addEventHandler (this.ON_MOUSE_DOWN, function ()
	{
		this.transformCoords[0]= this.gui.widgetMoveDistance[0];
		this.transformCoords[2]= -this.gui.widgetMoveDistance[0];
		
		this.transformCoords[3]= this.gui.widgetMoveDistance[1];
	})

	this.u.addEventHandler (this.ON_MOUSE_DOWN, function ()
	{
		this.transformCoords[1]= this.gui.widgetMoveDistance[1];
		this.transformCoords[3]=-this.gui.widgetMoveDistance[1];
	})

	this.d.addEventHandler (this.ON_MOUSE_DOWN, function ()
	{	
		this.transformCoords[3]=this.gui.widgetMoveDistance[1];	
	})

	this.l.addEventHandler (this.ON_MOUSE_DOWN, function ()
	{	
		this.transformCoords[0]= this.gui.widgetMoveDistance[0];
		this.transformCoords[2]=-this.gui.widgetMoveDistance[0];
	})

	this.r.addEventHandler (this.ON_MOUSE_DOWN, function ()
	{
		this.transformCoords[2]=this.gui.widgetMoveDistance[0];
	})	

	this.parent.addEventHandler ( this.ON_UPDATE_RENDERCOORDS, this.onUpdateRenderCoords, this );

	this.updateRenderCoords();
}


jsaf_gui2d_border.prototype.onUpdateRenderCoords = function ()
{
	this.setDimension( this.parent.getRenderCoords()[2], this.parent.getRenderCoords()[3]);

	var width = this.width;
	
	this.ul.setPosition(-width,-width,width,width);
	
	this.ur.setPosition(this.position[2],-width,width,width);

	this.dr.setPosition(this.position[2],this.position[3],width,width);

	this.dl.setPosition(-width,this.position[3],width,width);


	this.u.setPosition(0,-width,this.position[2],width);

	this.d.setPosition(0,this.position[3],this.position[2],width);

	this.l.setPosition(-width,0,width,this.position[3]);

	this.r.setPosition(this.position[2],0,width,this.position[3]);	
}


jsaf_gui2d_border.prototype.renderShadow = function ()
{
	var skin = this.getSkin();

	var rc;
 	
	this.childs.forEachData ( function (child) {
		rc = child.getRenderCoords();
		rc[0]+=child.parent.shadowOffset[0];
		rc[1]+=child.parent.shadowOffset[1]+4;
		child.getSkin().drawImageV( child.type+":shadow", rc );			
	});
	
	var rc=this.parent.getRenderCoords();
  
	rc[0]+=this.shadowOffset[0];
	rc[1]+=this.shadowOffset[1]+4;
	
	skin = this.getSkin()
	
	skin.drawImageV ('border:shadow', rc);	
}