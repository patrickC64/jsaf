jsaf_math2d = function ()
{

}


jsaf_math2d.prototype.distance = function (p1, p2) 
{
	const dx = p1.x - p2.x, dy = p1.y - p2.y;
	return Math.sqrt(dx * dx + dy * dy);
}


jsaf_math2d.prototype.lerp = function (p1, p2, t)
{
	return {x: (1 - t) * p1.x + t * p2.x, y: (1 - t) * p1.y + t * p2.y};
}


jsaf_math2d.prototype.cross = function (p1, p2) 
{
	return p1.x * p2.y - p1.y * p2.x;
}


jsaf_math2d = new jsaf_math2d();