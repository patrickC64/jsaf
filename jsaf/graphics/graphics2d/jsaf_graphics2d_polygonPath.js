/*
	@COPY&PASTE:
	inspired by 
	https://jsbin.com/gecakub/edit?html,js,output  

	found @ StackOverflow

	https://stackoverflow.com/questions/50554803/triangulate-path-data-from-opentype-js-using-earcut

	Many thanks for the inspiration and pieces of code!
*/

//jsaf_graphics2d_polygon = function (){};

jsaf_graphics2d_polygon.prototype.EPSILON = 1e-6;

function jsaf_graphics2d_polygon ()
{
	// this is for inside checks - doesn't have to be particularly
	// small because glyphs have finite resolution
	this.EPSILON = 1e-6;
	
	this.vertices 	= [];
	this.area		= 0.0;
	this.children	= [];
	
}


jsaf_graphics2d_polygon.prototype.inside = function ( p )
{
	var count = 0;
	var cur = this.vertices[this.vertices.length - 1];

	this.vertices.forEach( function (next) 
	{	
		const p0 = (cur.y < next.y ? cur : next);
		const p1 = (cur.y < next.y ? next : cur);
 
		if (p0.y < p.y +this.EPSILON && p1.y > p.y +this.EPSILON) 
		{ 
			if ((p1.x - p0.x) * (p.y - p0.y) > (p.x - p0.x) * (p1.y - p0.y)) 
			{  
				count += 1;
			}
		}
		
		cur = next;
	}.bind(this));

	return (count % 2) !== 0;
}

 
jsaf_graphics2d_polygonPath  = function ()
{		
	this.MAX_BEZIER_STEPS = 10;
	this.BEZIER_STEP_SIZE = 2.0;

	this.polygons	= [];	
	this.polygon 	= null;
 
	this.outlines  = [];
	this.triangles = null;

}


jsaf_graphics2d_polygonPath.prototype.beginPath = function ()
{
	this.polygon = new jsaf_graphics2d_polygon();
}


jsaf_graphics2d_polygonPath.prototype.moveTo = function ( p ) 
{
    this.polygon.vertices.push(p);
}


jsaf_graphics2d_polygonPath.prototype.lineTo = function ( p ) 
{
    this.polygon.vertices.push(p);
}



jsaf_graphics2d_polygonPath.prototype.quadraticCurveTo = function ( p, p1 ) 
{
    const p0 = this.polygon.vertices[this.polygon.vertices.length - 1];
    const dist = jsaf_math2d.distance(p0, p1) + jsaf_math2d.distance(p1, p);
 
	const steps = Math.max(2, Math.min( this.MAX_BEZIER_STEPS, dist / this.BEZIER_STEP_SIZE));
 
    for (let i = 1; i <= steps; ++i) 
	{
		const t = i / steps;
		var c = jsaf_math2d.lerp(jsaf_math2d.lerp(p0, p1, t), jsaf_math2d.lerp(p1, p, t), t);
 
		this.polygon.vertices.push(c);
    }
 
}


jsaf_graphics2d_polygonPath.prototype.bezierCurveTo = function ( p, p1, p2 ) 
{	
	//p2 = p2 ? p2 : p;
	
	const p0 = this.polygon.vertices[this.polygon.vertices.length - 1];	
    const dist = jsaf_math2d.distance(p0, p1) + jsaf_math2d.distance(p1, p2) + jsaf_math2d.distance(p2, p);
	
    const steps = Math.max(2, Math.min(this.MAX_BEZIER_STEPS, dist / this.BEZIER_STEP_SIZE));
    for (let i = 1; i <= steps; ++i) 
	{
		const t = i / steps;
		const a = jsaf_math2d.lerp(jsaf_math2d.lerp(p0, p1, t), jsaf_math2d.lerp(p1, p2, t), t);
		const b = jsaf_math2d.lerp(jsaf_math2d.lerp(p1, p2, t), jsaf_math2d.lerp(p2, p, t), t);
		this.polygon.vertices.push(jsaf_math2d.lerp(a, b, t));
    }
	
}


jsaf_graphics2d_polygonPath.prototype.closePath = function () 
{
	if ( this.polygon )
	{
		let cur = this.polygon.vertices[this.polygon.vertices.length - 1];
		
		this.polygon.vertices.forEach( function ( next ) 
		{
			this.polygon.area += 0.5 * jsaf_math2d.cross(cur, next);
			cur = next;
		 
		}.bind( this ) );
			 
		this.polygons.push ( this.polygon );	
		
		this.polygon = null;
	} 
	else 
	{
		this.createOutlines ();
		this.createTriangles();
	}


}

jsaf_graphics2d_polygonPath.prototype.createOutlines = function () 
{
	var polygon;
	
	var first = null;
	var last = null;
	
	var lines = null;

	for (let i=0; i<this.polygons.length;i++) 
	{
		lines = [];
	
		first = null;
		last = null;
			
		polygon = this.polygons[i];
		
		polygon.vertices.forEach( function ( vertex ) 
		{	
			lines.push ( vertex );
			 
			if ( first == null ) 
				first = vertex;
		
			last = vertex;	
			
		}.bind( this ) );

		if ( ! (first.x == last.x && first.y == last.y) )
		{				
			lines.push ( first );	
			lines.push ( last  );			
		}
	
		this.outlines.push ( lines );
	}	

}

jsaf_graphics2d_polygonPath.prototype.createTriangles = function () 
{	 
	if ( !this.outlines || this.triangles )
		return;
	
	var polys = this.polygons;
 
    // sort contours by descending area
    // polys.sort((a, b) => Math.abs(b.area) - Math.abs(a.area));
    polys.sort( function(a, b){ return Math.abs(b.area) - Math.abs(a.area); } );

    // classify contours to find holes and their 'parents'
    const root = [];
    for (let i = 0; i < polys.length; ++i) 
	{  	 	 
      let parent = null;
      for (let j = i - 1; j >= 0; --j) {
        // a contour is a hole if it is inside its parent and has different winding
        if (polys[j].inside(polys[i].vertices[0]) && polys[i].area * polys[j].area < 0) {
          parent = polys[j];
          break;
        }
      }
      if (parent) {
        parent.children.push(polys[i]);
      } else {	  
        root.push(polys[i]);
      }
    }

	this.triangles = [];
	
//	const totalPoints = polys.reduce( (sum, p ) => sum + p.vertices.length, 0);
	const totalPoints = polys.reduce( function(sum, p ) { return sum + p.vertices.length } , 0);
    const vertexData = new Float32Array(totalPoints * 2);
    let vertexCount = 0;
    const indices = [];

    function process(poly) 
	{
		// construct input for earcut
		const coords = [];
		const holes = [];

		poly.vertices.forEach( function ( c )
		{ 
			coords.push(c.x, c.y); 
		});
		
		poly.children.forEach( function ( child )
		{
			// children's children are new, separate shapes
			child.children.forEach(process);
			holes.push(coords.length / 2);
//			child.vertices.forEach(({x, y}) => coords.push(x, y));
			child.vertices.forEach(function(c){coords.push(c.x, c.y)});
		});
      
		// add vertex data
		vertexData.set(coords, vertexCount * 2);
		
		// add index data
		earcut(coords, holes).forEach(function (i) 
		{ 
			indices.push(i + vertexCount);
		} );
	  
		vertexCount += coords.length / 2;
    }
	
    root.forEach(process);

	this.triangles = [];
 
 
	indices.forEach ( function (i) 
	{
 
		this.triangles.push ( (  vertexData[i*2  ]  )  );
		this.triangles.push ( (  vertexData[i*2+1]  )  );
 
	}.bind(this) );
	
}

