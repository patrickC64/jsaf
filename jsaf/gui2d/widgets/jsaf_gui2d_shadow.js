jsaf_gui2d_shadow.prototype = Object.create ( jsaf_gui2d_widget.prototype );

function jsaf_gui2d_shadow( width )
{
	jsaf_gui2d_widget.call(this,'shadow',0,0,0,0 );
 	
	this.width = width;
	
	this.addEventHandler (	this.ON_INIT, this.onInit );
}

jsaf_gui2d_shadow.prototype.onInit = function ()
{	 
 	 
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
	});

	this.ignoreParentViewport = true;	
//	this.ignoreMouseCheck = true;
	this.ignoreMouseOver = true;

	this.parent.addEventHandler ( this.ON_UPDATE_RENDERCOORDS, this.onUpdateRenderCoords, this );

	this.updateRenderCoords();
}


jsaf_gui2d_shadow.prototype.onUpdateRenderCoords = function ()
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