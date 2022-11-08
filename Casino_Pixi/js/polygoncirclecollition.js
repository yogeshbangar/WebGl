var check = 0;
// POLYGON/CIRCLE
function polyCircle(vertices, cx, cy, r) {

  // go through each of the vertices, plus
  // the next vertex in the list
  check = 0;
  var next = 0;
  for (var current = 0; current < vertices.length / 2; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current + 1;
    if (next == vertices.length / 2) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    var vc = [vertices[current * 2], vertices[current * 2 + 1]];    // c for "current"
    var vn = [vertices[next * 2], vertices[next * 2 + 1]];        // n for "next"

    // check for collision between the circle and
    // a line formed between the two vertices
    var collision = lineCircle(vc[0], vc[1], vn[0], vn[1], cx, cy, r);
    if (collision || check > 2) return true;
  }
  //   console.log("~~~~~~~~~~s~"+check);
  // the above algorithm only checks if the circle
  // is touching the edges of the polygon – in most
  // cases this is enough, but you can un-comment the
  // following code to also test if the center of the
  // circle is inside the polygon

  var centerInside = polygonPoint(vertices, cx,cy);
  if (centerInside) return true;

  // otherwise, after all that, return false
  return false;
}


// LINE/CIRCLE
function lineCircle(x1, y1, x2, y2, cx, cy, r) {

  // is either end INSIDE the circle?
  // if so, return true immediately
  var inside1 = pointCircle(x1, y1, cx, cy, r);
  var inside2 = pointCircle(x2, y2, cx, cy, r);
  if (inside1 || inside2) return true;

  // get length of the line
  var distX = x1 - x2;
  var distY = y1 - y2;
  var len = Math.sqrt((distX * distX) + (distY * distY));

  // get dot product of the line and circle
  var dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / Math.pow(len, 2);

  // find the closest point on the line
  var closestX = x1 + (dot * (x2 - x1));
  var closestY = y1 + (dot * (y2 - y1));

  // is this point actually on the line segment?
  // if so keep going, but if not, return false
  var onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
  if (!onSegment) return false;

  // optionally, draw a circle at the closest point
  // on the line
  //fill(255,0,0);
  //noStroke();

  //ellipse(closestX, closestY, 20, 20);
  // console.log("~~~~~~~~~~~",closestX, closestY);
  // get distance to closest point
  distX = closestX - cx;
  distY = closestY - cy;
  var distance = Math.sqrt((distX * distX) + (distY * distY));

  // is the circle on the line?
  if (distance <= r) {
    return true;
  }
  return false;
}


// LINE/POINT
function linePoint(x1, y1, x2, y2, px, py) {

  // get distance from the point to the two ends of the line
  var d1 = dist(px, py, x1, y1);
  var d2 = dist(px, py, x2, y2);

  // get the length of the line
  var lineLen = dist(x1, y1, x2, y2);

  // since floats are so minutely accurate, add
  // a little buffer zone that will give collision
  var buffer = 0.1;    // higher # = less accurate

  // if the two distances are equal to the line's
  // length, the point is on the line!
  // note we use the buffer here to give a range, rather
  // than one #
  if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
    check++;
    // console.log("~~~~~~~~~~s~");
    return true;
  }
  return false;
}


// POINT/CIRCLE
function pointCircle(px, py, cx, cy, r) {

  // get distance between the point and circle's center
  // using the Pythagorean Theorem
  var distX = px - cx;
  var distY = py - cy;
  var distance = Math.sqrt((distX * distX) + (distY * distY));

  // if the distance is less than the circle's 
  // radius the point is inside!
  if (distance <= r) {
    return true;
  }
  return false;
}


// POLYGON/POINT
// only needed if you're going to check if the circle
// is INSIDE the polygon
function polygonPoint(vertices, px, py) {
  var collision = false;

  // go through each of the vertices, plus the next
  // vertex in the list
  var next = 0;
  for (var current = 0; current < vertices.length / 2; current++) {

    // get next vertex in list
    // if we've hit the end, wrap around to 0
    next = current + 1;
    if (next == vertices.length / 2) next = 0;

    // get the PVectors at our current position
    // this makes our if statement a little cleaner
    vc = [vertices[current * 2], vertices[current * 2 + 1]];    // c for "current"
    vn = [vertices[next * 2], vertices[next * 2 + 1]];;       // n for "next"

    // compare position, flip 'collision' variable
    // back and forth
    if (((vc[1] > py && vn[1] < py) || (vc[1] < py && vn[1] > py)) &&
      (px < (vn[0] - vc[0]) * (py - vc[1]) / (vn[1] - vc[1]) + vc[0])) {
      collision = !collision;
    }
  }
  return collision;
}
function CircRectCollision(CRX, CRY, CRDX, CRDY, centerX, centerY, radius) {

  CRX += CRDX * .5;
  CRY += CRDY * .5;
  CRDX *= .5;
  CRDY *= .5;


  if ((Math.abs(centerX - CRX) <= (CRDX + radius)) && (Math.abs(centerY - CRY) <= (CRDY + radius))) {
    //console.log(CRX, CRY, CRDX, CRDY,centerX,centerY,radius);
    return true;
  } return false;
}
function cir_cir_collision(p1x, p1y, r1, p2x, p2y, r2) {
  var a;
  var x;
  var y;

  a = r1 + r2;
  x = p1x - p2x;
  y = p1y - p2y;

  if (a > Math.sqrt((x * x) + (y * y))) {
    return true;
  } else {
    return false;
  }
}
function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

// getting center point of polygon

var center = function (arr) {
  var minX, maxX, minY, maxY;
  for (var i = 0; i < arr.length; i++) {
    minX = (arr[i][0] < minX || minX == null) ? arr[i][0] : minX;
    maxX = (arr[i][0] > maxX || maxX == null) ? arr[i][0] : maxX;
    minY = (arr[i][1] < minY || minY == null) ? arr[i][1] : minY;
    maxY = (arr[i][1] > maxY || maxY == null) ? arr[i][1] : maxY;
  }
  return [(minX + maxX) / 2, (minY + maxY) / 2];
}

// getting center point of polygon
var polycenter = function (arr) {
  var minX, maxX, minY, maxY;
  for (var i = 0; i < arr.length; i += 2) {
    minX = (arr[i] < minX || minX == null) ? arr[i] : minX;
    maxX = (arr[i] > maxX || maxX == null) ? arr[i] : maxX;
    minY = (arr[i + 1] < minY || minY == null) ? arr[i + 1] : minY;
    maxY = (arr[i + 1] > maxY || maxY == null) ? arr[i + 1] : maxY;
  }
  return [(minX + maxX) / 2, (minY + maxY) / 2];
}