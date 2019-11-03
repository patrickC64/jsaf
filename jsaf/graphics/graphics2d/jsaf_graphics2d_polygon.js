


function distance(p1, p2) {
  const dx = p1.x - p2.x, dy = p1.y - p2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function lerp(p1, p2, t) {
  return {x: (1 - t) * p1.x + t * p2.x, y: (1 - t) * p1.y + t * p2.y};
}

function cross(p1, p2) {
  return p1.x * p2.y - p1.y * p2.x;
}

// bezier discretization
const MAX_BEZIER_STEPS = 10;
const BEZIER_STEP_SIZE = 3.0;
// this is for inside checks - doesn't have to be particularly
// small because glyphs have finite resolution
const EPSILON = 1e-6;

// class for converting path commands into point data
class jsaf_graphics2d_polygon {
	
  points = [];
  children = [];
  area = 0.0;

  moveTo(p) {
    this.points.push(p);
  }

  lineTo(p) {
    this.points.push(p);
  }

  close() {
    let cur = this.points[this.points.length - 1];
    this.points.forEach(next => {
      this.area += 0.5 * cross(cur, next);
      cur = next;
    });
  }

  conicTo(p, p1) {
    const p0 = this.points[this.points.length - 1];
    const dist = distance(p0, p1) + distance(p1, p);
    const steps = Math.max(2, Math.min(MAX_BEZIER_STEPS, dist / BEZIER_STEP_SIZE));
    for (let i = 1; i <= steps; ++i) {
      const t = i / steps;
      this.points.push(lerp(lerp(p0, p1, t), lerp(p1, p, t), t));
    }
  }

  cubicTo(p, p1, p2) {
    const p0 = this.points[this.points.length - 1];
    const dist = distance(p0, p1) + distance(p1, p2) + distance(p2, p);
    const steps = Math.max(2, Math.min(MAX_BEZIER_STEPS, dist / BEZIER_STEP_SIZE));
    for (let i = 1; i <= steps; ++i) {
      const t = i / steps;
      const a = lerp(lerp(p0, p1, t), lerp(p1, p2, t), t);
      const b = lerp(lerp(p1, p2, t), lerp(p2, p, t), t);
      this.points.push(lerp(a, b, t));
    }
  }

  inside(p) {
    let count = 0, cur = this.points[this.points.length - 1];
    this.points.forEach(next => {
      const p0 = (cur.y < next.y ? cur : next);
      const p1 = (cur.y < next.y ? next : cur);
      if (p0.y < p.y + EPSILON && p1.y > p.y + EPSILON) {
        if ((p1.x - p0.x) * (p.y - p0.y) > (p.x - p0.x) * (p1.y - p0.y)) {
          count += 1;
        }
      }
      cur = next;
    });
    return (count % 2) !== 0;
  }
}

