
var DMath = {
    random: function (number) {
        return number * Math.random();
    },
    randomInt: function (number) {
        return Math.floor(DMath.random(number));
    },
    randomPlusMinus: function (number) {
        return number * (Math.random() - Math.random());
    },
    randomIntPlusMinus: function (number) {
        return Math.round(DMath.randomPlusMinus(number));
    },
    randomFromTo: function (from, to) {
        return from + (to - from) * Math.random();
    },
    randomIntFromTo: function (from, to) {
        return Math.floor(DMath.randomFromTo(from, to));
    },

    angleRadBetween2Points: function (p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x);
    },

    angleDegBetween2Points: function (p1, p2) {
        return DMath.radToDeg(DMath.angleRadBetween2Points(p1, p2));
    },

    degToRad: function (deg) {
        return deg * Math.PI / 180;
    },

    radToDeg: function (rad) {
        return rad * 180 / Math.PI;
    },

    angleRadBetween3Points: function (A, B, C) {
        var AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
        var BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
        var AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
        return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB));
    },

    getPointWithAngleAndRadius: function (angle, radius) {
        var p = {
            x: 0,
            y: 0
        };
        p.x = radius * Math.cos(angle);
        p.y = radius * Math.sin(angle);
        return p;
    },

    distanceBetweenPoints: function (p1, p2) {
        var x1 = p1.x;
        var y1 = p1.y;

        var x2 = p2.x;
        var y2 = p2.y;

        var d = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

        return d;
    }
}

var DArray = {
    remove: function (item, array) {
        var arr = array.slice();
        var index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    },

    clone: function (array) {
        var arr = array.slice();
        return arr;
    },

    shuffle: function (array) {
        var arr = array.slice();
        var currentIndex = arr.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = arr[currentIndex];
            arr[currentIndex] = arr[randomIndex];
            arr[randomIndex] = temporaryValue;
        }
        return arr;
    },
    getRandom: function (array) {
        var randId = Math.floor(array.length * Math.random());
        return array[randId];
    }
}
var DObject = {
    clone: function (object) {
        return JSON.parse(JSON.stringify(object));
    },

    merge: function (object, toObject) {
        var obj = DObject.clone(toObject);
        for (var key in object) {
            var val = object[key];
            obj[key] = val;
        }
        return obj;
    }
}

function ExplosionConfetti(options) {
    var _options = {
        amount: 10,
        rate: 2,
        radius: 600,
        areaWidth: 500,
        areaHeight: 500,
        fallingHeight: 500,
        fallingSpeed: 1,
        colors: [0xffffff, 0xff0000, 0xffff00]
    };
    if (options) _options = DObject.merge(options, _options);
    var scope = this;
    scope.options = _options;
    scope.particles = [];
    scope.booms = [];
    scope.options.rate = scope.options.rate / 100;
    if (scope.options.rate > 0.2) scope.options.rate = 0.2;
    this.object = new THREE.Object3D();
    var geometry = new THREE.PlaneBufferGeometry(1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    this.init = function () { };
    this.explode = function () {
        var boom = new THREE.Object3D();
        boom.life = DMath.randomFromTo(500, 500);
        boom.position.x = (10 * Math.random()) - 5;
        boom.position.y = 60;
        boom.position.z = -300;
        scope.object.add(boom);
        scope.booms.push(boom);
        for (var i = 0; i < scope.options.amount; i++) {
            var material = new THREE.MeshBasicMaterial({ color: DArray.getRandom(scope.options.colors), transparent: true, side: THREE.DoubleSide });
            var particle = new THREE.Mesh(geometry, material);
            boom.add(particle);
            particle.life = 1;
            particle.destination = {};
            particle.destination.x = (Math.random() - 0.5) * (scope.options.radius * 2) * Math.random();
            particle.destination.y = (Math.random() - 0.5) * (scope.options.radius * 2) * Math.random();
            particle.destination.z = (Math.random() - 0.5) * (scope.options.radius * 2) * Math.random();
            particle.rotation.x = DMath.random(360);
            particle.rotation.y = DMath.random(360);
            particle.rotation.z = DMath.random(360);
            var size = DMath.randomFromTo(2, 5);
            particle.scale.x = size;
            particle.scale.y = size;
            particle.rotateSpeedX = DMath.randomPlusMinus(0.4);
            particle.rotateSpeedY = DMath.randomPlusMinus(0.4);
            particle.rotateSpeedZ = DMath.randomPlusMinus(0.4);
        }
        boom.dispose = function () {
            for (var i = 0; i < boom.children.length; i++) {
                var particle = boom.children[i];
                particle.material.dispose();
                particle.geometry.dispose();
                boom.remove(particle);
                particle = null;
            }
            boom.parent.remove(boom);
            boom = null;
        };
    };
    this.update = function () {
        if (Math.random() < scope.options.rate) scope.explode();
        var particleAmount = 0;
        for (var i = 0; i < scope.booms.length; i++) {
            var boom = scope.booms[i];
            for (var k = 0; k < boom.children.length; k++) {
                var particle = boom.children[k];
                particle.destination.y -= DMath.randomFromTo(3, 6);
                particle.life -= DMath.randomFromTo(0.005, 0.01);
                var speedX = (particle.destination.x - particle.position.x) / 80;
                var speedY = (particle.destination.y - particle.position.y) / 80;
                var speedZ = (particle.destination.z - particle.position.z) / 80;
                particle.position.x += speedX;
                particle.position.y += speedY;
                particle.position.z += speedZ;
                particle.rotation.y += particle.rotateSpeedY;
                particle.rotation.x += particle.rotateSpeedX;
                particle.rotation.z += particle.rotateSpeedZ;
                if (particle.position.y < -scope.options.fallingHeight) {
                    particle.material.dispose();
                    particle.geometry.dispose();
                    boom.remove(particle);
                    particle = null;
                }
            }
            if (boom.children.length <= 10) {
                boom.dispose();
                scope.booms = DArray.remove(boom, scope.booms);
            }
            particleAmount += boom.children.length;
        }
    };
    this.dispose = function () {
        for (var i = 0; i < scope.particles.length; i++) {
            var particle = scope.particles[i];
            particle.material.dispose();
            particle.geometry.dispose();
            scope.object.remove(particle);
            particle = null;
        }
        scope.object.parent.remove(scope.object);
        scope.object = null;
        scope.update = function () { };
    };
    return this;
}

var GameScreen = 0;
const GAMEMENU = 0;
const GAMEPLAY = 1;
const GAMERESULT = 2;
const POPTIME = 100;
const CLR_BLUE = '#056dae';
const CLR_RED = '#e9272b';
const CLR_WHT = '#ffffff';
var sx = 0, sy = 0, sz = 0, rx = 0, ry = 0, rz = 0, clr = 5;;
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
            mGame.mBall.gameReset();
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
function TexSingle(bitB, tilesHori, tilesVrt, noTiles, tileDuration) {
    animClass = new Birds();
    animClass.annie = new TextureSingle(bitB, tilesHori, tilesVrt, noTiles, tileDuration);
    var geometry = new THREE.PlaneGeometry(15, 15, 15);
    // var materialB = new THREE.MeshBasicMaterial({ map: bitB, transparent: true, blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor });
    var materialB = new THREE.MeshBasicMaterial({ map: bitB, transparent: true, polygonOffset: true, polygonOffsetFactor: -4 });
    animClass.mBody = new THREE.Mesh(new THREE.PlaneBufferGeometry(32, 32, 4, 4), materialB);
    animClass.mBody.visible = true;
    return animClass;
}
function TextureSingle(textureB, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
    this.tilesHorizontal = tilesHoriz;
    this.tilesVertical = tilesVert;
    this.numberOfTiles = numTiles;
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
            if (this.currentTile == this.numberOfTiles)
                this.currentTile = 0;
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
        this.mBody = null;
        this.mCloth = null;
        this.annie = null;
    }
    reset(visible) {
        this.annie.reset();
        this.annie.currentDisplayTime = 0;
        this.mBody.visible = visible;
        this.mCloth.visible = visible;
    }
    set(vec) {
        this.annie.currentTile = 0;
        this.mBody.position.set(vec.x, vec.y, 0);
        this.mBody.visible = true;
        this.mCloth.position.set(vec.x, vec.y, 0);
        this.mCloth.visible = true;

    }


    setpos(x, y, z, sclx, scly, visible) {
        this.annie.currentTile = 0;
        this.annie.currentDisplayTime = 0;
        this.mBody.visible = visible;
        this.mCloth.visible = visible;
        this.mBody.position.set(x, y, z);
        this.mCloth.position.set(x, y, z);
        this.mBody.scale.set(sclx, scly, 1);
        this.mCloth.scale.set(sclx, scly, 1);

    }

    update() {
        // this.annie.currentTile = 18;
        if (this.annie.currentTile < this.annie.numberOfTiles - 1) {
            this.annie.update(delta * 1000);
            var sc = this.annie.currentTile * .007;
            this.mBody.scale.set(.25 - sc * .5, .5 - sc, .26);
            this.mBody.position.set(2 + (this.annie.currentTile > 18 ? (this.annie.currentTile - 18) * .15 : 0), this.annie.currentTile * .2, -30 + this.annie.currentTile);
            this.mCloth.scale.set(.25 - sc * .5, .5 - sc, .26);
            this.mCloth.position.set(2 + (this.annie.currentTile > 18 ? (this.annie.currentTile - 18) * .15 : 0), this.annie.currentTile * .2, -30 + this.annie.currentTile);
        }
    }
}

class Ball {
    constructor(_ball, _batsman, _batsman1, _bowler, _shadow) {
        this.ball = _ball;
        this.batsman = _batsman;
        this.batsman1 = _batsman1;
        this.batsman.annie.reset(0);
        this.bowler = _bowler;
        this.shadow = _shadow;
        this.gameReset();
    }
    gameReset() {
        this.bNo = 0;
        this.runArray = [0, 0, 0, 0, 0, 0];
        this.ballset();
        this.start = 0;
        this.firtBall = 0;
        this.bathit = 0;
        // console.log("reast");
    }
    ballset() {
        this.bNo++;
        this.ball.position.set(24, 48, 1);
        this.ball.rotation.set(Math.PI * this.rx, 0, Math.PI * .45);
        this.batsman.annie.reset(0);
        this.bowler.annie.reset(0);
        this.batsman1.annie.reset(0);
        this.shadow.position.set(20, 3, -82);//0-30
        this.status = 0;
        this.zoom = 0;
        this.hit = 0;
        this.tap = 0;
        this.run = 0;
        this.balltype = random(0, 4);
        if (this.balltype < 2) {
            this.hittype = random(0, 3);
            this.batsman.mBody.visible = true;
            this.batsman1.mBody.visible = false;
        } else {
            this.hittype = random(3, 5);
            this.batsman1.mBody.visible = true;
            this.batsman.mBody.visible = false;
        }
        // this.balltype = 1;
        // this.hittype = 1;
        this.rx = .1;
        this.swing = .1;
        this.mvy = 1.3;
        this.vy = 0;
        this.vz = 1.3;
        this.vx = .1;
        this.swing = -.1;
        this.tappa = -.01;
        this.miss = 0;
        this.anim = 0;

        switch (this.balltype) {
            case 0:
                this.mvy = 4;
                this.vy = 0;
                this.vz = 3;
                this.vx = .33;
                this.swing = -.2;
                this.tappa = -.07;
                break;
            case 1:
                this.mvy = 4;
                this.vy = 0;
                this.vz = 3;
                this.vx = .25;
                this.swing = -.1;
                this.tappa = -.07;
                break;
            case 2:
                this.mvy = 4;
                this.vy = 0;
                this.vz = 3;
                this.vx = 0.3;
                this.swing = .4;
                this.tappa = -.07;
                break;
            case 3:
                this.mvy = 4;
                this.vy = 0;
                this.vz = 3;
                this.vx = 0.4;
                this.swing = .4;
                this.tappa = -.08;
                break;
        }
        console.log("this.balltype = " + this.balltype);
        this.ball.visible = false;
        if (mGame) {
            mGame.myAudiohappy.pause();
            mGame.myAudiosad.pause();
            mGame.myAudiobg.play();
        }
    }
    setScore() {
        var mx = 100;
        mGame.redC.forEach(element => { element.visible = false; });
        mGame.redG.forEach(element => { element.visible = false; });
        mGame.blueC.forEach(element => { element.visible = false; });

        for (var i = 0; i < 6; i++) {
            var x = ((i > 2 ? (90 + (this.zoom * (16 / mx))) : 0) - 144 - (this.zoom * (26 / mx))) + (38 + (this.zoom * (7 / mx))) * i;
            var y = -266 - (this.zoom * ((14 + 3) / mx));

            if (i < this.bNo) {
                DrawTexture(this.runArray[i] > 0 ? mGame.redG[i] : mGame.redC[i], x, y - 10, 32 * 1.1, 32 * 1.1);
                DrawLbl(mGame.mTex_fonts[i + 2], this.runArray[i] + "", x, y, CLR_WHT, 30);
            } else {
                DrawTexture(mGame.blueC[i], x, y - 10, 32 * 1.1, 32 * 1.1);
            }
        }

    }
    update(delta) {
        if (this.status >= 1) {
            if (this.bowler.annie.currentTile < this.bowler.annie.numberOfTiles - 9) {
                this.bowler.annie.update(delta);

                if (this.bowler.annie.currentTile > 37 && this.bowler.annie.currentTile < 80) {
                    this.status = 2;
                    this.ball.visible = true;
                }
                var tl = this.bowler.annie.currentTile;

                if (tl < 30) {
                    this.shadow.position.set(20, 3, -82);//0-30
                } else if (tl < 50) {
                    this.shadow.position.set(20 + tl * (-.1 * .1), 3, -82 + tl * (1 * .1));//0-30
                } else if (tl < 76) {
                    this.shadow.position.set(20 + tl * (-.2 * .1), 3, -82 + tl * (4 * .1));//0-30
                } else if (tl > 140) {
                    var vl = 130;
                    this.shadow.position.set(20 + vl * .01, 3, -82 + vl * (6 * .1));//0-30
                } else {
                    this.shadow.position.set(20 + tl * .01, 3, -82 + tl * (6 * .1));//0-30
                }
            }
        }
        // this.bowler.mBody.position.set(8, 27 + 14, 0);
        // this.bowler.annie.reset(Math.floor(rz * 10));
        // this.bowler.mBody.position.set(1.9 * (this.bowler.annie.currentTile % 13), 27 + rx * .1 * (this.bowler.annie.currentTile % 13), -0);
        // this.bowler.mBody.scale.set(2.3, 2.3, 2.3);
        // this.bowler.position.set(rx * 10, sy, sz);
        // this.ball.visible = true;
        // mGame.shadow.position.set(20, 3, -82);//0-30

        if (this.ball.position.z > 10 && this.firtBall == 0) {
            this.status = 0;
            DrawTexture(mGame.tapIcon, 0, 50, 32 * .7, 42 * .7);
            DrawLbl(mGame.mTex_fonts[10], 'Tap to hit ball', 0, 80, '#222', 16);
        }
        //this.batsman1.annie.reset(sx);
        // this.ball.position.set(24 + sx, 48 + sy, 1);
        // this.ball.visible = true;
        if (this.status > 1) {
            this.ball.position.y += this.vy;
            this.ball.position.z += this.vz;
            this.ball.position.x -= this.vx;
            this.vy += this.tappa;
            this.rx += .2;
            if (this.ball.position.y < 2) {
                this.ball.position.y = 2;
                this.mvy = this.vy = this.mvy * .5;
                if (this.status == 2) {
                    this.vx = this.swing;
                    // console.log("this.vx " + this.status);
                }
                this.status = 3;
            }
            if (this.ball.position.z > 145 && this.ball.position.z < 230) {
                if (this.ball.position.z > 220 && this.tap == 2) {
                    this.setHit();

                }
                if (this.ball.position.z > 145 && this.tap == 1 && this.ball.position.z < 150) {
                    this.hit = 1;
                    this.tap = 2;
                    // console.log("this.ball.position.z = " + this.ball.position.z);
                }
                if (this.ball.position.z > 155 && this.tap == 1) {
                    this.hit = 1;
                    this.miss = 1;
                    // console.log("Miss = " + this.ball.position.z);
                }
            }
            this.ball.rotation.set(Math.PI * this.rx, 0, Math.PI * .45);
            if (this.hit == 1) {

                if (this.batsman.annie.currentTile < this.batsman.annie.numberOfTiles - 29) {//22
                    this.batsman.annie.update(delta);
                    this.batsman1.annie.update(delta);
                } else {
                    if (this.ball.position.z < -10) {
                        this.batsman.annie.reset(0);
                        this.batsman1.annie.reset(0);
                        this.hit = 2;
                    }
                }
            }
            if (this.ball.position.z > 620) {
                this.ballset();
                if (this.bNo <= 6) {
                    this.status = 1;
                } else {
                    this.setGameover();
                }
            }
            if (this.ball.position.z > 230) {
                mGame.amazone.visible = false;
                if (this.ball.position.z < 240) {
                    mGame.myAudiosad.play();
                }
                if (this.ball.position.z < 320) {
                    DrawLbl(mGame.mTex_fonts[1], '', 0, -120, CLR_WHT, 88);
                    mGame.Offer.forEach(element => { element.visible = false; });
                    DrawLbl(mGame.mTex_fonts[0], '' + this.run, 0, -120, CLR_WHT, 88);
                    DrawLbl(mGame.mTex_fonts[this.bNo + 1], '' + this.run, (this.bNo > 3 ? 90 : 0) - 144 + 38 * (this.bNo - 1), -266, CLR_WHT, 30);
                    this.setScore();
                    mGame.Sphere.children[this.bNo - 1].material.color.setHex(0x9f2222);
                } else {
                    DrawLbl(mGame.mTex_fonts[0], 'Try Again', 0, -130, CLR_WHT, 48);
                }
            }
            if (this.anim > 0) {
                // if (this.anim < 50)
                this.anim++;
                if (this.anim > 30 && this.anim < 50) {
                    this.zoom += 5;
                    mGame.camera.position.z = 420 - this.zoom;
                }
                if (this.anim >= 330 && this.anim < 350) {
                    this.zoom -= 5;
                    mGame.camera.position.z = 420 - this.zoom;
                }
                this.setScore();
                if (this.anim > 80) {
                    //mGame.mTex_fonts[0].visible = false;
                    mGame.run_6.visible = false;
                    mGame.run_4.visible = false;
                    mGame.Offer[Math.abs(this.bathit - 1) % mGame.Offer.length].visible = true;
                    DrawTexture(mGame.Offer[Math.abs(this.bathit - 1) % mGame.Offer.length], 0, -174, 376 * .42, 214 * .42);
                    DrawTexture(mGame.amazone, 0, -94, 649 * .42, 120 * .42);

                    // DrawLbl(mGame.mTex_fonts[0], 'APPLY FOR A CITI CREDIT CARD AND', 0, -107, CLR_WHT, 12);
                    // DrawLbl(mGame.mTex_fonts[1], 'GET A 1000 RS. AMAZON VOUCHER. ', 0, -80, CLR_WHT, 18);

                    mGame.confetti.object.visible = true;
                    mGame.confetti.update();

                    // this.anim--;

                }
                if (this.anim > 350) {
                    mGame.confetti.object.visible = false;
                    mGame.camera.position.set(0, 100, 420);//30
                    this.ballset();
                    if (this.bNo <= 6) {
                        this.status = 1;
                    } else {
                        this.setGameover();
                    }
                }
            }
        }

    }
    setGameover() {
        mGame.setScreen(GAMERESULT);
        mGame.myAudiobg.pause();
    }
    setHit() {
        if (this.miss == 1) {
            return;
        }

        switch (this.hittype) {
            case 0:
                this.vz = -10;
                this.mvy = this.vy = 5;
                this.vx = -7;
                this.hit = 1;
                this.run = 6;
                this.tappa = -.1;
                break;
            case 1:
                this.vz = -8;
                this.mvy = this.vy = 5;
                this.vx = -(Math.random() * 2 + 2);
                this.hit = 1;
                this.run = 6;
                this.tappa = -.1;
                break;
            case 2:
                this.vz = -5;
                this.mvy = this.vy = 1;
                this.swing = this.vx = -(Math.random() * 1 + 2);
                this.hit = 1;
                this.run = 4;
                break;
            case 3:
                this.vz = -10;
                this.mvy = this.vy = 3;
                this.vx = (Math.random() * 1 + 2);;
                this.hit = 1;
                this.run = 6;
                break;
            case 4:
                this.vz = -5;
                this.mvy = this.vy = 1;
                this.swing = this.vx = (Math.random() * 1 + 2);;
                this.hit = 1;
                this.run = 4;
                break;
        }
        console.log(this.hittype, this.balltype);
        DrawLbl(mGame.mTex_fonts[this.bNo + 1], '' + this.run, (this.bNo > 3 ? 90 : 0) - 144 + 38 * (this.bNo - 1), -265, CLR_WHT, 30);
        mGame.Sphere.children[this.bNo - 1].material.color.setHex(0x4be102);
        mGame.Offer.forEach(element => { element.visible = false; });
        mGame.amazone.visible = false;
        // DrawLbl(mGame.mTex_fonts[1], '' + this.run, 0, -120, CLR_WHT, 88);
        this.anim = 1;
        if (this.run == 6) {
            DrawTexture(mGame.run_6, 0, -140, 256 * .8, 256 * .8);
            DrawLbl(mGame.mTex_fonts[0], ' ', 0, -120, CLR_WHT, 88);
        } else if (this.run == 4) {
            DrawTexture(mGame.run_4, 0, -140, 256 * .8, 256 * .8);
            DrawLbl(mGame.mTex_fonts[0], ' ', 0, -120, CLR_WHT, 88);
        } else {
            // DrawLbl(mGame.mTex_fonts[0], '' + this.run, 0, -120, CLR_WHT, 88);
        }


        this.runArray[this.bNo - 1] = this.run;
        var total = 0;
        for (let i = 0; i < this.runArray.length; i++) {
            total += this.runArray[i];

        }
        DrawLbl(mGame.mTex_fonts[8], 'SCORE: ' + total, 0, -320, CLR_WHT, 28);
        mGame.myAudiohappy.currentTime = 0;
        mGame.myAudiohappy.play();
        this.setScore();
        this.bathit++;
    }
    tapScr(type) {
        if (this.start < 3 && type == 2 && mGame.counter > 50) {
            if (this.start == 2) {
                this.status = 1;
                mGame.mTex_hand.visible = false;
                mGame.mTex_fonts[0].visible = false;
            }
            this.start++;
        }
        if (type == 0 && this.ball.position.z > 5 && this.tap == 0) {
            if (this.ball.position.z > 10 && this.firtBall == 0) {
                this.status = 2;
                this.firtBall = 1;
                mGame.tapIcon.visible = false;
                mGame.mTex_fonts[10].visible = false;
            }
            this.tap = 1;
        }

    }
}

class Game {
    constructor() {
        this.init();
    }
    init() {
        const game = this;
        this.counter = 0;
        this.isResize = 0;
        this.mTex_fonts = Array(11);
        this.mTex_font2 = Array(5);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x3a81b5);
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 100, 420);//30

        this.camera.lookAt(new THREE.Vector3(0, 20, 0));
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.gameUI = new ThreeUI(this.renderer.domElement, 720);
        this.clock = new THREE.Clock();
        this.coords = new THREE.Vector2();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.mSel = 0;

        var textureLoader = new THREE.TextureLoader();
        var texture_ground = loadTexture(GROUND_64);
        var texture_stadium = loadTexture(STADIUM_64);
        var texture_hit = loadTexture(HIT_64);
        var texture_pitch = loadTexture(PITCH_64);
        var texture_stump = loadTexture(STUMP_SPRITE_64);
        var texture_stump2 = loadTexture(STUMP2_SPRITE_64);
        var texture_player = loadTexture(PLAYER0_64);
        var texture_player1 = loadTexture(PLAYER1_64);
        var texture_bowler = loadTexture(BOWLER_64);//loadTexture("assets/bowler.png");
        var texture_balltex = loadTexture(BALLTEX_64);
        var texture_citi = loadTexture(LOGOCITI_64);

        texture_ground.wrapS = THREE.RepeatWrapping; texture_ground.wrapT = THREE.RepeatWrapping; texture_ground.repeat.set(8, 8);
        this.Ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(572, 572, 1, 1), new THREE.MeshBasicMaterial({ map: texture_ground }));
        this.Ground.rotation.set(-Math.PI * .5, 0, 0);
        this.scene.add(this.Ground);
        var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture_stadium });

        this.sPublic = new THREE.Mesh(new THREE.CylinderGeometry(456, 266, 220, 16, .5, true, Math.PI * .4, Math.PI * 1.2), material);
        this.scene.add(this.sPublic);
        this.sPublic.position.set(0, 108, 0);


        var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture_citi });
        texture_citi.wrapS = THREE.RepeatWrapping; texture_citi.wrapT = THREE.RepeatWrapping; texture_citi.repeat.set(24, 1);
        this.citi = new THREE.Mesh(new THREE.CylinderGeometry(266, 266, 20, 16, .5, true, Math.PI * .4, Math.PI * 1.2), material);
        this.scene.add(this.citi);
        this.citi2 = this.citi.clone();
        // this.citi.position.set(0, 108, 0);
        this.citi.position.set(0, 10, 1);



        this.citi2.position.set(0, 80, -60);
        this.scene.add(this.citi2);
        var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture_hit });
        var geometry = new THREE.CylinderGeometry(256, 266, 120, 16, .5, true, Math.PI * .87, Math.PI * .26);
        this.brand = new THREE.Mesh(geometry, material);
        this.scene.add(this.brand);
        this.brand.position.set(0, 78, 10);
        var material = new THREE.MeshBasicMaterial({ map: texture_pitch });
        this.pitch = new THREE.Mesh(new THREE.PlaneBufferGeometry(70, 280, 1, 1), material);
        this.scene.add(this.pitch);
        this.pitch.rotation.set(-Math.PI * .5, 0, 0);
        this.pitch.position.set(0, .1, 110);
        this.Sphere = new THREE.Group();
        // var spherea = new THREE.SphereGeometry(10, 8, 8);
        var spherea = new THREE.CircleGeometry(10, 128);
        for (let i = 0; i < 6; i++) {
            var m3d_ball = new THREE.Mesh(spherea, new THREE.MeshLambertMaterial({ color: 0x1b5173 }));
            this.Sphere.add(m3d_ball);
            m3d_ball.position.set((i > 2 ? 56 : 0) - 90 + i * 24, 154, -220);
        }
        this.scene.add(this.Sphere);
        this.Sphere.children[0].material.color.setHex(0x4be102);
        this.planStamp = Array(2);
        this.planStamp[0] = TexSingle(texture_stump2, 1, 1, 1, 40);
        this.planStamp[1] = TexSingle(texture_stump, 2, 1, 2, 30);
        this.scene.add(this.planStamp[0].mBody);
        this.scene.add(this.planStamp[1].mBody);
        this.planStamp[0].mBody.position.set(5, 17, 260);
        this.planStamp[1].mBody.position.set(0, 15, -20);
        var scl = 1;
        this.planStamp[0].mBody.scale.set(scl * .7, scl * .9, scl);
        this.planStamp[1].mBody.scale.set(scl * .7, scl, scl);

        var batsman = TexSingle(texture_player, 8, 8, 64, 36);
        this.scene.add(batsman.mBody);
        batsman.mBody.position.set(0, 40, 225);
        scl = 2.8;
        batsman.mBody.scale.set(scl, scl, scl);

        var batsman1 = TexSingle(texture_player1, 8, 8, 64, 36);
        this.scene.add(batsman1.mBody);
        batsman1.mBody.position.set(0, 40, 225);
        batsman1.mBody.scale.set(scl, scl, scl);
        batsman1.mBody.visible = true;

        this.confetti = new ExplosionConfetti({
            rate: 10, // percent of explosion in every tick - smaller is fewer - be careful, larger than 10 may crash your browser!
            amount: 200, // max amount particle of an explosion
            radius: 800, // max radius of an explosion
            areaWidth: 100, // width of the area
            areaHeight: 100, // height of the area
            fallingHeight: 50, // start exploding from Y position
            fallingSpeed: .51, // max falling speed
            colors: [0xffffff, 0xff0000, 0xffff00] // random colors
        });
        this.scene.add(this.confetti.object);

        var geometry = new THREE.CircleGeometry(5, 32);
        var pointsMaterial = new THREE.PointsMaterial({ color: 0x555555, opacity: 0.5, transparent: true });
        var shadow = new THREE.Mesh(geometry, pointsMaterial);
        // this.scene.add(shadow);
        shadow.rotation.set(Math.PI * .3, 0, 0);

        var bowler = TexSingle(texture_bowler, 8, 8, 64, 80);
        this.scene.add(bowler.mBody);
        bowler.mBody.position.set(18, 21, -0);
        scl = 2.2;
        bowler.mBody.scale.set(scl, scl, scl);
        var spherea = new THREE.SphereGeometry(2.0, 16, 16);
        var ball = new THREE.Mesh(spherea, new THREE.MeshLambertMaterial({ map: texture_balltex }));
        this.scene.add(ball);
        this.mBall = new Ball(ball, batsman, batsman1, bowler, shadow);
        this.myAudiohappy = loadSound("HAPPY_MP3", HAPPY_MP3);//document.getElementById("myAudiohappy");
        this.myAudiosad = loadSound("SAD_MP3", SAD_MP3);//document.getElementById("myAudiosad");
        this.myAudiobg = loadSound("BG_MP3", BG_MP3);//document.getElementById("myAudiobg");
        this.myAudiobg.loop = true;



        // var mySound = new sound("assets/crowd-sad.mp3");


        // AssetLoader.add.webFont('myfont', 'font.css');
        AssetLoader.add.image64('HAND_64', HAND_64);
        AssetLoader.add.image64('START_64', START_64);
        AssetLoader.add.image64('TITLE_64', TITLE_64);
        AssetLoader.add.image64('LOGO_64', LOGO_64);
        AssetLoader.add.image64('OFFER0_64', OFFER0_64);
        AssetLoader.add.image64('OFFER1_64', OFFER1_64);
        AssetLoader.add.image64('OFFER2_64', OFFER2_64);
        AssetLoader.add.image64('OFFER3_64', OFFER3_64);
        AssetLoader.add.image64('OFFER4_64', OFFER4_64);
        AssetLoader.add.image64('OFFER5_64', OFFER5_64);
        AssetLoader.add.image64('RESULT_64', RESULT_64);
        AssetLoader.add.image64('REDC_64', REDC_64);
        AssetLoader.add.image64('REDG_64', REDG_64);
        AssetLoader.add.image64('BLUEC_64', BLUEC_64);
        AssetLoader.add.image64('GETOFFER_64', GETOFFER_64);
        AssetLoader.add.image64('APPLY_64', APPLY_64);
        AssetLoader.add.image64('PLAYTEXT_64', PLAYTEXT_64);
        AssetLoader.add.image64('PRESENTS_64', PRESENTS_64);
        AssetLoader.add.image64('RUN6_64', RUN6_64);
        AssetLoader.add.image64('RUN4_64', RUN4_64);
        AssetLoader.add.image64('TAP_ICON_64', TAP_ICON_64);
        AssetLoader.add.image64('AMAZONE_64', AMAZONE_64);
        this.rect = loadUIRect(game.gameUI, 0, 0, 720 * 3, 720, '#ffffff');
        this.rect.visible = true;

        AssetLoader.progressListener = function (progress) { };
        AssetLoader.load(function () {
            game.rect.alpha = .8;
            game.mTex_hand = loadUI(game.gameUI, 'HAND_64', 0, 200, 0);
            game.result = loadUI(game.gameUI, 'RESULT_64', 0, 0, 0);
            game.logo = loadUI(game.gameUI, 'LOGO_64', 0, -160, 0);
            game.title = loadUI(game.gameUI, 'TITLE_64', 0, 200, 0);
            game.start = loadUI(game.gameUI, 'START_64', 0, 200, 0);
            game.getoffer = loadUI(game.gameUI, 'GETOFFER_64', 0, 200, 0);
            game.apply = loadUI(game.gameUI, 'APPLY_64', 0, 200, 0);
            game.playtext = loadUI(game.gameUI, 'PLAYTEXT_64', 0, 200, 0);
            game.presents = loadUI(game.gameUI, 'PRESENTS_64', 0, 200, 0);
            game.run_6 = loadUI(game.gameUI, 'RUN6_64', 0, 200, 0);
            game.run_4 = loadUI(game.gameUI, 'RUN4_64', 0, 200, 0);
            game.tapIcon = loadUI(game.gameUI, 'TAP_ICON_64', 0, 200, 0);
            game.amazone = loadUI(game.gameUI, 'AMAZONE_64', 0, 200, 0);
            game.redC = [];
            game.redG = [];
            game.blueC = [];
            for (let i = 0; i < 6; i++) {
                game.redC.push(loadUI(game.gameUI, 'REDC_64', 0, -160, 0));
                game.redG.push(loadUI(game.gameUI, 'REDG_64', 0, -160, 0));
                game.blueC.push(loadUI(game.gameUI, 'BLUEC_64', 0, -160, 0));

            }
            game.Offer = [];
            for (var i = 0; i < 6; i++) {
                game.Offer.push(loadUI(game.gameUI, 'OFFER' + i + '_64', 0, -160, 0));
            }

            for (var i = 0; i < game.mTex_fonts.length; i++) {
                game.mTex_fonts[i] = createTexts(game.gameUI, "100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "myfont");
            }
            for (var i = 0; i < game.mTex_font2.length; i++) {
                game.mTex_font2[i] = createTexts(game.gameUI, "100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "myfont2");
            }
            game.rect2 = loadUIRect(game.gameUI, 0, 336, 120, 2, CLR_BLUE);
            game.setScreen(GAMEMENU);
        });

        this.helper = new CannonHelper(this.scene);
        this.helper.addLights(this.renderer);

        document.addEventListener('keydown', dealWithKeyboard);

        //if (isMobile.any()) {
        document.addEventListener('touchstart', e => { this.touchEvent(e, 0, 1); });
        document.addEventListener('touchmove', e => { this.touchEvent(e, 1, 1); });
        document.addEventListener('touchend', e => { this.touchEvent(e, 2, 1); });
        // } else {
        document.addEventListener('mousedown', e => { this.touchEvent(e, 0, 0); });
        document.addEventListener('mousemove', e => { this.touchEvent(e, 1, 0); });
        document.addEventListener('mouseup', e => { this.touchEvent(e, 2, 0); });
        // }
        window.addEventListener('resize', this.onWindowResize, false);
        this.animate();
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
        var scale = this.gameUI.height / this.gameUI.gameCanvas.getBoundingClientRect().height;
        var CANVAS_HEIGHT = window.innerHeight;
        var CANVAS_WIDTH = window.innerWidth;
        if (e.touches != null) {
            if (e.touches.length > 0) {
                this.mouse.x = (e.touches[0].pageX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(e.touches[0].pageY / window.innerHeight) * 2 + 1;

                this.coords.x = (e.touches[0].pageX - (window.innerWidth - this.gameUI.gameCanvas.getBoundingClientRect().width) / 2) * scale;
                this.coords.y = e.touches[0].pageY * scale;
            }
            console.log("e.touches.length = " + e.touches.length)
        } else {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            this.coords = { x: e.clientX, y: e.clientY };
            this.coords.x = (e.clientX - (window.innerWidth - this.gameUI.gameCanvas.getBoundingClientRect().width) / 2) * scale;
            this.coords.y = e.clientY * scale;

            var elem = this.renderer.domElement,
                boundingRect = elem.getBoundingClientRect(),
                x = (event.clientX - boundingRect.left) * (elem.width / boundingRect.width),
                y = (event.clientY - boundingRect.top) * (elem.height / boundingRect.height);
            this.mouse.x = (x / CANVAS_WIDTH) * 2 - 1;
            this.mouse.y = -(y / CANVAS_HEIGHT) * 2 + 1;
        }
        this.raycaster.setFromCamera(this.mouse, this.camera);
        var bounds;
        if (this.start === undefined) {
            return;
        }

        switch (GameScreen) {
            case GAMEMENU:
            case GAMERESULT:
                this.mSel = 0;
                bounds = this.start.getBounds();
                if (ThreeUI.isInBoundingBox(this.coords.x, this.coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                    this.mSel = 1;
                }
                bounds = this.getoffer.getBounds();
                if (GameScreen == GAMERESULT && ThreeUI.isInBoundingBox(this.coords.x, this.coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                    this.mSel = 2;
                }
                bounds = this.apply.getBounds();
                if (GameScreen == GAMERESULT && ThreeUI.isInBoundingBox(this.coords.x, this.coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                    this.mSel = 3;
                }
                if (type == 2) {
                    switch (this.mSel) {
                        case 1:
                            this.setScreen(GAMEPLAY);
                            break;
                        case 2: case 3:
                            console.log('case 2');
                            callAds();
                            break;
                    }
                    this.mSel = 0;
                }
                break;
            case GAMEPLAY:
                this.mBall.tapScr(type);
                break;
        }


    }
    animate() {
        const game = this;
        this.delta = this.clock.getDelta();
        requestAnimationFrame(function () { game.animate(); });
        this.renderer.render(this.scene, this.camera);
        this.gameUI.render(this.renderer);
        this.counter++;

        if (this.start === undefined) {
            return;
        }

        switch (GameScreen) {
            case GAMEMENU:
                var scl = .6 + (this.counter % 10) * .01;
                this.rect.visible = true;
                DrawTexture(this.logo, 0, -260, 175 * scl, 175 * scl);
                scl = .6;
                DrawTexture(this.logo, 0, -260, 175 * scl, 175 * scl);
                scl = .6;
                DrawTexture(this.title, 0, -80, 432 * scl, 232 * scl);
                DrawTexture(this.start, 0, 220, 328 * scl, 64 * scl);
                scl = 1;
                // DrawTexture(this.playtext, 0, 100, 256 * scl, 64 * scl);
                // scl = .8;
                // DrawTexture(this.presents, 0, -170, 91 * scl, 18 * scl);
                this.camera.position.set(0, 200, 520);//30

                DrawTexture(this.start, 0, 220, 328 * (this.mSel == 1 ? .65 : .6), 64 * (this.mSel == 1 ? .65 : .6));

                DrawLbl(this.mTex_font2[0], 'Presents', 0, -162, CLR_BLUE, 20);
                DrawLbl(this.mTex_font2[1], 'Play your best shots', 0, 84, CLR_BLUE, 20);
                DrawLbl(this.mTex_font2[2], 'to unlock amazing offers', 0, 110, CLR_BLUE, 20);
                DrawLbl(this.mTex_font2[3], 'on Citi Cards', 0, 136, CLR_BLUE, 20);


                break;
            case GAMERESULT:
                this.drawResult();
                break;
            case GAMEPLAY:

                if (this.mBall.start == 1) {
                    DrawLbl(this.mTex_fonts[0], 'GOOD LUCK', 0, -150, CLR_WHT, 30);
                    this.mTex_fonts[1].visible = false;
                }
                if (this.mBall.start == 2) {
                    DrawLbl(this.mTex_fonts[0], 'TAP TO START', 0, -150, CLR_WHT, 30);
                    this.mTex_fonts[1].visible = false;
                    DrawTexture(this.mTex_hand, 0, -130, 132 * .4, 183 * .4);
                    this.mTex_fonts[10].visible = false;
                    this.mTex_hand.visible = false;
                }



                // this.mBall.setScore();

                if (this.camera.position.z > 420 && this.mBall.start == 0) {
                    this.camera.position.z -= 2;
                    this.camera.position.y -= 2;
                    this.logo.y -= 2.5;
                    this.mTex_fonts[0].y -= 2.5;
                    this.mTex_fonts[1].y -= 2.5;
                    this.mTex_fonts[10].y -= 2.5;
                    this.mTex_hand.y -= 2.5;

                    if (this.rect.alpha > .04) {
                        this.rect.alpha -= .02;
                    } else {
                        this.rect.visible = false;
                    }
                    for (var i = 0; i < 6; i++) {
                        mGame.blueC[i].y -= 2.5;
                    }
                }
                this.mBall.update(this.delta * 1000);
                break;
        }
        if (this.isResize > 0) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.gameUI.resize();
            this.isResize--;
        }
    }
    setScreen(scr) {
        this.logo.visible = this.title.visible = this.start.visible = this.rect.visible = false;
        this.mTex_fonts.forEach(element => { element.visible = false; });
        this.mTex_font2.forEach(element => { element.visible = false; });
        this.Offer.forEach(element => { element.visible = false; });
        this.redC.forEach(element => { element.visible = false; });
        this.redG.forEach(element => { element.visible = false; });
        this.blueC.forEach(element => { element.visible = false; });
        this.apply.visible = this.amazone.visible = false;
        this.playtext.visible = this.result.visible = this.getoffer.visible = this.brand.visible = false;


        this.planStamp.forEach(element => { element.mBody.visible = true; });
        this.rect2.visible = this.tapIcon.visible = this.run_6.visible = this.presents.visible = this.Sphere.visible = false;
        this.run_4.visible = false;
        this.sPublic.visible = this.pitch.visible = this.Ground.visible = true;
        var scl = .6;
        GameScreen = scr;

        switch (GameScreen) {
            case GAMEMENU:
                scl = .6;
                this.rect.visible = true;
                DrawTexture(this.logo, 0, -260, 175 * scl, 175 * scl);
                DrawTexture(this.title, 0, -80, 432 * scl, 232 * scl);
                DrawTexture(this.start, 0, 220, 328 * scl, 64 * scl);
                scl = 1;
                // DrawTexture(this.playtext, 0, 100, 256 * scl, 64 * scl);
                // scl = .8;
                // DrawTexture(this.presents, 0, -170, 91 * scl, 18 * scl);
                this.camera.position.set(0, 200, 520);//30
                break;
            case GAMEPLAY:
                this.rect.visible = true;
                this.camera.position.set(0, 200, 520);//30
                this.sPublic.visible = this.pitch.visible = this.Ground.visible = true;
                this.planStamp.forEach(element => { element.mBody.visible = true; });
                this.brand.visible = true;
                this.Sphere.visible = false;
                var scl = .4 + rx;
                DrawTexture(this.logo, 0, -262 + 125, 175 * scl, 175 * scl);
                DrawLbl(this.mTex_fonts[0], 'TAP TO', 0, -180 + 125, CLR_WHT, 30);
                DrawLbl(this.mTex_fonts[1], 'HIT THE SHOTS', 0, -140 + 125, CLR_WHT, 30);

                DrawTexture(this.mTex_hand, -57, -96 + 125, 32 * .7, 42 * .7);
                DrawLbl(this.mTex_fonts[10], 'Tap to continue', 10, -86 + 125, CLR_WHT, 16);

                this.counter = 0;
                for (let i = 0; i < this.Sphere.children.length; i++) {
                    this.Sphere.children[i].material.color.setHex(0x1b5173);
                }
                for (var i = 0; i < 6; i++) {
                    DrawLbl(this.mTex_fonts[i + 2], ' ', (i > 2 ? 90 : 0) - 144 + 38 * i, -265, CLR_WHT, 30);
                }
                scl = 1;
                for (let i = 0; i < this.Offer.length; i++) {
                    DrawTexture(this.Offer[i], 0, -150, 188 * scl, 135 * scl);
                }
                this.Offer.forEach(element => { element.visible = false; });
                this.mBall.gameReset();
                var mx = 100, zoom = 0;
                for (var i = 0; i < 6; i++) {
                    var x = ((i > 2 ? (90 + (zoom * (16 / mx))) : 0) - 144 - (zoom * (26 / mx))) + (38 + (zoom * (7 / mx))) * i;
                    var y = -266 - (zoom * ((14 + 3) / mx));
                    DrawTexture(mGame.blueC[i], x, y - 10 + 125, 32 * 1.1, 32 * 1.1);

                }
                break;
            case GAMERESULT:
                this.rect.visible = true;
                this.rect.alpha = .8;
                this.sPublic.visible = this.pitch.visible = this.Ground.visible = true;
                this.result.tint = '#ff0000';
                scl = .6;
                DrawTexture(this.logo, 0, -250, 175 * scl, 175 * scl);
                scl = 1;
                DrawLbl(this.mTex_fonts[6], 'YOUR SCORE', 0, -100, CLR_BLUE, 22);
                DrawLbl(this.mTex_fonts[7], '19 RUN AND 0 OFFERS', 0, -50, CLR_BLUE, 28);
                DrawTexture(this.start, 0, 315, 432 * (this.mSel == 1 ? .56 : .5), 86 * (this.mSel == 1 ? .56 : .5));
                this.start.alpha = .01;
                DrawLbl(this.mTex_fonts[10], 'PLAY AGAIN', 0, 330, CLR_BLUE, 24);
                break;
        }
    }
    drawResult() {
        var ofr = 0;
        for (let i = 0; i < this.redC.length; i++) {
            if (this.mBall.runArray[i] > 0) {
                ofr++;
            }
        }

        var runs = 0;
        var oy = 0;
        var mx = 0;
        var diff = 48;
        if (ofr > 4) {
            oy = -110;
            mx = -32;
            diff = 40;
        }



        scl = .38;
        DrawTexture(this.result, 0, -30, 913 * scl, 1309 * scl);
        var scl = .6;
        DrawTexture(this.logo, 0, (ofr > 4 ? -40 : 0) - 260, 175 * scl, 175 * scl);
        scl = 1;
        for (let i = 0; i < this.redC.length; i++) {
            this.redG[i].visible = false;
            if (this.mBall.runArray[i] == 0) {
                DrawTexture(this.redC[i], mx + (i > 2 ? mx * mx * .1 : 0) - 120 + i * diff, (oy * 1.24) - 170, 32 * scl, 32 * scl);
            } else {
                DrawTexture(this.redG[i], mx + (i > 2 ? mx * mx * .1 : 0) - 120 + i * diff, (oy * 1.24) - 170, 32 * scl, 32 * scl);

            }
            runs += this.mBall.runArray[i];
            DrawLbl(this.mTex_fonts[i], '' + this.mBall.runArray[i], mx + (i > 2 ? mx * mx * .1 : 0) - 120 + i * diff, (oy * 1.24) - 160, CLR_WHT, 30);
        }
        DrawLbl(this.mTex_fonts[6], 'YOUR SCORE', 0, oy - 105, CLR_BLUE, 22);
        DrawLbl(this.mTex_fonts[7], 'RUNS AND    OFFERS', 10, oy - 70, CLR_BLUE, 28);
        DrawLbl(this.mTex_fonts[8], '' + runs, -120 - (runs > 9 ? 10 : 0), oy - 70, CLR_RED, 28);
        DrawLbl(this.mTex_fonts[9], '' + ofr, 25, oy - 70, CLR_RED, 28);
        scl = .42;// + rx * .1;

        for (let i = 0; i < this.Offer.length && i < ofr; i++) {
            DrawTexture(this.Offer[i], -82 + (i % 2) * (164), oy + Math.floor(i / 2) * (94), 376 * scl, 214 * scl);
        }
        // DrawTexture(this.getoffer, -90, 260, 435 * (this.mSel == 2 ? .4 : .38), 128 * (this.mSel == 2 ? .4 : .38));
        DrawTexture(this.apply, 0, 260, 656 * (this.mSel == 3 ? .4 : .38), 128 * (this.mSel == 3 ? .4 : .38));
        DrawTexture(this.rect2, 0, 336, 120, 2);
    }
}

class CannonHelper {
    constructor(scene) {
        this.scene = scene;
    }
    addLights(renderer) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        const ambient = new THREE.AmbientLight(0xeeeeee, .9);
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


    }
}
