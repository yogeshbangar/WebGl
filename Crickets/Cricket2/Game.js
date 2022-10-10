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
    let image = new Image();
    image.src = str;
    const texture = new THREE.Texture();
    texture.image = image;
    image.onload = function () { texture.needsUpdate = true; };
    return texture;
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
    constructor(_ball, _batsman, _bowler) {
        this.ball = _ball;
        this.batsman = _batsman;
        this.batsman.annie.reset(0);
        this.bowler = _bowler;
        this.gameReset();
    }
    gameReset() {
        this.bNo = 0;
        this.runArray = [0, 0, 0, 0, 0, 0];
        this.ballset();
        this.start = 0;
        console.log("reast");
    }
    ballset() {
        this.bNo++;
        this.ball.position.set(24, 48, 1);
        this.ball.rotation.set(Math.PI * this.rx, 0, Math.PI * .45);
        this.batsman.annie.reset(0);
        this.bowler.annie.reset(0);
        this.status = 0;
        this.zoom = 0;
        this.hit = 0;
        this.tap = 0;
        this.run = 0;
        this.balltype = random(0, 2);
        this.hittype = random(0, 3);
        this.balltype = 0;
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
                this.vx = .3;
                this.swing = -.2;
                this.tappa = -.065;
                break;
            case 1:
                this.mvy = 4;
                this.vy = 0;
                this.vz = 3;
                this.vx = .25;
                this.swing = -.1;
                this.tappa = -.07;
                break;
        }
        this.ball.visible = false;
    }
    update(delta) {
        if (this.status >= 1) {
            if (this.bowler.annie.currentTile < this.bowler.annie.numberOfTiles - 118) {
                this.bowler.annie.update(delta);
                if (this.bowler.annie.currentTile > 91 && this.bowler.annie.currentTile < 100) {
                    this.status = 2;
                    this.ball.visible = true;
                }
            }
        }
        // this.batsman.annie.reset(sx);
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
                    console.log("this.vx " + this.status);
                }
                this.status = 3;
            }
            if (this.ball.position.z > 145 && this.ball.position.z < 230) {
                if (this.ball.position.z > 220 && this.tap == 2) {
                    this.setHit();
                    // this.status = 0;
                }
                if (this.ball.position.z > 145 && this.tap == 1 && this.ball.position.z < 150) {
                    this.hit = 1;
                    this.tap = 2;
                    console.log("this.ball.position.z = " + this.ball.position.z);
                }
                if (this.ball.position.z > 155 && this.tap == 1) {
                    this.hit = 1;
                    this.miss = 1;
                    console.log("Miss = " + this.ball.position.z);
                }
            }
            this.ball.rotation.set(Math.PI * this.rx, 0, Math.PI * .45);
            if (this.hit == 1) {

                if (this.batsman.annie.currentTile < this.batsman.annie.numberOfTiles - 29) {//22
                    this.batsman.annie.update(delta);

                } else {
                    if (this.ball.position.z < -10) {
                        this.batsman.annie.reset(0);
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
                if (this.ball.position.z < 320) {
                    mGame.Offer.forEach(element => { element.visible = false; });
                    DrawLbl(mGame.mTex_fonts[0], '' + this.run, 0, -120, CLR_WHT, 88);
                    DrawLbl(mGame.mTex_fonts[this.bNo + 1], '' + this.run, (this.bNo > 3 ? 90 : 0) - 144 + 38 * (this.bNo - 1), -265, CLR_WHT, 30);
                    mGame.Sphere.children[this.bNo - 1].material.color.setHex(0x9f2222);
                } else {
                    DrawLbl(mGame.mTex_fonts[0], 'Try Again', 0, -130, CLR_WHT, 48);
                }
            }
            if (this.anim > 0) {
                this.anim++;
                if (this.anim > 30 && this.anim < 50) {
                    this.zoom += 5;
                    mGame.camera.position.z = 420 - this.zoom;
                }
                if (this.anim >= 230 && this.anim < 250) {
                    this.zoom -= 5;
                    mGame.camera.position.z = 420 - this.zoom;
                }
                var mx = 100;
                for (var i = 0; i < 6 && i < this.bNo; i++) {
                    DrawLbl(mGame.mTex_fonts[i + 2], this.runArray[i] + "", ((i > 2 ? (90 + (this.zoom * (15 / mx))) : 0) - 144 - (this.zoom * (25 / mx))) + (38 + (this.zoom * (7 / mx))) * i, -265 - (this.zoom * (14 / mx)), CLR_WHT, 30);
                }
                if (this.anim > 80) {
                    mGame.mTex_fonts[0].visible = false;
                    mGame.run_6.visible = false;
                    mGame.Offer[Math.abs(this.bNo - 1) % 4].visible = true;
                }
                if (this.anim > 250) {
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
                this.vz = -3;
                this.mvy = this.vy = .1;
                this.vx = -(Math.random() * 3 + 2);;
                this.hit = 1;
                this.run = 4;
                break;
        }
        console.log(this.hittype, this.balltype);
        DrawLbl(mGame.mTex_fonts[this.bNo + 1], '' + this.run, (this.bNo > 3 ? 90 : 0) - 144 + 38 * (this.bNo - 1), -265, CLR_WHT, 30);
        mGame.Sphere.children[this.bNo - 1].material.color.setHex(0x4be102);
        mGame.Offer.forEach(element => { element.visible = false; });
        this.anim = 1;
        if (this.run == 6) {
            DrawTexture(mGame.run_6, 0, -120, 256 * 1, 256 * 1);
            DrawLbl(mGame.mTex_fonts[0], ' ', 0, -120, CLR_WHT, 88);
        } else {
            DrawLbl(mGame.mTex_fonts[0], '' + this.run, 0, -120, CLR_WHT, 88);
        }


        this.runArray[this.bNo - 1] = this.run;
        var total = 0;
        for (let i = 0; i < this.runArray.length; i++) {
            total += this.runArray[i];

        }
        DrawLbl(mGame.mTex_fonts[1], 'SCORE :' + total, 0, -320, CLR_WHT, 28);
    }
    tapScr(type) {
        console.log(this.status == 0, type == 0, mGame.counter > 30, this.bNo <= 6, this.start);
        if (this.start < 4 && type == 2 && mGame.counter > 50) {
            if (this.start == 3) {
                this.status = 1;
                mGame.mTex_hand.visible = false;
                mGame.mTex_fonts[0].visible = false;
            }
            this.start++;
        }
        if (type == 0 && this.ball.position.z > 50 && this.tap == 0)
            this.tap = 1;
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
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0x8eb7d6);
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

		var texture = loadTexture("assets/ground.jpg");
		texture.wrapS = THREE.RepeatWrapping; texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(8, 8);
		this.Ground = new THREE.Mesh(new THREE.PlaneBufferGeometry(572, 572, 1, 1), new THREE.MeshBasicMaterial({ map: texture }));
		this.Ground.rotation.set(-Math.PI * .5, 0, 0);
		this.scene.add(this.Ground);
		var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: loadTexture('assets/stadium.jpg') });
		// var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture });
		this.sPublic = new THREE.Mesh(new THREE.CylinderGeometry(456, 266, 220, 16, .5, true, Math.PI * .4, Math.PI * 1.2), material);
		this.scene.add(this.sPublic);
		this.sPublic.position.set(0, 108, 0);


		//var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: false, map: loadTexture('assets/hit.png'), blending: THREE.CustomBlending, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor });
		var material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: loadTexture('assets/hit.png') });
		var geometry = new THREE.CylinderGeometry(256, 266, 120, 16, .5, true, Math.PI * .87, Math.PI * .26);
		this.brand = new THREE.Mesh(geometry, material);
		this.scene.add(this.brand);
		this.brand.position.set(0, 78, 10);

		var texture = loadTexture("assets/pitch.png");
		var material = new THREE.MeshBasicMaterial({ map: texture });
		this.pitch = new THREE.Mesh(new THREE.PlaneBufferGeometry(70, 280, 1, 1), material);
		this.scene.add(this.pitch);
		this.pitch.rotation.set(-Math.PI * .5, 0, 0);
		this.pitch.position.set(0, .1, 110);


		this.Sphere = new THREE.Group();
		var spherea = new THREE.SphereGeometry(10, 8, 8);
		for (let i = 0; i < 6; i++) {
			var m3d_ball = new THREE.Mesh(spherea, new THREE.MeshLambertMaterial({ color: 0x1b5173 }));
			this.Sphere.add(m3d_ball);
			m3d_ball.position.set((i > 2 ? 56 : 0) - 90 + i * 24, 154, -220);
		}
		this.scene.add(this.Sphere);

		this.Sphere.children[0].material.color.setHex(0x4be102);

		this.planStamp = Array(2);
		this.planStamp[0] = TexSingle(loadTexture("assets/stump_sprite.png"), 2, 1, 2, 40);
		this.planStamp[1] = TexSingle(loadTexture("assets/stump_sprite.png"), 2, 1, 2, 30);
		this.scene.add(this.planStamp[0].mBody);
		this.scene.add(this.planStamp[1].mBody);
		this.planStamp[0].mBody.position.set(0, 17, 260);
		this.planStamp[1].mBody.position.set(0, 15, -10);
		var scl = .8;
		this.planStamp[0].mBody.scale.set(scl, scl, scl);
		this.planStamp[1].mBody.scale.set(scl, scl, scl);


		var batsman = TexSingle(loadTexture("assets/player.png"), 8, 8, 64, 40);
		this.scene.add(batsman.mBody);
		batsman.mBody.position.set(0, 40, 225);
		scl = 2.8;
		batsman.mBody.scale.set(scl, scl, scl);


		var bowler = TexSingle(loadTexture("assets/bowler.png"), 16, 16, 256, 40);
		this.scene.add(bowler.mBody);
		bowler.mBody.position.set(0, 27, -0);
		scl = 8;
		bowler.mBody.scale.set(scl, scl, scl);


		var spherea = new THREE.SphereGeometry(2.0, 16, 16);
		var ball = new THREE.Mesh(spherea, new THREE.MeshLambertMaterial({ map: loadTexture('assets/balltex.jpg') }));
		this.scene.add(ball);

		this.mBall = new Ball(ball, batsman, bowler);

		// AssetLoader.add.webFont('myfont', 'font.css');
		// AssetLoader.add.image64('CONT_64', CONT_64);
		// AssetLoader.add.image64('TEXT_64', TEXT_64);
		// AssetLoader.add.image64('DLOAD_64', DLOAD_64);
		AssetLoader.add.image('assets/hand.png');
		AssetLoader.add.image('assets/start.png');
		AssetLoader.add.image('assets/title.png');
		AssetLoader.add.image('assets/logo.png');

		AssetLoader.add.image('assets/offeramazon.png');
		AssetLoader.add.image('assets/offereasydiner.png');
		AssetLoader.add.image('assets/offerurban.png');
		AssetLoader.add.image('assets/offerzomato.png');
		AssetLoader.add.image('assets/result.png');
		AssetLoader.add.image('assets/redC.png');
		AssetLoader.add.image('assets/redG.png');
		AssetLoader.add.image('assets/getoffer.png');
		AssetLoader.add.image('assets/playtext.png');
		AssetLoader.add.image('assets/presents.png');
		AssetLoader.add.image('assets/6.png');
		AssetLoader.add.image('assets/tap-icon.png');
		this.rect = loadUIRect(game.gameUI, 0, 0, 720 * 3, 720, '#ffffff');
		this.rect.visible = true;

		AssetLoader.progressListener = function (progress) { };
		AssetLoader.load(function () {
			game.rect.alpha = .8;
			game.mTex_hand = loadUI(game.gameUI, 'assets/hand.png', 0, 200, 0);


			game.result = loadUI(game.gameUI, 'assets/result.png', 0, 0, 0);
			game.logo = loadUI(game.gameUI, 'assets/logo.png', 0, -160, 0);
			game.title = loadUI(game.gameUI, 'assets/title.png', 0, 200, 0);
			game.start = loadUI(game.gameUI, 'assets/start.png', 0, 200, 0);
			game.getoffer = loadUI(game.gameUI, 'assets/getoffer.png', 0, 200, 0);
			game.playtext = loadUI(game.gameUI, 'assets/playtext.png', 0, 200, 0);
			game.presents = loadUI(game.gameUI, 'assets/presents.png', 0, 200, 0);
			game.run_6 = loadUI(game.gameUI, 'assets/6.png', 0, 200, 0);
			game.tapIcon = loadUI(game.gameUI, 'assets/tap-icon.png', 0, 200, 0);

			game.redC = [];
			game.redG = [];
			for (let i = 0; i < 6; i++) {
				game.redC.push(loadUI(game.gameUI, 'assets/redC.png', 0, -160, 0));
				game.redG.push(loadUI(game.gameUI, 'assets/redG.png', 0, -160, 0));
			}
			game.Offer = [];
			game.Offer.push(loadUI(game.gameUI, 'assets/offeramazon.png', 0, -160, 0));
			game.Offer.push(loadUI(game.gameUI, 'assets/offereasydiner.png', 0, -160, 0));
			game.Offer.push(loadUI(game.gameUI, 'assets/offerurban.png', 0, -160, 0));
			game.Offer.push(loadUI(game.gameUI, 'assets/offerzomato.png', 0, -160, 0));



			game.mTex_text = loadUI(game.gameUI, 'TEXT_64', 0, -160, 0);
			for (var i = 0; i < game.mTex_fonts.length; i++) {
				game.mTex_fonts[i] = createTexts(game.gameUI, "100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "myfont");
			}
			game.setScreen(GAMEMENU);
		});

		this.helper = new CannonHelper(this.scene);
		this.helper.addLights(this.renderer);

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
				if (type == 2) {
					switch (this.mSel) {
						case 1:
							this.setScreen(GAMEPLAY);
							break;
						case 2:
							console.log('case 2');
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
				DrawTexture(this.start, 0, 220, 328 * (this.mSel == 1 ? .6 : .56), 64 * (this.mSel == 1 ? .6 : .56));
				break;
			case GAMERESULT:
				this.drawResult();
				break;
			case GAMEPLAY:
				if (this.mBall.start == 1) {
					DrawLbl(this.mTex_fonts[0], 'HIT AS MANY BOUNDRIES', 0, -160, CLR_WHT, 28);
					DrawLbl(this.mTex_fonts[1], 'AS YOU CAN', 0, -120, CLR_WHT, 28);
				}
				if (this.mBall.start == 2) {
					DrawLbl(this.mTex_fonts[0], 'GOOD LUCK', 0, -140, CLR_WHT, 37);
					this.mTex_fonts[1].visible = false;
				}
				if (this.mBall.start == 3) {
					DrawLbl(this.mTex_fonts[0], 'TAP TO START', 0, -170, CLR_WHT, 38);
					this.mTex_fonts[1].visible = false;
					DrawTexture(this.mTex_hand, 0, -110, 132 * .4, 183 * .4);
				}
				if (this.camera.position.z > 420 && this.mBall.start == 0) {
					this.camera.position.z -= 2;
					this.camera.position.y -= 2;
					this.logo.y -= 2.5;
					this.mTex_fonts[0].y -= 2.5;
					this.mTex_fonts[1].y -= 2.5;
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
		this.Offer.forEach(element => { element.visible = false; });
		this.redC.forEach(element => { element.visible = false; });
		this.redG.forEach(element => { element.visible = false; });
		this.playtext.visible = this.result.visible = this.getoffer.visible = this.brand.visible = false;


		this.planStamp.forEach(element => { element.mBody.visible = false; });
		this.tapIcon.visible = this.run_6.visible = this.presents.visible = this.Sphere.visible = false;
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
				scl = .8;
				DrawTexture(this.playtext, 0, 100, 281 * scl, 89 * scl);
				DrawTexture(this.presents, 0, -170, 91 * scl, 18 * scl);
				break;
			case GAMEPLAY:
				this.camera.position.set(0, 200, 520);//30
				this.sPublic.visible = this.pitch.visible = this.Ground.visible = true;
				this.planStamp.forEach(element => { element.mBody.visible = true; });
				this.brand.visible = true;
				this.Sphere.visible = true;
				var scl = .4 + rx;
				DrawTexture(this.logo, 0, -262 + 125, 175 * scl, 175 * scl);
				DrawLbl(this.mTex_fonts[0], 'TAP TO HIT', 0, -160 + 125, CLR_WHT, 32);
				DrawLbl(this.mTex_fonts[1], 'TIME YOUR SHOTS', 0, -120 + 125, CLR_WHT, 32);
				// DrawTexture(this.tapIcon, 0, 100, 128, 64);
				this.counter = 0;
				for (let i = 0; i < this.Sphere.children.length; i++) {
					this.Sphere.children[i].material.color.setHex(0x1b5173);

				}
				for (var i = 0; i < 6; i++) {
					DrawLbl(this.mTex_fonts[i + 2], ' ', (i > 2 ? 90 : 0) - 144 + 38 * i, -265, CLR_WHT, 30);
				}
				scl = 1;
				for (let i = 0; i < this.Offer.length; i++) {
					DrawTexture(this.Offer[i], 0, -160, 188 * scl, 135 * scl);
				}
				this.Offer.forEach(element => { element.visible = false; });
				this.mBall.gameReset();

				break;
			case GAMERESULT:
				this.rect.visible = true;
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
		var runs = 0;
		scl = .7;
		DrawTexture(this.result, 0, 0, 512 * scl, 622 * scl);
		var scl = .6;
		DrawTexture(this.logo, 0, -250, 175 * scl, 175 * scl);
		scl = 1;
		for (let i = 0; i < this.redC.length; i++) {
			this.redG[i].visible = false;
			if (this.mBall.runArray[i] == 0) {
				DrawTexture(this.redC[i], -120 + i * 48, -170, 32 * scl, 32 * scl);
			} else {
				DrawTexture(this.redG[i], -120 + i * 48, -170, 32 * scl, 32 * scl);
				ofr++;
			}
			runs += this.mBall.runArray[i];
			DrawLbl(this.mTex_fonts[i], '' + this.mBall.runArray[i], -120 + i * 48, -160, CLR_WHT, 30);
		}

		DrawLbl(this.mTex_fonts[6], 'YOUR SCORE', 0, -115, CLR_BLUE, 28);
		DrawLbl(this.mTex_fonts[7], 'RUN AND    OFFERS', 10, -80, CLR_BLUE, 32);
		DrawLbl(this.mTex_fonts[8], '' + runs, -130 - (runs > 9 ? 10 : 0), -80, CLR_RED, 32);
		DrawLbl(this.mTex_fonts[9], '' + ofr, 20, -80, CLR_RED, 32);
		scl = .82;// + rx * .1;
		for (let i = 0; i < this.Offer.length && i < ofr; i++) {
			DrawTexture(this.Offer[i], -80 + (i % 2) * (188 - 30), Math.floor(i / 2) * (115), 188 * scl, 135 * scl);
		}
		DrawTexture(this.getoffer, 0, 260, 328 * (this.mSel == 2 ? .6 : .56), 64 * (this.mSel == 2 ? .6 : .56));
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
