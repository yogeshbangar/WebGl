
var GameScreen = 0;
const GAMEMENU = 0;
const GAMEPLAY = 1;
const GAMEOVER = 2;
const GAMEHELP = 3;
const GAMELOAD = 4;
const POPTIME = 100;
const CLR_BLUE = '#00529e';
const CLR_RED = '#e9272b';
const CLR_WHT = '#ffffff';
const LEFT = 'left';
const RIGHT = 'right';
const UP = 'up';
const RHIGHT = .34;
const GAP = 1.5;
const MAXLNG = 151;
const BUILDCOLORS = [['#f0edc0', '#f4eca4'],
['#fbdcb3', '#d0964a'],
['#f9bab2', '#e29873'],
['#f8a9c0', '#cc5d60'],
['#f3a6d0', '#ba517c'],
['#a871c4', '#805394'],
['#4388cd', '#2262ae'],
['#e8b392', '#854a18'],
['#eaffd2', '#aecb88'],
['#bfdfea', '#80cae3'],
];


var sx = 0, sy = 0, sz = 0, rx = 0, ry = 0, rz = 0, clr = 5;;
var keydown = -1;
function loadTexture(str) {
    let image = new Image(); image.src = str;
    const texture = new THREE.Texture();
    texture.image = image;
    image.onload = function () { texture.needsUpdate = true; };
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
function DrawLbl(tex, lbl, x, y, color, siz, textAlign) {
    tex.x = x;
    tex.y = y;
    tex.text = lbl;
    tex.color = color || '#fafafa';
    tex.size = siz || 50;
    tex.anchor.x = ThreeUI.anchors.center;
    tex.anchor.y = ThreeUI.anchors.center;
    tex.textAlign = textAlign || 'center';
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
    var dis = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y1 - y2) * (y1 - y2)));
    if (dis < r1 + r2) {
        return true;
    }
    return false;
}
function CircRectsOverlap(CRX, CRY, CRDX, CRDY, centerX, centerY, radius) {
    if ((Math.abs(centerX - CRX) <= (CRDX + radius)) && (Math.abs(centerY - CRY) <= (CRDY + radius)))
        return true;

    return false;
}
function upWithKeyboard(e) {
    keydown = -1;
}
function dealWithKeyboard(e) {
    keydown = e.keyCode;
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
            mGame.reset();
            break;
    }
    console.log("sx = " + sx + ", sy = " + sy + ", sz =" + sz);
    console.log(e.keyCode + " rx = " + rx + ", ry = " + ry + ", rz =" + rz);
}
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
function createColor(fr) {
    clr++;
    var frequency = fr;
    r = Math.floor(Math.sin(frequency * clr + 0) * 127 + 128);
    g = Math.floor(Math.sin(frequency * clr + 2) * 127 + 128);
    b = Math.floor(Math.sin(frequency * clr + 4) * 127 + 128);

    return new THREE.Color('rgb(' + r + ',' + g + ',' + b + ')');
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return new THREE.Color('rgb(' + parseInt(result[1], 16) + ',' + parseInt(result[2], 16) + ',' + parseInt(result[3], 16) + ')');
}
var isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i); },
    any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); }
};
function loadModel() {}
function TexSingle(bitB, tilesHori, tilesVrt, noTiles, tileDuration, check) {
    animClass = new Birds();
    animClass.annie = new TextureSingle(bitB, tilesHori, tilesVrt, noTiles, tileDuration, check);
    var geometry = new THREE.PlaneGeometry(15, 15, 15);
    var materialB = new THREE.MeshBasicMaterial({ map: bitB, transparent: true, polygonOffset: true, polygonOffsetFactor: -4 });
    animClass.body = new THREE.Mesh(new THREE.PlaneBufferGeometry(32, 32, 4, 4), materialB);
    animClass.body.visible = true;
    return animClass;
}
function TextureSingle(textureB, tilesHoriz, tilesVert, numTiles, tileDispDuration, check) {
    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    this.numberOfTiles = numTiles;
    this.checkk = check;
    textureB.wrapS = textureB.wrapT = THREE.RepeatWrapping;
    textureB.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);
    this.tileDisplayDuration = tileDispDuration;
    this.currentDisplayTime = 0;
    this.currentTile = -1;
    this.update = function (milliSec) {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration) {
            this.currentDisplayTime -= this.tileDisplayDuration;
            this.currentTile++;
            if (this.currentTile == this.numberOfTiles || this.currentTile >= this.checkk){
                mGame.runner.status = 0;
                this.currentTile = 0;
            }
            var newone = this.numberOfTiles - this.currentTile - 1;
            var currentColumn = this.currentTile % this.tilesHorizontal;
            textureB.offset.x = currentColumn / this.tilesHorizontal;
            var currentRow = Math.floor(newone / this.tilesHorizontal);
            textureB.offset.y = currentRow / this.tilesVertical;
        }
    };
    this.reset = function (tile) {
        this.currentTile = tile || 0;
        var newone = this.numberOfTiles - this.currentTile - 1;
        var currentColumn = this.currentTile % this.tilesHorizontal;
        textureB.offset.x = currentColumn / this.tilesHorizontal;
        var currentRow = Math.floor(newone / this.tilesHorizontal);
        textureB.offset.y = currentRow / this.tilesVertical;
    };
}
class Birds {
    constructor() {
        this.body = null;
        this.annie = null;
    }
}
class Runner {
    constructor(game,tex_run,tex_jump,tex_roll, shadowTex) {
        this.first = TexSingle(tex_run, 8, 4, 32, 30, 19);
        this.first.body.scale.set(.0075, .03, .02);

        this.jump = TexSingle(tex_jump, 8, 4, 32, 40, 28);
        this.jump.body.scale.set(.015, .03, .02);

        this.roll = TexSingle(tex_roll, 8, 8, 64, 60, 64);
        this.roll.body.scale.set(.015, .03, .02);

        this.shadow = new THREE.Mesh(new THREE.PlaneBufferGeometry(1, 1), new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true }));
        this.shadow.scale.set(0.2, 0.2, .2);
        this.shadow.rotation.set(-Math.PI * .5, 0, 0);

        game.scene.add(this.first.body);
        game.scene.add(this.jump.body);
        game.scene.add(this.roll.body);
        game.scene.add(this.shadow);

        this.reset();
    }
    reset() {
        this.first.annie.reset(0);
        this.jump.annie.reset(0);
        this.roll.annie.reset(0);
        this.x = 0;
        this.z = -13;
        this.y = 0.3;
        this.sy = 0.3;
        this.vy = 0;
        this.vx = 0;
        this.mx = 0;
        this.spd = 0;
        this.time = 0;
        this.dx = 0;
        this.dy = 0;
        this.isDwon = false;
        this.over = 0;
        this.gComp = 0;
        this.onBase = 0;
        this.status = 0;

    }
    revive() {
        this.x = 0;
        this.z = -13;
        this.y = 0.3;
        this.vy = 0;
        this.vx = 0;
        this.mx = 0;
        this.spd = 0;
        this.dx = 0;
        this.isDwon = false;
        this.over = 0;
        this.status = 0;
    }
    setshadwow() {
        this.shadow.position.set(this.first.body.position.x, this.first.body.position.y - .26, this.first.body.position.z);
        this.shadow.visible = true;
    }
    update() {
        this.first.body.position.set(this.x, this.y, this.z);
        this.jump.body.position.set(this.x, this.y, this.z);
        this.roll.body.position.set(this.x, this.y, this.z);
        this.shadow.position.set(this.x, this.sy + .001, this.z);
        this.first.body.visible = this.status == 0;
        this.jump.body.visible = this.status == 1;
        this.roll.body.visible = this.status == 2;
        if(this.status == 1){
            this.jump.annie.update(mGame.delta * 1000);
            if(this.jump.annie.currentTile >= 26){
                // this.status = 0;
            }
        }else if(this.status == 2){
            this.roll.annie.update(mGame.delta * 1000);
            if(this.roll.annie.currentTile > 10){
                this.roll.annie.tileDisplayDuration = 30;
                this.roll.body.position.set(this.x, this.y+.05, this.z);
            }
        }else{
            this.first.annie.update(mGame.delta * 1000);
        }
        if (this.time < MAXLNG || this.gComp == 0) {
            this.time += this.spd;
            if (this.vx > 0) {
                this.x += this.vx;
                if (this.x > this.mx) {
                    this.x = this.mx;
                    this.vx = 0;
                }
            }
            if (this.vx < 0) {
                this.x += this.vx;
                if (this.x < this.mx) {
                    this.x = this.mx;
                    this.vx = 0;
                }
            }
            // if (this.vy > 0) 
            {
                this.y += this.vy;
                this.vy -= .01;
                if (this.spd > 0 && this.y < -1) {
                    this.spd -= .005;
                    if (this.spd < 0) {
                        this.spd = 0;
                    }
                } else {
                    if (this.spd < .15)
                        this.spd += .002;
                }

            }
            if (this.y < -10) {
                mGame.revive();
            }
            TWEEN.update();
            new TWEEN.Tween(mGame.camera).to({ position: {x: this.x * .8, y: 1 + this.y * .8,z:-10}}, 200).start();
        } else {
            TWEEN.update();
            if (this.spd > 0) {
                this.spd -= .03;
                if (this.spd < 0) {
                    this.spd = 0;
                }
                console.log('this.gComp = '+this.gComp);
                if(this.gComp == 1){
                    this.gComp++;
                    var bi = (mGame.lJump + 1) % mGame.mBuilding.length;
                    new TWEEN.Tween(mGame.camera).to({ position: {x: 0, y: 1,z:mGame.mBuilding[bi].position.z + 5}}, 2000).start();
                }
            } else {
                this.gComp++;
                this.status =0;
                this.roll.body.visible = this.jump.body.visible = this.shadow.visible = this.first.body.visible = false;
                mGame.skyTarget.visible = true;
                var bi = (mGame.lJump + 1) % mGame.mBuilding.length;
                var y = mGame.mBuilding[bi].position.y + mGame.mBuilding[bi].scale.y * .5 + .61;
                if (this.gComp < 9) {
                    mGame.skyTarget.position.set(0, .1 * (18 - this.gComp * 2) + y, mGame.mBuilding[bi].position.z + 2);
                } else {
                    mGame.skyTarget.position.set(0, y, mGame.mBuilding[bi].position.z);
                }
                this.x *= .9;
                if (this.gComp == 3 && this.gComp < 80) {
                    mGame.myAudiobg.pause();
                    mGame.myAudiocheer.play();
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.4 }
                    });
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.5 }
                    });
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            }
        }

    }
    ompleteCallback(){
        console.log("tween");
    }
    tap(dir) {
        // if (this.vy == 0 || this.vx == 0) 
        {
            if (dir == LEFT) {
                this.vx = -.05;
                this.mx = this.x - .5;

                // new TWEEN.Tween(mGame.camera)
                // .to({ position: {x: this.mx}}, 500)
                // .start().onComplete(this.ompleteCallback);


            }
            if (dir == RIGHT) {
                this.vx = 0.05;
                this.mx = this.x + .5;
                // new TWEEN.Tween(mGame.camera)
                // .to({ position: {x: this.mx}}, 500)
                // .start().onComplete(this.ompleteCallback);
            }
            if (dir == UP && this.onBase == 0) {
                this.vy = 0.12;
                this.y += this.vy;
                this.onBase = 1;
                mGame.myAudiojump.currentTime = 0;
                mGame.myAudiojump.play();
                var noe = (mGame.lJump+1)%mGame.mBuilding.length;
                if(mGame.mBuilding[mGame.lJump].scale.y>mGame.mBuilding[noe].scale.y){
                    this.roll.annie.tileDisplayDuration = 60;
                    this.status = 2;
                }else
                    this.status = 1;
                this.jump.annie.reset();
                this.roll.annie.reset();
            }
        }
    }
}