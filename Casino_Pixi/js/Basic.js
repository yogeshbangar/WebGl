var sx = 0, sy = 0, sz = 0, rx = 0, ry = 0, rz = 0;

// this is use to set postion of game objects only for testing 

function dealWithKeyboard(e) {
	var vs = 10, rs = 1;
	switch (e.keyCode) {
		case 37:
			sx = sx - vs;
			break;
		case 38:
			sz = sz + vs;
			break;
		case 39:
			sx = sx + vs;
			break;
		case 40:
			sz = sz - vs;
			break;
		case 65:
			sy = sy + vs;
			break;
		case 66: case 90:
			sy = sy - vs;
			break;
		case 49:
			rx = rx - rs;
			break;
		case 50:
			rx = rx + rs;
			break;
		case 52:
			ry = ry + rs;
			break;
		case 53:
			ry = ry - rs;
			break;
		case 55:
			rz = rz + rs;
			break;
		case 56:
			rz = rz - rs;
			break;
		case 57:
			sx = sy = sz = 0;
			break;
		case 54:
			rx = ry = rz = 0;
			break;
	}
	console.log("sx = " + sx + ", sy = " + sy + ", sz =" + sz);
	console.log(e.keyCode + " rx = " + rx + ", ry = " + ry + ", rz =" + rz);

}
