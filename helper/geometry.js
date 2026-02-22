"use strict";

/**
 * 2D Geometry Utilities.
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(p) { return new Point(this.x + p.x, this.y + p.y); }
    sub(p) { return new Point(this.x - p.x, this.y - p.y); }
    mul(k) { return new Point(this.x * k, this.y * k); }
    div(k) { return new Point(this.x / k, this.y / k); }

    dot(p) { return this.x * p.x + this.y * p.y; }
    cross(p) { return this.x * p.y - this.y * p.x; }
    distSq(p) { return (this.x - p.x) ** 2 + (this.y - p.y) ** 2; }
    dist(p) { return Math.sqrt(this.distSq(p)); }

    normSq() { return this.x * this.x + this.y * this.y; }
    norm() { return Math.sqrt(this.normSq()); }
}

/**
 * Computes the orientation of ordered triplet (p, q, r).
 * 0 -> p, q, r are collinear
 * 1 -> Clockwise
 * 2 -> Counterclockwise
 */
function orientation(p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0;
    return (val > 0) ? 1 : 2;
}

/**
 * Computes the signed area of a polygon.
 * @param {Array<Point>} points 
 * @returns {number} Positive if CCW, Negative if CW. Area is 0.5 * abs(result).
 */
function polygonArea(points) {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        const j = (i + 1) % points.length;
        area += points[i].cross(points[j]);
    }
    return area / 2;
}

/**
 * Computes the Convex Hull using Monotone Chain Algorithm.
 * Returns vertices in Counter-Clockwise (CCW) order.
 * @param {Array<Point>} points 
 * @returns {Array<Point>} Vertices of the convex hull.
 */
function convexHull(points) {
    const n = points.length;
    if (n <= 2) return points;
    
    // Sort by x, then by y
    points.sort((a, b) => a.x - b.x || a.y - b.y);
    
    // Cross product of (o->a, o->b)
    const cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);

    const lower = [];
    for (let i = 0; i < n; i++) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
            lower.pop();
        }
        lower.push(points[i]);
    }

    const upper = [];
    for (let i = n - 1; i >= 0; i--) {
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
            upper.pop();
        }
        upper.push(points[i]);
    }

    // Remove duplicate point (last of lower is same as first of upper)
    lower.pop();
    upper.pop();
    return lower.concat(upper);
}

module.exports = {
    Point,
    orientation,
    polygonArea,
    convexHull
};
