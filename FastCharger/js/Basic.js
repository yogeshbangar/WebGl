var GameScreen = 0;
const GAMEMENU = 0;
const GAMEPLAY = 1;
const GAMEOVER = 2;
const POPTIME = 100;
const CLR_BLUE = "#056dae";
const CLR_RED = "#e9272b";
const CLR_WHT = "#ffffff";
var sx = 0,
  sy = 0,
  sz = 0,
  rx = 0,
  ry = 0,
  rz = 0,
  clr = 5;
var keydown = -1;
function loadTexture(str) {
  let image = new Image();
  image.src = str;
  const texture = new THREE.Texture();
  texture.image = image;
  image.onload = function () {
    texture.needsUpdate = true;
  };
  return texture;
}
function loadSound(nam, str) {
  var x = document.createElement("AUDIO");
  x.setAttribute("src", str);
  x.setAttribute("id", nam);
  document.body.appendChild(x);
  return x;
}
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
    sprite.onClick(() => {
      mGame.Handle_Menu(clickval);
    });
  }
  return sprite;
}
function createTexts(
  gameUI,
  text,
  size,
  color,
  anchorx,
  anchory,
  textAlign,
  tpye
) {
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
  tex.color = color || "#fafafa";
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
function cirCirCollition(x1, y1, r1, x2, y2, r2) {
  var dis = Math.sqrt((x2 - x1) * (x2 - x1) + (y1 - y2) * (y1 - y2));
  if (dis < r1 + r2) {
    return true;
  }
  return false;
}
function CircRectsOverlap(CRX, CRY, CRDX, CRDY, centerX, centerY, radius) {
  if (
    Math.abs(centerX - CRX) <= CRDX + radius &&
    Math.abs(centerY - CRY) <= CRDY + radius
  )
    return true;

  return false;
}
function upWithKeyboard(e) {
  keydown = -1;
}
function dealWithKeyboard(e) {
  keydown = e.keyCode;
  var vs = 1,
    rs = 0.1;
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
      mGame.rotate = -5;
      break;
    case 50:
      mGame.rotate = 5;
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
function random(min, max) {
  return Math.floor(min + Math.random() * (max - min));
}
function createColor() {
  clr++;
  var frequency = 0.03;
  r = Math.floor(Math.sin(frequency * clr + 0) * 127 + 128);
  g = Math.floor(Math.sin(frequency * clr + 2) * 127 + 128);
  b = Math.floor(Math.sin(frequency * clr + 4) * 127 + 128);

  return new THREE.Color("rgb(" + r + "," + g + "," + b + ")");
}
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
function loadModel() {
  console.log("loadModel ");
}
