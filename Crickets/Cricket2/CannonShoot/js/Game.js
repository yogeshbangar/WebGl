const CONT_64 = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAABACAMAAADCg1mMAAAC/VBMVEUAAABJVp85X6IgWbBwWow6dcBBYJkgWrMgVqR6ZIQhWbU4WJ+TXmxKc9U+eMBSXH9eaNmEU9WhSeQyeszy8vIxe84xes0+eMDz8vIhWbkhWbggWrXz8/IzeswfWKrx8fEweMv09PQyes0gWrYfV6r29fQtdsogWLX08/Ty8fQec8ceV6kiXLn08/Uxe80wesv49/Xr7vQpcsgye84xecwcdMsfYr6Wvew1es0reMrk7Pzp8/9hkc8PcMUAb8Xc4OnS2ONZis3U3/PK0+QQdMo9ecdJeb359/fz8vT29/itv+bU2OJRhM4jdstGfMF1n9V6m88uec4wes32+P7i6vuOq9IRcMlEZKDq9v/29vXm6vC0w90hds4mdstyksQAa8QhXrHW3ed0lM/c5/bP0+V6oM8jdMgmc8IAO6ft7/OFpNcpdssXdMordMkgWLTf4uspcsoAaMYAbsCYvuyvvdwuecwZcr/t9P7e4enP1edGdNMteMseXrEfWKz1+PrB0uywvdyVsts6fcstcccAWrQZW7HN1uh6n9hymdNtks4ldsoncMYAZMQmbsIhZL8AU7BGZqH5+PqxxeS5x+C9yt5fispojschX7MhXrBPbKe/zOIscMYcYr4GYL0eVqnu8PX18vKxw+Jvn9xOhckAasEfV6uLsONqmdR9n9Bii8oGcMk4W5rv9f718/Xn6/Xh6PTp6/Dh5fCnxey7zOeswOakveNNhtBCg84WcccgbcYkacAhXLgMW6/s9//08/fH2/bK1+7O1umKtemat+CUq9Nwks6Hns0fdco2dsdfhMERbsAAWbnW5vzP3fPW3u6vyeuSuerX3enX2+aSr92IrN2ludt9p9tikdRTjNSgstFViMlFgsgvdcdCfMEba8BSer83db9Fdb05e7MdY7IeWp84W5vk8P7n7vrt8fmrz/mhyPbFz+RjmNuQsdp0nNeZrdNzldBymcwkUr0XYrwyfLsgZLscWLggYrYAMaX18/f28/VDdcxOf8M7ercfVbPSco9eAAAAE3RSTlMAB1jyIrXyubi2s7NY8vK5uLNYBuhptwAACzFJREFUeNrtmwlUVFUYx7F93+5lusl73vceDrwnDYPMWINmUVQMkZVkBbRNUQQSUClhQVAsZiiRomAQrpFLppm7mVqWa/u+7/u+73X6vvveLOroORWdMzn833bvd5d372++uzCHielVr/rste9hR4fX998f/bd1oxAEel5/vPvuuz1QzW9mEw894qg+2P999iU5ObZdyGX7u9KcQrb/RC5X+AbFxsb+jVqcpojTc+Q+8PnvS6JTMlyvH9gnZq9SEr1S3jskZv8EjUStlK4DY/ZOIFErWTluv5hjoxvABb0AohkAUY67oxdAlAO4IObBaAcQ5R7QOwR6FEDJAFRhhT9uyxGyiUgaJJWItxZCHoyHSCEKlrSypcEzYCA5OU6CgprwAaUDSosoD0jbOut41COvDRC9J4XXm9raJBNS9fmo40fNQgIvPw156iowM2oUXE+/rKwYhVbZPQuyvSRD8eVguKeOKFdBDQohrtfheZVHrnsE7JAH7lBfghxBAMYVrNUlxiRH5dI6iMp1z5+yoBJ1ysjNhKxcqnv1wVvhpSMHUjbktbRWCnklieFR/GLTnBQmlc+2OWfadft6KK98manr5Sd4lj9RWTnkS0KGPX/uggXrrtZ+H6xDARDc1CXz5cgZAssX6YxCwwzKajaA01Ytq5nBGAWTvvYFmQw9g1J97dxhCMBgQ05raqWWOOXFt5ackELpmDfkqtGq13DMdpKc21IoO+lkz5nPMHbfOYQMejSPslNOjD19MDXgoAZc9tYTI2YOkCvOzqQ6Y5yC1CdcpOKNj5kp6qUFrwIABl1dd2KyGz0AAehsBqMgyGIBKD9LThitciPvhUGyCwBIJ52snXkZpfddDgDOy0QArtMHM2DGKQPZOyIHALl6pp1S46Hc3AWc6vcnk4uvzOKMVebmVhqU1nzjRACUL56dgwD4kNMKl+UOwbzMyM3N/fBzAMDpmLNkBQBQ9uGJttjbwGABcAQAoAdIlEO1qIc2nB85c8D5F9qp9GxLUdHGYsoGjk8edmUWowsbioqmPknpuZfkwBAATd9QYXmAAkk/t+mUTf+5qKjoBwUBlFsA6NpvmgAADQPAhQDytxSZahkeMatAMgDg9Iqu+vFt91OpeHzyRVdmUTqiq77+zQwEYBt6hkQ59y6pswA4Ezo7V50jUTpwQmd9/esVJ+RRPsYcAgCqdiV6gBgCz4QB8HVnPaizs94VUQAou+Fareq2+ykNALhOI1dlMACQLIYAZYtOtgDY4HvMi87RwVsu1QjRKoJzAAXBUAnMAQEA3BoCPH/c8FiC8kTOPkBDAPSKa0nVvJPy8xc3+wEQAECDAGjKyDQTAAENMwFgcLhYBc5ypt0sAEx/TnlsJwCUCwCM5o+riridYAAAWd24Zs2aXQHg9vXzAQANC4ALAGIIOJbUPRZ+FbAAaBEJgCOAhPEgtwDATACcWwC4V6KqE1eB3XkAp5yxRWcGALAdhwDNb7sbNVSOMAAcPcDSdh5gAeCAgKtLbh3Ig0OAh3pAOQAYrUIm2AqcHVgG+U6ToLfyIVhvc2tLIuivQeEBOwJg2w0BStni9SpdPHe7IUBDPMACoGYUM/vYeSk8zBBADxB7J7gySiLMA0IBhJ0DWMElNbT4QpgEdwvA3rrMTr1zU3j4fQDFIaIbBsto+r8BmFHwzmBmLCze1SpQbq4CasfbWVQtl4KrwE4egIo4AGoIANkaAqFzAAUA21oNg9HdLIPoAY6O99bN4CrdaSdIrTmg+IF7UONSIwuANQk6V86fv9ITxgMkqhdse7SY0hAAEg8DQO1QNmZRTqkUFgCuAg2gbd8pkQYAl0H3ik8/+eRT4QF8ewCcegsmvL2QY9d2uxGSOjxbRnAa8ADunwR5YCeouFGR9K1wYA6o+LrYbp/ucQIAxk0AnJkewPWCCV2fSaEewDgNMwdM9jR3UBrWA6yNkNsjy/DSCPMAAQD/FvBOh53g3Ey2wz6AAoDCNjvd1RzATQAcAAyAoRIKIFkedF6efyfIAYAciTtBGAITtCCALARgE0MgCMDT4EAAuxkCEnpA1dv5IQB+eQwB2Cm3PKAHAdzZUwBk4QH5c+dNaYWGFzdrOATYwleXLz/hST3EA1xvjsxkYQHkhQ4BrWusH8AzM+iM2ilTppyiowcki0lw5JR58+aBbXbFvwRw1509NQd4Ch+Fj1DPnFiTBQ1f1KwNb6uhzPjo8cdHOAzj3DacAwSAnLccjNLgKkDDA1jVlmICWJHOOM+rmZipA7cn7hYeQLNqaiaiaufL/xJAz3mA+62JjEEjOWUsb1Izcb33EfSYSRIzmP7kO66hS6kBAGRtc63fA+Rh53gNCwB+H8DGnEWqblYN+2QPSW742IurgGdAB+PUMOBGacrzW/FL0YDU1vn/osWy3JMAiGv1TC/0VezSRmxRPJ7V5/1KRdMpK/5qlTx0qVgFCCl9xWF4h5wmCw8A7xh4qWwBMMa8YUsb7TBUACCvGpliOMADSjcvNCiIgR5vcScDAMMv+FY4cgCQ0oYXrkgX+mxLF8Td2zZmpGdjPGNji0wGPJeenr3kWnC7KRnZ2es3Y69L2rKzszPu1jD3q8+mp08+Wqv6Kjs9+xVIdL71bHb25NlEvuvNDrPaK0a3dLqS36nNtoQZr/6nK2HagEJ3DwMgqQ0tvurq6vbGltvdGhBO6GqpboejsaULt2zf+XxTG+FlnlXVPl9jKgJw/dDe3t7YrBGw/gTJ7Z2y8pOv3dcIFm11Y7uvup5ottUta3w+qHlNw3gXSU5tnAryTYXs1dWNNvmfffjOOU+NqnP3MACPrTRVaLjYpRCNJKSmlsJZ4oGonJYKQRcEFMxjI5hDuQakEJSCyW7ABpZSNLhTU68Bg+Zy5Zj1lubIHgIEIIOIY0btn7XU/dJgh1Hr7GEAiBakuTS4i/4FzUTEQSKGV2gZf6aAMVjYSczqelZpT6c41Pw5uA+Izn+QaHrA7pAG3kqU2++Nzv8PaHogRdejA0D40VMIHmAC+GCPAVAyKESbhgUBuEuaLt5R54MH7GFDoHDOF7cE9cWLTrcfzIo5Z++kcbV2r3dPAhBbWDvRbipP3FMKXlNMD3huumXNy4Mzz59FUqU9aQgkzKpxGNAnybx0yZ731EqCerkAoipKUsGuinQ8qLoneUDJrBpVx75ZvVOZ/amhBPXSIl1i2F04MVGkmpjy55gesCf8YGJ44ToHk6jZQQqHd8RscwjU1TpUyevwOhwOHQ58OvAueWltmqwcd2/M3s3k/y8XKXxx6aRJMyeBZsI5c8MKhQi5XcsefviGG24YOxZuEMAg6uGxyy5yywnH7Bez/7EK+d9L0+SSQVeHaFOFRiwCm04Nr01uzXX7j4fH7NX32PEVybFRKJL6YHzjITF9DupbFp8YHxcXH58YFx9Xho+4srK4RGEDKzwSRQwEEQhABvEogzNQEIXZEhNFMpjL0IyXv0QZpMILRCYsh2arrLiBGQNWKBFfZmay6sQbtqcsUdgwGC8KiBZjHDqCNWOrrAZAeStB9Csu0FxM6Bt/cB/43eBBfUHHWOoLB9zhgZcVRwPegqnWDR8iYslfRWhOETZlJgUEwWAxM1mkm+d2LzOTLaEhYDdzh9Ya3zcYDJrNOv1tMZ8/HryP+cvRA/bu379/0rQkuLrfT+rXH0KmwAIRiPVDwaN/v6Skfv5IkmlOgoj/hAKYgmEURkOz4ZEEJ5iwaqteMGBRtMITWzINkkEYgZwiA9qt3P53YWuwFKZNe/99CGLsz2+/vam7u7v/tG6f76Z+NwXULRqSJCrAkt17H7BXn5he9Sra9Rev4Mmvg+eVAAAAAABJRU5ErkJggg==";
const HAND_64 = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAABVlBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AAAD9/f38/Pz4+Pjw8PD6+vrz8/PLy8vJycnj4+Pg4ODPz8+7u7tCQkLy8vLo6Ojl5eXf39/T09OwsLCtra2srKyFhYVtbW1paWlZWVkWFhbX19e2trapqamgoKCZmZllZWVSUlJMTExHR0c+Pj4yMjL19fXNzc3AwMCkpKSWlpaTk5OKioqIiIhfX19VVVXc3NzGxsaMjIxxcXEPDw+dnZ18fHx0dHRhYWFRUVE2NjYsLCwlJSUcHBwaGhou3nrlAAAAMnRSTlMA/APmIfb96wpFLxvFm2/5Du5pFc7JwK6nhGNOul1WE/HX0nt1QSneqqJaSzodBpGQjGg4uzwAAAL2SURBVFjDrZdXW+JAGIUTCAEBKdIWFnHt3d3NCVWkK0XAgoK9l+3l/99sSFhXn4eZsIPvzcDFOcybzAeEe20Eq2BhT1tCU26T2+ewsOYXeXThAx6mvGFUBGqfPjeARaY9WN04OpHlRDMH5whLQRDISgryHfCGpSCARlrqcnwEo4fhEgSAglog7wNvGXbwHkhJKptsDiM87mXNocPkYDECyaEcRl/B4VJzSOZgnBjGQWJ3WB/aQdIcDpkc1v45nA/rkGF2uNIK8oqDR4gszdoMyil3rU6sDTYPZvD5J4dJiIDxgxAJG81Gf8jlGllaFgyDO/zF7NRWrxkQ3R9tdAfxmUOjtnO6dwCFr9XtH+hhn9Bx+BnXGi5QiSljUWyhfhKLxpotdM5Pdw8hjg7qUI2p6y021bXUSSl9pTbcAtUBqGoF8RNtjZ5FtRfZRHdQK8CYjsP3nkNvkYq9NakO2gbg13d4gfziXfQG76gOIdWBQpnqYAs4gU6cmNYc7MT83Dy6pGgFiTrZweIH6mfAFavDOI9aIVpHjtVhAchI0hazg2ES7aQkpYFLqgPxLFm8yB0rd/qa4kA/S2FgQ9J3iF3D3H+oHUBZUh3uaQXyHukPhGDCgTI5iRbdQc4C4/0d7E8OGYnCOjDDkRwq3flrHxRpBSligeDEt+705xOSzg4cHMnhsSTpcgqEOKLDrn5BBeIyoWCVV+8DnegFTFaO6NDQdYg9wGjjhnCIt+G1EL+SeNwkdArSvxHgOIrDrU5BBgiSC8aAixi9QD3JRDzzeCxTG+Rd8LMcmQiPX/tJ+jCaVmi/TQ4T8NCUaQXiLEdrGDcDR2fkgd6BGOSoWH08cH0X6/fxhWwNgM9Fb3BNuwFUS3LfNMBP2XSffxacisdW/tkEFHa21bRzMmjlBiDiFYEvaW0TiWIvbZqafp6mewTNwE1TGZ70Vi/tJaTJF1PE9ma5paV9M3Pc/2ILA1ra7lDSDLxV0/4xgWPEZTaFQzaOHcOKx8BR+QOlJVoDyWkaGwAAAABJRU5ErkJggg==";
const TEXT_64 = "data:image/jpeg;base64,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";
const DLOAD_64 = "data:image/jpeg;base64,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";

var GameScreen = 0;
const GAMEPLAY = 2;
var sx = 0, sy = 0, sz = 0, rx = 0, ry = 0, rz = 0;
function loadUI(gameUI, assetpath, x, y, clickval) {
    var sprite = gameUI.createSprite(assetpath);
    sprite.alpha = 1;
    sprite.x = x;
    sprite.y = y;
    sprite.width = sprite.width * 1.1;
    sprite.height = sprite.height * 1.1;
    sprite.pivot.x = 0.5;
    sprite.pivot.y = 0.5;
    sprite.anchor.x = ThreeUI.anchors.center;
    sprite.anchor.y = ThreeUI.anchors.center;
    sprite.visible = false;
    sprite.alpha = 1;

    if (clickval > 0) {
        sprite.onClick(() => { mGame.Handle_Menu(clickval); });
    }
    return sprite;
}

function createTexts(gameUI, text, size, color, anchorx, anchory, textAlign, tpye) {
    var lbltext = gameUI.createText(text, size, tpye, color);
    lbltext.anchor.x = anchorx;
    lbltext.anchor.y = anchory;
    lbltext.textAlign = textAlign;
    lbltext.visible = false;
    return lbltext;
}

function DrawTexture(tex, x, y, sx, sy) {
    tex.x = x;
    tex.y = y;
    tex.width = sx;
    tex.height = sy;
    tex.anchor.x = ThreeUI.anchors.center;
    tex.anchor.y = ThreeUI.anchors.center;
    tex.visible = true;
}
function DrawLbl(tex, lbl, x, y, color, siz) {
    tex.x = x;
    tex.y = y;
    tex.text = lbl;
    tex.color = color || '#fafafa';
    tex.size = siz || 50;
    tex.anchor.x = ThreeUI.anchors.center;
    tex.anchor.y = ThreeUI.anchors.center;
    tex.visible = true;
}

function loadUIRect(gameUI, x, y, dx, dy, color) {
    var rect = gameUI.createRectangle(color, x, y, dx, dy);
    rect.alpha = 1.0;
    rect.anchor.x = ThreeUI.anchors.center;
    rect.anchor.y = ThreeUI.anchors.center;
    rect.visible = false;
    return rect;
}

function Rect2RectIntersection(ax, ay, adx, ady, bx, by, bdx, bdy) {
    ax -= adx / 2;
    ay += ady / 2;
    bx -= bdx / 2;
    by += bdy / 2;
    if (ax + adx > bx && ay - ady < by && bx + bdx > ax && by - bdy < ay) {
        return true;
    }
    return false;
}
function dealWithKeyboard(e) {
    var vs = 1, rs = .1;
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
        case 66:
        case 90:
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
            mGame.reset();
            break;
    }
    console.log("sx = " + sx + ", sy = " + sy + ", sz =" + sz);
    console.log(e.keyCode + " rx = " + rx + ", ry = " + ry + ", rz =" + rz);
}
var clr = 5;
function createColor() {
    clr++;
    var frequency = 0.03;
    r = Math.floor(Math.sin(frequency * clr + 0) * 127 + 128);
    g = Math.floor(Math.sin(frequency * clr + 2) * 127 + 128);
    b = Math.floor(Math.sin(frequency * clr + 4) * 127 + 128);

    return new THREE.Color('rgb(' + r + ',' + g + ',' + b + ')');




}
var isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};


class CustomSinCurve extends THREE.Curve {
    constructor(scale) {
        super();
        this.scale = scale;
    }
    getPoint(t) {
        const tx = Math.cos(Math.PI * t * .6);
        const ty = Math.sin(Math.PI * t * .6);
        const tz = 0;
        return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
    }
}

const path = new CustomSinCurve(22), tubularSegments = 63, radius = 2.1, radialSegments = 8, closed = false;
const tubes = new THREE.TubeBufferGeometry(path, tubularSegments, radius, radialSegments, closed);



class Burger {
	createHamburger() {
		var Hamburger;
		if (this.hamburger === undefined) {
			var COL = [0xfad49e, 0xefe97f, 0x725b5a, 0x8ac286];

			Hamburger = new THREE.Group();
			var geometry = new THREE.SphereGeometry(3.84, 8, 8, 0, Math.PI, 0, Math.PI);
			var material = new THREE.MeshLambertMaterial({ color: COL[0] });
			var top = new THREE.Mesh(geometry, material);
			Hamburger.add(top);
			top.rotation.set(-Math.PI * .5, 0, 0);


			var material = new THREE.MeshLambertMaterial({ color: COL[1] });
			var box_geometry = new THREE.BoxGeometry(8, .2, 8);
			var cheese = new THREE.Mesh(box_geometry, material);
			cheese.position.set(0, 0, 0);
			cheese.rotation.set(-Math.PI * .01, 0, 0);
			Hamburger.add(cheese);

			var material = new THREE.MeshLambertMaterial({ color: COL[2] });
			var box_geometry = new THREE.CylinderGeometry(4, 4, 3.4, 8);
			var cheese = new THREE.Mesh(box_geometry, material);
			cheese.position.set(0, -1.80, 0);
			Hamburger.add(cheese);

			var material = new THREE.MeshLambertMaterial({ color: COL[3] });
			var box_geometry = new THREE.CylinderGeometry(4.2, 4.2, .4, 8);
			var cheese = new THREE.Mesh(box_geometry, material);
			cheese.position.set(0, -1.90, 0);
			Hamburger.add(cheese);

			var material = new THREE.MeshLambertMaterial({ color: COL[1] });
			var box_geometry = new THREE.BoxGeometry(8, .2, 8);
			var cheese = new THREE.Mesh(box_geometry, material);
			cheese.position.set(0, -2.20, 0);
			Hamburger.add(cheese);


			// var material = new THREE.MeshLambertMaterial({ color: COL[2] });
			// var box_geometry = new THREE.CylinderGeometry(4, 4, 1.4, 8);
			// var cheese = new THREE.Mesh(box_geometry, material);
			// cheese.position.set(0, -2.90, 0);
			// Hamburger.add(cheese);


			var material = new THREE.MeshLambertMaterial({ color: COL[3] });
			var box_geometry = new THREE.CylinderGeometry(4.2, 4.2, .4, 8);
			var cheese = new THREE.Mesh(box_geometry, material);
			cheese.position.set(0, -3.70, 0);
			Hamburger.add(cheese);


			var material = new THREE.MeshLambertMaterial({ color: COL[0] });
			var box_geometry = new THREE.CylinderGeometry(3.84, 3.84, 2, 16);
			var cheese = new THREE.Mesh(box_geometry, material);
			cheese.position.set(0, -5.00, 0);
			Hamburger.add(cheese);



			Hamburger.position.set(0, 0, 0);
			// this.scene.add(Hamburger);
			this.hamburger = Hamburger;

		} else {
			Hamburger = this.hamburger.clone();
		}
		return Hamburger;
	}
}

const COLORS = [0x6972d1, 0xd83a8a, 0x464a4e, 0x6dfeff, 0xf7bb28];
const HEIGHT = 10;
const mBurger = new Burger();
const LVL = 1;
class Game {
	constructor() {
		this.useVisuals = true;
		this.init();
	}
	init() {
		const game = this;
		this.mTex_Continue = this.mTex_Download = null;
		this.counter = 0;
		this.isResize = 0;
		this.mTex_fonts = Array(2);
		this.isTuch = false;
		this.fire = false;
		this.fireBall = [];
		this.isResize = 0;
		this.mTex_fonts = Array(2);
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0xf5c761);
		this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.camera.position.set(0, 30, 120);//30
		this.camera.lookAt(new THREE.Vector3(0, 5, 0));
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
		this.gameUI = new ThreeUI(this.renderer.domElement, 720);
		AssetLoader.add.image64('CONT_64', CONT_64);
		AssetLoader.add.image64('HAND_64', HAND_64);
		AssetLoader.add.image64('TEXT_64', TEXT_64);
		AssetLoader.add.image64('DLOAD_64', DLOAD_64);
		AssetLoader.add.image('assets/continue.png');
		AssetLoader.progressListener = function (progress) {
			console.log("progress = "+progress);
		};
		AssetLoader.load(function () {
			game.mTex_hand = loadUI(game.gameUI, 'HAND_64', 0, 200, 0);
			game.mTex_hand.visible = false;
			game.mTex_hand.vx = -1;
			game.mTex_Continue = loadUI(game.gameUI, 'CONT_64', 0, 200, 11);
			game.mTex_Continue.vx = 1.01;
			game.mTex_Continue.sx = 1;
			game.mTex_Continue.visible = false;
			game.mTex_Download = loadUI(game.gameUI, 'DLOAD_64', 0, -320, 12);
			game.mTex_Download.vx = 1.1;
			game.mTex_Download.s = 1;
			game.mTex_Download.sx = 1.1;
			game.mTex_Download.count = 0;
			// DrawTexture(game.mTex_Download, 0, -320, 200, 50);
			game.mTex_text = loadUI(game.gameUI, 'TEXT_64', 0, -160, 0);
			// game.mTex_text.visible = true;

			for (var i = 0; i < game.mTex_fonts.length; i++) {
				game.mTex_fonts[i] = createTexts(game.gameUI, "100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "HanaleiFill");
			}

		});

		if (this.useVisuals) {
			this.helper = new CannonHelper(this.scene);
			this.helper.addLights(this.renderer);
		}
		this.initPhysics();
		document.addEventListener('keydown', dealWithKeyboard);
		if (isMobile.any()) {
			document.addEventListener('touchstart', e => { this.touchEvent(e, 0, 1); });
			document.addEventListener('touchmove', e => { this.touchEvent(e, 1, 1); });
			document.addEventListener('touchend', e => { this.touchEvent(e, 2, 1); });
		} else {
			document.addEventListener('mousedown', e => { this.touchEvent(e, 0, 0); });
			document.addEventListener('mousemove', e => { this.touchEvent(e, 1, 0); });
			document.addEventListener('mouseup', e => { this.touchEvent(e, 2, 0); });
		}
		window.addEventListener('resize', this.onWindowResize, false);
	}
	Handle_Menu(clickval) {
		console.log('clickval yogesh ' + clickval);
	}
	onWindowResize() {
		mGame.camera.aspect = window.innerWidth / window.innerHeight;
		mGame.camera.updateProjectionMatrix();
		mGame.renderer.setSize(window.innerWidth, window.innerHeight);
		mGame.isResize = 5;
	}
	touchEvent(e, type, sys) {
		if (type == 0) {
			// this.fire = true;
			this.setFire();
		}
		if (type == 2) {
			this.fire = false;
		}
	}
	setFire() {
		if (this.fireBall.length < 32) {
			var obj = this.addBody(0, -5, 4, 50);
			obj.velocity = new CANNON.Vec3(0, 14, -100);
			this.fireBall.push(obj);

			var obj = this.addBody(0, 5, 4, 50);
			obj.velocity = new CANNON.Vec3(0, 14, -100);
			this.fireBall.push(obj);

		} else {
			let j = -1, y = 0, z = 0;
			for (let i = 0; i < this.fireBall.length; i++) {
				if (this.fireBall[i].position.y < y || this.fireBall[i].position.z < -400) {
					y = this.fireBall[i].position.y;
					j = i;
				}
			}
			console.log(j + "~~~~~~~~~~~~~~" + y);
			if (j >= 0) {
				this.fireBall[j].position.set(-5, 4, 50);
				this.fireBall[j].velocity = new CANNON.Vec3(0, 16, -100);
			}
			j = -1; y = 0;
			for (let i = 0; i < this.fireBall.length; i++) {
				if (this.fireBall[i].position.y < y || this.fireBall[i].position.z < -400) {
					y = this.fireBall[i].position.y;
					j = i;
				}
			}
			console.log(j + "~~~~~~~~00~~~~~~" + y);
			if (j >= 0) {
				this.fireBall[j].position.set(5, 4, 50);
				this.fireBall[j].velocity = new CANNON.Vec3(0, 16, -100);
			}
		}
	}
	addBody(sphere = 0, x, y, z) {
		const material = new CANNON.Material();
		var body = new CANNON.Body({ mass: 5, material: material });
		switch (sphere) {
			case 0:
				body.addShape(this.shapes.sphere);
				break;
			case 1:
				body.addShape(this.shapes.box);
				break;
			case 2:
				body.addShape(this.shapes.cylinder);
				break;
			case 3:
				body.addShape(this.shapes.base);
				break;
		}
		body.id = 'you' + this.counter++;
		body.addEventListener("collide", (e) => { this.collition(e); });
		body.position.set(x, y, z);
		var axis = new CANNON.Vec3(1, 0, 0);
		var angle = Math.PI / 2;
		body.quaternion.setFromAxisAngle(axis, angle);
		body.linearDamping = this.damping;
		this.world.add(body);
		if (this.useVisuals) {
			switch (sphere) {
				case 0:
					this.helper.addVisual(body, 'sphere', true, false, 3);
					break;
				case 1:
					this.helper.addVisual(body, 'box', true, false, 0);
					break;
				case 2:
					this.helper.addVisual(body, 'cylinder', true, false, 0);
					break;
				case 3:
					this.helper.addVisual(body, 'cylinder', true, false, 0);
					break;
			}
		}
		const material_ground = new CANNON.ContactMaterial(this.groundMaterial, material, { friction: 0.0, restitution: 0 });
		this.world.addContactMaterial(material_ground);
		return body;
	}
	collition(e) {
		
		if ((e.target.name == 'sphere' && e.body.name == 'cylinder') || (e.target.name == 'cylinder' && e.body.name == 'sphere')) {
			this.isTuch = true;
			this.mTex_text.visible = false;
		}
	}
	initPhysics() {
		const world = new CANNON.World();
		this.world = world;
		this.fixedTimeStep = 1.0 / 60.0;
		this.damping = .01;
		world.broadphase = new CANNON.NaiveBroadphase();
		world.gravity.set(0, -10, 0);
		const groundShape = new CANNON.Box(new CANNON.Vec3(20, 20, 0.1))
		const groundMaterial = new CANNON.Material();
		const groundBody = new CANNON.Body({ mass: 0, material: groundMaterial });
		groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		groundBody.addShape(groundShape);
		world.add(groundBody);
		this.cyl = [];
		this.shapes = {};
		this.shapes.sphere = new CANNON.Sphere(2);
		this.shapes.box = new CANNON.Box(new CANNON.Vec3(3, 1.5, 2.5));
		this.shapes.cylinder = new CANNON.Cylinder(3.5, 3.5, HEIGHT, 6);
		this.shapes.base = new CANNON.Cylinder(24, 24, 4, 8);
		this.groundMaterial = groundMaterial;
		const material = new CANNON.Material();
		this.ground = new CANNON.Body({ mass: 1000, material: material });
		this.ground.addShape(this.shapes.base);
		for (let i = 0; i < 6; i++) {
			var red = (i * 20) * (Math.PI / 180);
			var x = Math.cos(red) * 22;
			var z = Math.sin(red) * 22;
			this.ground.addShape(this.shapes.box, new CANNON.Vec3(x, z, -4));
		}
		this.ground.position.set(0, 2, 0);
		var axis = new CANNON.Vec3(1, 0, 0);
		var angle = Math.PI / 2;
		this.ground.quaternion.setFromAxisAngle(axis, angle);
		this.world.add(this.ground);
		this.helper.addVisual(this.ground, 'cylinder', true, false, 1);
		const material_ground = new CANNON.ContactMaterial(this.groundMaterial, material, { friction: 0.0, restitution: 0.0 });
		this.world.addContactMaterial(material_ground);
		for (let i = 0; i < 28; i++) {
			var inc = Math.floor(i / 7) * 25;
			var red = (((i % 7) * (360 / 7)) + inc) * (Math.PI / 180);
			var x = Math.cos(red) * 9;
			var z = Math.sin(red) * 9;
			this.cyl.push(this.addBody(2, x, 4 + (HEIGHT * .5) + (Math.floor(i / 7) * HEIGHT), z));
			this.cyl[i].mass = 20;
		}
		this.animate();
	}
	reset() {
		this.isTuch = false;
		for (let i = 0; i < this.cyl.length && this.isTuch == false; i++) {
			var inc = Math.floor(i / 7) * 25;
			var red = (((i % 7) * (360 / 7)) + inc + this.counter) * (Math.PI / 180);
			var x = Math.cos(red) * 9;
			var z = Math.sin(red) * 9;
			this.cyl[i].position.set(x, 4 + (HEIGHT * .5) + (Math.floor(i / 7) * HEIGHT), z);
			this.cyl[i].quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			this.cyl[i].position.set(0, 0, 0);
		}
		for (let i = 0; i < this.fireBall.length; i++) {
			this.fireBall[i].position.y = -100;
		}
	}
	installAnimation() {
		if(this.mTex_Continue !== null){
			DrawTexture(this.mTex_Continue, 0, 200, this.mTex_Continue.sx * 256, this.mTex_Continue.sx * 64);
		}
		if(this.mTex_Download === null){
			console.log("mTex_Download = "+this.mTex_Download);
			return;
		}
		var scx = 0;
		if (window.innerWidth > window.innerHeight) {
			scx = 0.5;
		}

		DrawTexture(this.mTex_Download, this.mTex_Download.x, -320, 200 * this.mTex_Download.s, 50 * this.mTex_Download.s);
		this.mTex_Download.s *= this.mTex_Download.sx;
		if (this.mTex_Download.s > 1 + scx)
			this.mTex_Download.sx = .993;
		if (this.mTex_Download.s < .9 + scx)
			this.mTex_Download.sx = 1.008;

		this.mTex_Download.count++;
		if (this.counter % 300 > 250) {
			this.mTex_Download.x += this.mTex_Download.vx;
			if (this.mTex_Download.x > 5)
				this.mTex_Download.vx = -2;
			if (this.mTex_Download.x < -5)
				this.mTex_Download.vx = 2;
		}
		if (this.mTex_Continue.visible == true) {
			scx = -.1;
			DrawTexture(this.mTex_Continue, 0, 200, this.mTex_Continue.sx * 256, this.mTex_Continue.sx * 64);
			if (this.mTex_Continue.sx > 1.1 + scx) {
				this.mTex_Continue.vx = .995;
			}
			if (this.mTex_Continue.sx < 0.99 + scx) {
				this.mTex_Continue.vx = 1.005;
			}
			this.mTex_Continue.sx *= this.mTex_Continue.vx;
		}
		if (this.mTex_text.visible == true)
			DrawTexture(this.mTex_text, 0, -160, 256, 32);
	}
	animate() {
		const game = this;
		requestAnimationFrame(function () { game.animate(); });
		this.renderer.render(this.scene, this.camera);
		this.gameUI.render(this.renderer);
		for (let i = 0; i < this.cyl.length && this.isTuch == false; i++) {
			var inc = Math.floor(i / 7) * 25;
			var red = (((i % 7) * (360 / 7)) + inc + this.counter) * (Math.PI / 180);
			var x = Math.cos(red) * 9;
			var z = Math.sin(red) * 9;
			this.cyl[i].position.set(x, 4 + (HEIGHT * .5) + (Math.floor(i / 7) * HEIGHT), z);
			this.cyl[i].quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
		}
		this.world.step(this.fixedTimeStep);
		if (this.useVisuals) {
			this.helper.updateBodies(this.world);
		} else {
			this.debugRenderer.update();
		}

		if (this.counter % 10 == 9 && this.fire) {
			this.setFire();
		}
this.installAnimation();
		for (let i = 0; i < this.fireBall.length; i++) {
			// if (this.fireBall[i].position.z > -10)
			// 	this.fireBall[i].velocity = new CANNON.Vec3(0, 14, -100);
			// console.log(this.fireBall[i].position.z.toFixed(2));
			if (this.fireBall[i].velocity.z > -10) {
				this.fireBall[i].velocity.z = -100;
			}
		}
		if (this.counter > 5) {
			this.ground.position.set(0, 2, 0);
			var quatX = new CANNON.Quaternion();
			var quatY = new CANNON.Quaternion();
			quatX.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
			quatY.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), - Math.PI * this.counter * .01);
			var quaternion = quatY.mult(quatX);
			quaternion.normalize();
			this.ground.quaternion = quaternion;
		}
		this.counter++;
		if (this.isResize > 0) {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			// this.gameUI.resize();
			this.isResize--;
		}
	}
}

class CannonHelper {
	constructor(scene) {
		this.scene = scene;
	}
	addLights(renderer) {
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		const ambient = new THREE.AmbientLight(0xffffff, .6);
		this.scene.add(ambient);
		const light = new THREE.DirectionalLight(0xdddddd);
		light.position.set(3, 10, 4);
		light.target.position.set(0, 0, 0);
		light.castShadow = true;
		const lightSize = 10;
		light.shadow.camera.near = 1;
		light.shadow.camera.far = 50;
		light.shadow.camera.left = light.shadow.camera.bottom = -lightSize;
		light.shadow.camera.right = light.shadow.camera.top = lightSize;
		light.shadow.mapSize.width = 1024;
		light.shadow.mapSize.height = 1024;
		this.sun = light;
		this.scene.add(light);

		var geometry = new THREE.CylinderGeometry(6, 4.0, 20, 32);
		var material = new THREE.MeshLambertMaterial({ color: COLORS[3] });
		this.cylinder = new THREE.Mesh(geometry, material);
		var geometry = new THREE.CylinderGeometry(5.3, 4.9, 2, 32);
		var material = new THREE.MeshLambertMaterial({ color: COLORS[4] });
		this.cylinder2 = new THREE.Mesh(geometry, material);
		this.cylinder3 = this.cylinder2.clone();
		this.scene.add(this.cylinder);
		this.cylinder3.position.set(0, -1, 0);
		this.cylinder2.position.set(0, -9, 0);
		this.cylinder2.scale.set(.84, 1, .84);
		this.cylinder.add(this.cylinder3);
		this.cylinder.add(this.cylinder2);
		this.cylinder.rotation.set(Math.PI * .6, 0, 0);
		this.cylinder.position.set(-5, 0, 72);


		this.cylinderClone = this.cylinder.clone();
		this.cylinderClone.position.set(5, 0, 72);
		this.scene.add(this.cylinderClone);
	}
	addVisual(body, name, castShadow = true, receiveShadow = true, clr = 0) {
		body.name = name;
		if (this.currentMaterial === undefined) {
			this.materials = []
			this.currentMaterial = new THREE.MeshLambertMaterial({ color: COLORS[0] });
			for (let i = 0; i < COLORS.length; i++) {
				this.materials.push(new THREE.MeshLambertMaterial({ color: COLORS[i], side: THREE.DoubleSide }));
			}

		}
		let mesh;
		if (body instanceof CANNON.Body) mesh = this.shape2Mesh(body, castShadow, receiveShadow, clr);
		if (mesh) {
			body.threemesh = mesh;
			mesh.castShadow = castShadow;
			mesh.receiveShadow = receiveShadow;
			this.scene.add(mesh);
		}
	}

	shape2Mesh(body, castShadow, receiveShadow, clr) {
		const obj = new THREE.Object3D();
		const material = this.materials[clr];
		const material1 = this.materials[2];
		const game = this;
		let index = 0;
		body.shapes.forEach(function (shape) {
			let mesh;
			switch (shape.type) {
				case CANNON.Shape.types.SPHERE:
					const sphere_geometry = new THREE.SphereGeometry(shape.radius, 12, 12);
					mesh = new THREE.Mesh(sphere_geometry, material);
					break;
				case CANNON.Shape.types.PLANE:
					mesh = new THREE.Object3D();
					const submesh = new THREE.Object3D();
					const ground = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 4, 4), material2);
					ground.scale.set(100, 100, 100);
					submesh.add(ground);
					mesh.add(submesh);
					break;
				case CANNON.Shape.types.BOX:
					// const box_geometry = new THREE.BoxGeometry(shape.halfExtents.x * 2, shape.halfExtents.y * 2, shape.halfExtents.z * 2);
					// mesh = new THREE.Mesh(box_geometry, material);
					mesh = new THREE.Group();
					break;
				case CANNON.Shape.types.CONVEXPOLYHEDRON:
					// var geo = new THREE.Geometry();
					// for (var i = 0; i < shape.vertices.length; i++) {
					// 	var v = shape.vertices[i];
					// 	geo.vertices.push(new THREE.Vector3(v.x, v.y, v.z));
					// }

					// for (var i = 0; i < shape.faces.length; i++) {
					// 	var face = shape.faces[i];
					// 	var a = face[0];
					// 	for (var j = 1; j < face.length - 1; j++) {
					// 		var b = face[j];
					// 		var c = face[j + 1];
					// 		geo.faces.push(new THREE.Face3(a, b, c));
					// 	}
					// }
					// geo.computeBoundingSphere();
					// geo.computeFaceNormals();
					// mesh = new THREE.Mesh(geo, material);
					mesh = new THREE.Group();
					var cyl;
					if (clr == 0) {
						if (LVL == 1) {
							cyl = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, HEIGHT, 16), material);
						} else {
							cyl = mBurger.createHamburger();
						}
						cyl.rotation.set(-Math.PI * .5, 0, 0);
					} else {
						// cyl = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 2, 32), material);
						// cyl.rotation.set(Math.PI * .5, 0, 0);
						cyl = new THREE.Mesh(new THREE.CylinderGeometry(24, 24, 3.4, 32), material);
						var nm = new THREE.Mesh(tubes, material1);
						nm.position.set(0, 3.8, 0);
						nm.rotation.set(Math.PI * .5, 0, 0);
						cyl.add(nm);
						cyl.rotation.set(-Math.PI * .5, 0, 0);
					}
					mesh.add(cyl);
					break;
			}
			mesh.receiveShadow = receiveShadow;
			mesh.castShadow = castShadow;
			mesh.traverse(function (child) {
				if (child.isMesh) {
					child.castShadow = castShadow;
					child.receiveShadow = receiveShadow;
					child.color = createColor();
				}
			});
			var o = body.shapeOffsets[index];
			var q = body.shapeOrientations[index++];
			mesh.position.set(o.x, o.y, o.z);
			mesh.quaternion.set(q.x, q.y, q.z, q.w);
			obj.add(mesh);
		});
		return obj;
	}

	updateBodies(world) {
		world.bodies.forEach(function (body) {
			if (body.threemesh != undefined) {
				body.threemesh.position.copy(body.position);
				body.threemesh.quaternion.copy(body.quaternion);
			}
		});
		// this.cylinder.rotation.set(Math.PI * rx, Math.PI * ry, 0);
		// this.cylinder.position.set(0, 0, sz);
		// this.scene.add(this.cylinder2);
		// this.cylinder2.rotation.set(Math.PI * .7, 0, 0);
		// this.cylinder.rotation.set(Math.PI * mGame.counter * .1, 0, 0);
	}
}
