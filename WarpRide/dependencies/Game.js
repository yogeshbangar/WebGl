
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { AssetLoader } from './AssetLoader'
import ThreeUI from './three-ui/ThreeUI';
import { loadTexture, loadSound, loadUI, createTexts, DrawTexture, DrawLbl, loadUIRect, Rect2RectIntersection, cirCirCollition, CircRectsOverlap, upWithKeyboard, dealWithKeyboard, createColor, loadModel, keydown, isMobile, VAL } from './Basic'
import { Particle, aniparticle, setupScene, stars, particles } from './particle'
import ReactGA from 'react-ga';
//Multiplayer Changes
import store from '../../../store/store';
import MatchmakerService from '../../../service/matchmaker.service';
import { GAME_TYPES, ROOM_TYPES, GAME_STATES } from '../../pongGame/dependencies/SocketManager';
import { Avatar } from '../../../Scenes/avatarCreator/dependencies/avatar.js';
//Multiplayer Changes

function vertexShader() {
    return `
    varying vec2 vUv;
    void main() {
      vUv = (position.xy/2.0)+0.5;
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition;
    }
  `;
}
function fragmentShader() {
    return `
      varying vec2 vUv;
      uniform sampler2D tex1;
      uniform sampler2D tex2;
      uniform sampler2D tex3;
      uniform float factor;
      uniform float intensity;
      void main() {
        vec2 uv= vUv;
        float gamma = 1.5;
        vec4 texture1 = texture2D(tex1,vUv.xy);
        texture1.rgb = pow(texture1.rgb, vec3(1.0/gamma));
        vec4 texx = texture1+texture2D(tex2,vUv.xy)*2.2*intensity;
        texx = mix(texx,texture2D(tex3,vUv.xy),factor);
        // texx.g *=(intensity*1.7);
        gl_FragColor = texx;
      }
  `;
}

function simpleFragmentShader() {
    return `
      varying vec2 vUv;
      uniform sampler2D tex;
      void main() {
        vec2 uv= vUv;
        gl_FragColor = texture2D(tex,vUv);
      }
  `
}

function BlurHvs() {
    return `
        uniform float width;
        varying  vec2 blurTexCoords[11];
        void main() {
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition;
        vec2 uv = (position.xy/2.0)+vec2(0.5);
        //float height = 512.;
        float pixelSize = 1.0/width*1.;
            for(int i=-5;i<5;i++){
                blurTexCoords[i+5]=uv+vec2(pixelSize*float(i),0.0);
            }
        }
  `;
}

function BlurVvs() {
    return `
        uniform float height;
        varying  vec2 blurTexCoords[11];
        void main() {
            vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * modelViewPosition;
            vec2 uv = (position.xy/2.0)+vec2(0.5);
            //float height = 512.;
            float pixelSize = 1.0/height*1.;
            for(int i=-5;i<5;i++){
                blurTexCoords[i+5]=uv+vec2(0.0,pixelSize*float(i));
            }
        }
    `;
}

function Blurfs() {
    return `
        varying vec2 blurTexCoords[11];
        uniform sampler2D tex;
        uniform float factor;
        void main() {
            //gl_FragColor = vec4(1.0);
            gl_FragColor += texture2D(tex, blurTexCoords[0]) * 0.0093;
            gl_FragColor += texture2D(tex, blurTexCoords[1]) * 0.028002;
            gl_FragColor += texture2D(tex, blurTexCoords[2]) * 0.065984;
            gl_FragColor += texture2D(tex, blurTexCoords[3]) * 0.121703;
            gl_FragColor += texture2D(tex, blurTexCoords[4]) * 0.175713;
            gl_FragColor += texture2D(tex, blurTexCoords[5]) * 0.198596;
            gl_FragColor += texture2D(tex, blurTexCoords[6]) * 0.175713;
            gl_FragColor += texture2D(tex, blurTexCoords[7]) * 0.121703;
            gl_FragColor += texture2D(tex, blurTexCoords[8]) * 0.065984;
            gl_FragColor += texture2D(tex, blurTexCoords[9]) * 0.028002;
            gl_FragColor += texture2D(tex, blurTexCoords[10]) * 0.0093;
            if(gl_FragColor.b>0.1){
                //gl_FragColor*=1.10;
            }
            //gl_FragColor*=1.2;
            //gl_FragColor.gb  = vec2(gl_FragColor.r/8.);
        }
    `;
}

var background_music;
var pick_up;
var game_over;
var animationFrameId = null;
class GUser {
    constructor() {
        this.name = "You";
        this.id = "";
        this.status = "Loading...";
        this.OppName = "Usernamw";
        this.score = 0;
        this.oppScore = 0;
        this.totalColectibles = 0;
        this.maxTime = 120000;
        this.totalCross = 0;
        this.state = 0;
    }
    resetScore() {
        this.score = 0;
        this.totalColectibles = 0;
    }
}

var mGames = null;
export class Game {
    constructor(elem, openShare, msg) { // msg('Some msg');openShare(true)
        this.GameScreen = 0;
        this.GAMEMENU = 0;
        this.GAMEPLAY = 1;
        this.GAMEOVER = 2;
        this.GAMELOAD = 3;
        this.POPTIME = 100;
        this.CLR_BLUE = '#001eff';
        this.CLR_RED = '#ff0000';
        this.CLR_WHT = '#ffffff';
        this.CLR_BLACK = '#000000';
        this.timesout = null;
        this.init(elem);
        this.msg = msg;
        this.openShare = openShare;
        this.gameStart = 0;
    }
    init(elem) {
        let this_ = this
        const game = this;
        const mGame = this;
        mGames = this;

        //Multiplayer Changes
        this.me = new GUser();
        this.myAvatarMesh = null;
        console.log(this.me.name + "~~~~~~~~~!!~~~~~~ " + this.me.id);
        try {
            this.me.id = store.getState().auth.user._id;
            this.me.name = store.getState().auth.user.username;
            console.log(this.me.name + "~~~~~~~~~~~~~~~ ", store.getState().auth.user);
            this.myAvatar = new Avatar();
            this.myAvatar.getAvatarForUser("me");
            this.myAvatar.onWorldModelLoaded = this.onLoadCallback;


        } catch (error) {
            // console.log("error = " + error);
        }

        store.dispatch({ type: 'LOADING_COMPLETE' });

        //Multiplayer Changes
        this.overCount = 0;
        this.counter = 0;
        this.isResize = 0;
        this.gameCounter = 0;
        this.direction = 0;
        this.mTex_fonts = Array(10);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        this.isDown = false;
        // this.scene.background = new THREE.Color(0xefd1b5);
        this.scene.fog = new THREE.FogExp2(0x000000, 0.01);
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 1, 0);//30
        // this.camera.rotation.set(Math.PI * .1, 0, 0);//30
        // this.camera.lookAt(new THREE.Vector3(0, 0, 0));
        //  this.target = new THREE.WebGLMultiRenderTarget(window.innerWidth, window.innerHeight);
        // target.texture.format = THREE.RGBFormat;

        this.timer = 0.0;

        this.renderSwap = false;
        this.postScene = new THREE.Scene();
        this.postCamera = new THREE.OrthographicCamera(
            -1, // left
            1, // right
            1, // top
            -1, // bottom
            -1, // near,
            1, // far
        );
        this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.RT1 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.RT2 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.RT3 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.RT4 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.RT5 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        this.RT6 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        ////////////////////Shader///////////////////

        let uniforms = {
            tex1: {
                value: this.renderTarget.texture
            },
            tex2: {
                value: this.RT2.texture
            },
            tex3: {
                value: this.RT4.texture
            },
            factor: {
                value: 0.8
            },
            intensity: {
                value: 1.0
            }
        };

        let uniformsP = {
            tex: {
                value: this.RT3.texture
            }
        }

        let uniformsH = {
            tex: {
                value: this.renderTarget.texture
            },
            width: { value: window.innerWidth },
            height: { value: window.innerHeight }
        };

        let uniformsV = {
            tex: {
                value: this.RT1.texture
            },
            backbuffer: {
                value: this.RT3.texture
            },
            width: { value: window.innerWidth },
            height: { value: window.innerHeight }
        };


        this.HorizontalBlur = new THREE.ShaderMaterial({
            uniforms: uniformsH,
            fragmentShader: Blurfs(),
            vertexShader: BlurHvs(),
        })
        this.VerticalBlur = new THREE.ShaderMaterial({
            uniforms: uniformsV,
            fragmentShader: Blurfs(),
            vertexShader: BlurVvs(),
        })


        this.FinalShader = new THREE.ShaderMaterial({
            uniforms: uniforms,
            fragmentShader: fragmentShader(),
            vertexShader: vertexShader(),
        })


        this.PostShader = new THREE.ShaderMaterial({
            uniforms: uniformsP,
            fragmentShader: simpleFragmentShader(),
            vertexShader: vertexShader(),
        })

        const plane = new THREE.PlaneBufferGeometry(2, 2);
        this.quad = new THREE.Mesh(plane, this.FinalShader)
        this.postScene.add(this.quad);








        // this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
        // this.renderTarget1 = new THREE.WebGLRenderTarget(window.innerWidth / 4, window.innerHeight / 4);
        // this.renderTarget2 = new THREE.WebGLRenderTarget(window.innerWidth / 2, window.innerHeight / 2);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        elem.appendChild(this.renderer.domElement);
        this.gameUI = new ThreeUI(this.renderer.domElement, 1920);
        this.clock = new THREE.Clock();
        this.coords = new THREE.Vector2();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.mSel = 0;
        this.rotate = 0;
        this.mx = 0;
        this.boosCount = 0;
        this.boosTotal = 0;
        this.boosAnim = 0;
        this.spd = 0;
        this.time = 0;
        var manager = new THREE.LoadingManager(loadModel);
        manager.onProgress = function (item, loaded, total) {
            // console.log(item, loaded, total);
        };
        function onProgress(xhr) { }
        function onError() { }


        var textureLoader = new THREE.TextureLoader();
        this.uniforms = {
            "time": { value: 1.0 },
            "texture": { value: new THREE.TextureLoader().load('./assets/lava/lavatile.jpg') }
        };
        this.uniforms["texture"].value.wrapS = this.uniforms["texture"].value.wrapT = THREE.RepeatWrapping;

        var size = 0.65;

        var materialShad = new THREE.ShaderMaterial({
            side: THREE.DoubleSide,
            uniforms: this.uniforms,
            // vertexShader: document.getElementById('vertexShader').textContent,
            // fragmentShader: document.getElementById('fragment_shader1').textContent

        });
        var loaderback = new THREE.TextureLoader();
        const bgTexture1 = loaderback.load(require('../assets/lava/lavatile.jpg'));


        this.cylinders = [];
        var geometry = new THREE.CylinderGeometry(16, 16, 400, 16, 1, true, Math.PI * .4, Math.PI * 2);
        var material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, color: 0xff000 });
        var cylinder = new THREE.Mesh(geometry, material);
        cylinder.rotation.set(Math.PI * .5, 0, 0);
        cylinder.position.set(0, 0, -50);
        this.scene.add(cylinder);
        for (let i = 0; i < 0; i++) {
            var cylinder = new THREE.Mesh(geometry, material);
            this.scene.add(cylinder);
            this.cylinders.push(cylinder);
            this.cylinders[i].position.set(0, 0, 1000);
        }

        var material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, color: 0xffffff });
        var MovingCubeGeom = new THREE.CubeGeometry(.15, .15, .15);//, 1, 1, 1, materialArray);
        this.boosters = [];
        for (let i = 0; i < 0; i++) {
            var booster = new THREE.Mesh(MovingCubeGeom, material);
            this.scene.add(booster);
            booster.position.set(0, 0, -i * 10);
            this.boosters.push(booster);

        }


        this.timer_motion = 0.0;
        var loader = new OBJLoader(manager);
        loader.load(require('../assets/power.obj'), function (obj) {
            obj.traverse(function (child) {
                if (child.isMesh) {
                    var material = new THREE.MeshStandardMaterial({ color: 0xffff00, metalness: 0, roughness: 1, envMapIntensity: 1.0 });
                    child.material = material;
                }
            });
            for (let i = 0; i < 10; i++) {
                var booster = obj.clone();
                booster.scale.set(.05, .05, .05);
                game.scene.add(booster);
                game.boosters.push(booster);
                // console.log("OBJLoader " + game.boosters.length);
            }
        }, onProgress, onError);


        var material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, color: 0xff00ff });
        var MovingCubeGeom = new THREE.CubeGeometry(.1, .1, .1);
        this.MovingCube = new THREE.Mesh(MovingCubeGeom, material);
        this.MovingCube.position.set(0, 0, -5);
        this.scene.add(this.MovingCube);



        var geometry = new THREE.PlaneBufferGeometry(16, 16);
        var material = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide, color: 0xf2f0fa });
        this.Gate = new THREE.Mesh(geometry, material);
        this.scene.add(this.Gate);

        Particle(this.scene);
        this.mixer = [];
        var loader = new GLTFLoader(manager);
        loader.load(require('../assets/WarpRide.gltf'), function (obj) {
            // loader.load(require('../assets/WarpRide.gltf'), function (obj) {
            game.obj_WarpRide = obj;
            let model = obj.scene;
            model.traverse(function (child) {
                // if (child.isMesh) child.material.envMap = envMap;
                if (child.isMesh) {
                    child.material = new THREE.MeshBasicMaterial();
                    child.material.color = new THREE.Color(0x001eff);
                    //child.receiveShadow = true;
                    //child.material.wireframe = true;
                }
                var power = model.getObjectByName("Bolt");
                var cable = model.getObjectByName("RedCable");
                cable.material.color = new THREE.Color(0xf50414);
                cable.material.wireframe = false;
                power.material.color = new THREE.Color(0x001eff);//001eff
                //power.material.wireframe = false;

            });

            var objscn = game.obj_WarpRide.scene;

            for (let i = 0; i < 3; i++) {
                var cylinder = objscn.clone();

                game.scene.add(cylinder);
                game.cylinders.push(cylinder);
                console.log("~~~~GLTFLoader ~~~~");
                for (let j = 0; j < cylinder.children[2].children.length; j++) {
                    cylinder.children[2].children[j].visible = false;
                    cylinder.children[2].children[(i % 3) + 2].visible = true;
                    cylinder.children[2].children[1].visible = true;
                    cylinder.children[2].children[5].visible = true;
                    console.log(cylinder.children[2].children[i].name);
                }
                var animations = obj.animations;
                if (animations && animations.length) {
                    game.mixer.push(new THREE.AnimationMixer(cylinder));
                    for (var k = 0; k < animations.length; k++) {
                        var animation = animations[k];

                        var action = game.mixer[i].clipAction(animation);
                        game.mixer[i].used = 0;
                        console.log(animation.duration);
                        action.play();
                    }
                }
            }



        }, onProgress, onError);

        // console.log("inside ~~~~~0");
        AssetLoader.progressListener = function (progress) {
            // console.log("inside ~~~~~0~~~ " + progress);
        };
        AssetLoader.add.image64('LOGO_64', require('../assets/logo.png'));
        AssetLoader.add.image64('NO1_64', require('../assets/1.png'));
        AssetLoader.add.image64('NO2_64', require('../assets/2.png'));
        AssetLoader.add.image64('NO3_64', require('../assets/3.png'));
        AssetLoader.add.image64('RELOAD_64', require('../assets/reload.png'));


        AssetLoader.add.image64('CHAR_64', require('../assets/char.png'));
        AssetLoader.add.image64('CRESS_64', require('../assets/cress.png'));
        AssetLoader.add.image64('HELP_64', require('../assets/help.png'));
        AssetLoader.add.image64('PLAY_64', require('../assets/play.png'));
        AssetLoader.add.image64('POWER_64', require('../assets/power.png'));
        AssetLoader.add.image64('SHARE_64', require('../assets/Share.png'));
        AssetLoader.add.image64('OPP_64', require('../assets/opp.png'));



        AssetLoader.load(function () {
            game.mTex_logo = loadUIRect(game.gameUI, 0, 0, 1920, 1920, '#ff00ff');
            game.mTex_logo.visible = true;
            var httlogo = loadUI(game.gameUI, 'LOGO_64', 0, 0);
            httlogo.parent = game.mTex_logo;
            httlogo.visible = true;
            game.mTex_logo.visible = true;
            game.start = 1;
            game.mTex_White = loadUIRect(game.gameUI, 0, 0, 1920, 1920, '#f2f0fb');
            game.Number = [];
            game.Number.push(loadUI(game.gameUI, 'NO1_64', 0, 0));
            game.Number.push(loadUI(game.gameUI, 'NO2_64', 0, 0));
            game.Number.push(loadUI(game.gameUI, 'NO3_64', 0, 0));
            game.reload = loadUI(game.gameUI, 'RELOAD_64', 0, 0);

            game.mTex_help = loadUI(game.gameUI, 'HELP_64', 0, 0);
            game.mTex_char = loadUI(game.gameUI, 'CHAR_64', 0, 0);
            game.mTex_char2 = loadUI(game.gameUI, 'CHAR_64', 0, 0);
            game.mTex_cress = loadUI(game.gameUI, 'CRESS_64', 0, 0);

            game.mTex_play = loadUI(game.gameUI, 'PLAY_64', 0, 0);
            game.mTex_power = loadUI(game.gameUI, 'POWER_64', 0, 0);
            game.mTex_share = loadUI(game.gameUI, 'SHARE_64', 0, 0);
            game.mTex_Opp = loadUI(game.gameUI, 'OPP_64', 0, 0);


            game.mTex_play.onClick(() => { game.Handle_Menu(10); });

            for (var i = 0; i < game.mTex_fonts.length; i++) {
                game.mTex_fonts[i] = createTexts(game.gameUI, "100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "OnePlusSansText");
            }
            game.setScreen(game.GAMEMENU);
        });

        this.helper = new CannonHelper(this.scene);
        this.helper.addLights(this.renderer);

        document.addEventListener('keydown', dealWithKeyboard);
        document.addEventListener('keyup', upWithKeyboard);
        // //if (isMobile.any())
        // {
        //     document.addEventListener('touchstart', e => { this.touchEvent(e, 0, 1); });
        //     document.addEventListener('touchmove', e => { this.touchEvent(e, 1, 1); });
        //     document.addEventListener('touchend', e => { this.touchEvent(e, 2, 1); });
        // }
        // //else
        // {
        //     document.addEventListener('mousedown', e => { this.touchEvent(e, 0, 0); });
        //     document.addEventListener('mousemove', e => { this.touchEvent(e, 1, 0); });
        //     document.addEventListener('mouseup', e => { this.touchEvent(e, 2, 0); });
        // }

        //if (isMobile.any())
        // {
        //     document.addEventListener('touchstart', this.eventDown);
        //     document.addEventListener('touchmove', this.eventMove);
        //     document.addEventListener('touchend', this.eventUp);
        /*        {
                    document.addEventListener('touchstart', e => { this.touchEvent(e, 0, 1); });
                    document.addEventListener('touchmove', e => { this.touchEvent(e, 1, 1); });
                    document.addEventListener('touchend', e => { this.touchEvent(e, 2, 1); });
                }
                //else
                {
                    document.addEventListener('mousedown', this.eventDown);
                    document.addEventListener('mousemove', this.eventMove);
                    document.addEventListener('mouseup', this.eventUp);
                }
        
                // document.addEventListener('mouseup', this.checkOnly);
        
                // The Audio Listener -------------------------------------------------------------------------------------------------
        */
        {
            document.addEventListener('touchstart', this.eventDown);
            document.addEventListener('touchmove', this.eventMove);
            document.addEventListener('touchend', this.eventUp);
        }
        //else
        {
            document.addEventListener('mousedown', this.eventDown);
            document.addEventListener('mousemove', this.eventMove);
            document.addEventListener('mouseup', this.eventUp);
        }
        // The Audio Listener -------------------------------------------------------------------------------------------------
        //#region
        let listener = new THREE.AudioListener();
        game.camera.add(listener);

        // create a global audio source
        background_music = new THREE.Audio(listener);
        pick_up = new THREE.Audio(listener);
        game_over = new THREE.Audio(listener);


        // load a sound and set it as the Audio object's buffer
        let audioLoader = new THREE.AudioLoader();
        audioLoader.load(
            require('../assets/sounds/warp_bg.mp3'),
            function (buffer) {
                background_music.setBuffer(buffer);
                background_music.setLoop(true);
                background_music.setVolume(0.3);
                background_music.play();
            });

        audioLoader.load(
            require('../assets/sounds/pick_up.mp3'),
            function (buffer) {
                pick_up.setBuffer(buffer);
                pick_up.setLoop(false);
                pick_up.setVolume(0.8);
            });
        audioLoader.load(
            require('../assets/sounds/game_over.mp3'),
            function (buffer) {
                game_over.setBuffer(buffer);
                game_over.setLoop(false);
                game_over.setVolume(0.8);
            });

        //Prakash__Sound_Minimize
        window.addEventListener('blur', this.minimizeSoundPause, false);
        window.addEventListener('focus', this.maximizeSoundPlay, false);


        window.addEventListener('resize', this.onWindowResize, false);
        // console.log("inside ~~~~2~");
        this.animate();
        this.start = 1;
    }

    eventDown(e) {
        mGames.touchEvent(e, 0, 1);
    }
    eventMove(e) {
        mGames.touchEvent(e, 1, 1);
    }
    eventUp(e) {
        mGames.touchEvent(e, 2, 1);
    }
    minimizeSoundPause() {
        if (background_music.isPlaying) {
            background_music.pause();
        }
        console.log("blur chla")
    }

    maximizeSoundPlay() {
        console.log('focus chla');
        if (!background_music.isPlaying) {
            background_music.play();
        }
    }

    onLoadCallback(mesh) {
        console.log("inside own avatar model load ", mesh.position);
        mGames.myAvatarMesh = mesh;
        mGames.myAvatarMesh.scale.set(1, 1, 1);
        mGames.myAvatarMesh.rotation.set(-Math.PI * .37, Math.PI, 0);
        mGames.myAvatarMesh.position.set(0, 0, 150);

        //mGames.myAvatarMesh.rotation.set(Math., 0, -5);
        mGames.scene.add(mGames.myAvatarMesh);
        mGames.myAvatarMesh = mesh;
        mGames.myAvatarMesh.visible = true;
    }

    Handle_Menu(clickval) {
        console.log('clickval yogesh ' + clickval);
        // DrawLbl(this.mTex_fonts[9], 'WARP Ride', 0, 750, this.CLR_RED, 150);
    }
    onWindowResize() {
        if (mGames != null) {
            mGames.camera.aspect = window.innerWidth / window.innerHeight;
            mGames.camera.updateProjectionMatrix();
            mGames.renderer.setSize(window.innerWidth, window.innerHeight);
            mGames.isResize = 5;
        }
    }
    touchEvent(e, type, sys) {
        // console.log("this.renderer  " + this.renderer);
        if (this.start === null || this.renderer == undefined) {
            console.log("this.renderer  " + this.renderer);
            return;
        }
        var scale = this.gameUI.height / this.gameUI.gameCanvas.getBoundingClientRect().height;
        var CANVAS_HEIGHT = window.innerHeight;
        var CANVAS_WIDTH = window.innerWidth;
        if (e.touches != null) {
            if (e.touches.length > 0) {
                this.mouse.x = (e.touches[0].pageX / window.innerWidth) * 2 - 1;
                this.mouse.y = -(e.touches[0].pageY / window.innerHeight) * 2 + 1;

                // this.coords.x = (e.touches[0].pageX - (window.innerWidth - this.gameUI.gameCanvas.getBoundingClientRect().width) / 2) * scale;
                this.coords.y = e.touches[0].pageY * scale;
            }

        } else {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
            this.coords = { x: e.clientX, y: e.clientY };
            this.coords.x = (e.clientX - (window.innerWidth - this.gameUI.gameCanvas.getBoundingClientRect().width) / 2) * scale;
            this.coords.y = e.clientY * scale;

            var elem = this.renderer.domElement,
                boundingRect = elem.getBoundingClientRect(),
                x = (e.clientX - boundingRect.left) * (elem.width / boundingRect.width),
                y = (e.clientY - boundingRect.top) * (elem.height / boundingRect.height);
            this.mouse.x = (x / CANVAS_WIDTH) * 2 - 1;
            this.mouse.y = -(y / CANVAS_HEIGHT) * 2 + 1;
        }
        this.raycaster.setFromCamera(this.mouse, this.camera);
        var bounds;
        if (this.start === undefined) {
            return;
        }

        switch (this.GameScreen) {
            case this.GAMEPLAY:
                // console.log("e.touches.length = " + this.mouse.x);
                if (type == 0) {
                    this.isDown = true;
                }
                if (this.isDown == true) {
                    this.direction = -1;
                    if (this.mouse.x > 0) {
                        this.direction = 1;
                    }
                }
                if (type == 2) {
                    this.direction = 0;
                    this.isDown = false;
                }
                break;

            case this.GAMEMENU:
                this.mSel = 0;
                bounds = this.mTex_cress.getBounds();
                if (isMobile.Android()) {
                    console.log(isMobile.Android());
                    this.coords.y *= .9;
                    if (window.innerWidth > window.innerHeight)
                        this.coords.y *= .9;
                }
                if (window.ThreeUI.isInBoundingBox(this.coords.x, this.coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                    this.mSel = 1;
                }
                bounds = this.mTex_play.getBounds();
                if (window.ThreeUI.isInBoundingBox(this.coords.x, this.coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                    this.mSel = 2;
                }
                if (type == 2) {
                    switch (this.mSel) {
                        case 1:
                            this.destroyGame();
                            window.history.back();
                            break;
                        case 2:
                            //this.setScreen(this.GAMELOAD);
                            console.log("MatchmakerService.connect(this.onConnect)");
                            if (this.GameScreen == this.GAMEMENU) {
                                console.log("MatchmakerService.connect(this.onConnect1111)");
                                this.GameScreen = this.GAMELOAD;
                                MatchmakerService.connect(this.onConnect);
                            }
                            break;
                    }
                    this.mSel = 0;
                }
                break;
            case this.GAMELOAD:
                this.mSel = 0;
                bounds = this.mTex_cress.getBounds();
                if (isMobile.Android()) {
                    console.log(isMobile.Android());
                    this.coords.y *= .9;
                    if (window.innerWidth > window.innerHeight)
                        this.coords.y *= .9;
                }

                if (window.ThreeUI.isInBoundingBox(this.coords.x, this.coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                    this.mSel = 1;
                }
                if (type == 2) {
                    switch (this.mSel) {
                        case 1:
                            this.destroyGame();
                            window.history.back();
                            break;
                    }
                    this.mSel = 0;
                }
                break;

            case this.GAMEOVER:
                this.mSel = 0;
                if (isMobile.Android()) {
                    console.log(isMobile.Android());
                    this.coords.y *= .9;
                    if (window.innerWidth > window.innerHeight)
                        this.coords.y *= .9;
                }
                bounds = this.mTex_cress.getBounds();
                if (window.ThreeUI.isInBoundingBox(this.coords.x, this.coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                    this.mSel = 1;
                }
                bounds = this.mTex_share.getBounds();
                if (window.ThreeUI.isInBoundingBox(this.coords.x, this.coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                    this.mSel = 2;
                }
                bounds = this.reload.getBounds();
                if (window.ThreeUI.isInBoundingBox(this.coords.x, this.coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
                    this.mSel = 3;
                }

                if (type == 2) {
                    switch (this.mSel) {
                        case 1:
                            this.destroyGame();
                            window.history.back();
                            break;
                        case 2:
                            this.msg('Join me in the OnePlus World!!  ');
                            this.openShare(true)
                            break;
                        case 3:
                            this.setScreen(this.GAMELOAD);
                            break;
                    }
                    this.mSel = 0;
                }
                break;
        }

    }
    animate() {
        if (this.renderer == undefined) {
            console.log("animate 2 this.renderer");
            return;
        }
        setTimeout(function () {
            animationFrameId = requestAnimationFrame(function () { game.animate(); });
        }, 1000 / 50);

        const game = this;
        this.delta = this.clock.getDelta();
        // requestAnimationFrame(function () { game.animate(); });
        this.timer_motion += this.delta * 10.;
        if (this.start === null || this.renderer == undefined) {
            console.log("this.renderer");
            return;
        }

        // this.counter += 0.000000001;
        //this.counter /= this.counter * 0.05;
        if (this.myAvatarMesh) {
            this.myAvatarMesh.scale.set(0.005, 0.005, 0.005);
            // this.myAvatarMesh.position.y = -0.5;
            // this.myAvatarMesh.position.z = this.timer_motion * 0.5;
        }
        //  console.log(this.timer_motion);
        for (var i = 0; i < this.cylinders.length; i++) {
            //this.cylinders[i].rotation.z = this.timer_motion*0.01;
            //this.cylinders[i].position.z = Math.sin(this.timer_motion*0.2)*50.;
        }

        this.renderer.setRenderTarget(this.renderTarget);
        this.renderer.render(this.scene, this.camera);
        this.renderer.setRenderTarget(null);

        this.renderer.setRenderTarget(this.RT1);
        this.quad.material = this.HorizontalBlur;
        this.quad.material.uniforms.tex.value = this.renderTarget;
        this.quad.material.uniforms.width.value = window.innerWidth / 32;
        this.renderer.render(this.postScene, this.postCamera);
        this.renderer.setRenderTarget(null);


        this.quad.material = this.VerticalBlur;
        this.quad.material.uniforms.tex.value = this.RT1;
        this.quad.material.uniforms.height.value = window.innerHeight / 16;
        this.renderer.setRenderTarget(this.RT2);
        this.renderer.render(this.postScene, this.postCamera);
        this.renderer.setRenderTarget(null);


        this.renderer.setRenderTarget(this.RT5);
        this.quad.material = this.HorizontalBlur;
        this.quad.material.uniforms.tex.value = this.RT2;
        this.quad.material.uniforms.width.value = window.innerWidth / 8;
        this.renderer.render(this.postScene, this.postCamera);
        this.renderer.setRenderTarget(null);


        this.quad.material = this.VerticalBlur;
        this.quad.material.uniforms.tex.value = this.RT5;
        this.quad.material.uniforms.height.value = window.innerHeight / 6;
        this.renderer.setRenderTarget(this.RT6);
        this.renderer.render(this.postScene, this.postCamera);
        this.renderer.setRenderTarget(null);

        this.renderer.setRenderTarget(this.RT1);
        this.quad.material = this.HorizontalBlur;
        this.quad.material.uniforms.tex.value = this.RT5;
        this.quad.material.uniforms.width.value = window.innerWidth / 4;
        this.renderer.render(this.postScene, this.postCamera);
        this.renderer.setRenderTarget(null);


        this.quad.material = this.VerticalBlur;
        this.quad.material.uniforms.tex.value = this.RT1;
        this.quad.material.uniforms.height.value = window.innerHeight / 2;
        this.renderer.setRenderTarget(this.RT2);
        this.renderer.render(this.postScene, this.postCamera);
        this.renderer.setRenderTarget(null);

        this.renderer.setRenderTarget(this.RT5);
        this.quad.material = this.HorizontalBlur;
        this.quad.material.uniforms.tex.value = this.RT2;
        this.quad.material.uniforms.width.value = window.innerWidth / 1;
        this.renderer.render(this.postScene, this.postCamera);
        this.renderer.setRenderTarget(null);


        this.quad.material = this.VerticalBlur;
        this.quad.material.uniforms.tex.value = this.RT5;
        this.quad.material.uniforms.height.value = window.innerHeight / 1;
        this.renderer.setRenderTarget(this.RT6);
        this.renderer.render(this.postScene, this.postCamera);
        this.renderer.setRenderTarget(null);



        this.quad.material = this.FinalShader
        this.quad.material.uniforms.tex2.value = this.RT6.texture;
        this.quad.material.uniforms.intensity.value = 1.;
        //this.quad.material.uniforms.tex2.value = this.RT2.texture;

        if (this.renderSwap) {
            this.renderSwap = false;
            this.quad.material.uniforms.tex3.value = this.RT4.texture;
            this.renderer.setRenderTarget(this.RT3);
            this.renderer.render(this.postScene, this.postCamera);
            this.renderer.setRenderTarget(null);
            this.quad.material = this.PostShader
            this.quad.material.uniforms.tex.value = this.RT3.texture;


        } else {
            this.renderSwap = true;
            this.quad.material.uniforms.tex3.value = this.RT3.texture;
            this.renderer.setRenderTarget(this.RT4);
            this.renderer.render(this.postScene, this.postCamera);
            this.renderer.setRenderTarget(null);
            this.quad.material = this.PostShader
            this.quad.material.uniforms.tex.value = this.RT4.texture;

        }




        this.renderer.render(this.postScene, this.postCamera);

        this.gameUI.render(this.renderer);
        this.counter++;

        if (this.start === null) {
            return;
        }

        switch (this.GameScreen) {
            case this.GAMEMENU:
            case this.GAMELOAD:
                DrawTexture(this.mTex_White, 0, 0, 4920, 1920);
                DrawLbl(this.mTex_fonts[0], 'WARP Ride', -110, -750, this.CLR_RED, 150);
                DrawLbl(this.mTex_fonts[1], 'Lets play now...', -50, -670, this.CLR_BLACK, 50);
                this.Number.forEach(element => { DrawTexture(element, 0, 360, 2, 2); });

                DrawTexture(this.mTex_cress, 430, -800, 128 * (this.mSel == 1 ? 1.1 : 1), 128 * (this.mSel == 1 ? 1.1 : 1));
                DrawTexture(this.mTex_help, 1, -250, 800 + this.counter % 2, 800);
                DrawTexture(this.mTex_help, 1, -250, 700, 700);
                if (this.GameScreen == this.GAMELOAD) {
                    var str = '.'
                    for (let i = 0; i < (this.counter / 10) % 3; i++) {
                        str += '.';
                    }
                    DrawLbl(this.mTex_fonts[3], 'Looking for opponent' + str, 0, 200, this.CLR_BLUE, 60);
                    DrawTexture(this.mTex_play, 0, 600, 320 * (this.mSel == 2 ? 2.6 : 2.5), 40 * (this.mSel == 2 ? 2.6 : 2.5));
                    this.mTex_play.alpha = .2;
                } else {
                    DrawLbl(this.mTex_fonts[3], '', 0, 220, this.CLR_BLUE, 70);
                    DrawTexture(this.mTex_play, 0, 600, 320 * (this.mSel == 2 ? 2.6 : 2.5), 40 * (this.mSel == 2 ? 2.6 : 2.5));
                }
                DrawLbl(this.mTex_fonts[4], 'vs', 0, 370, this.CLR_BLACK, 60);
                DrawLbl(this.mTex_fonts[5], '' + this.me.name.toUpperCase().charAt(0), -240, 360, this.CLR_WHT, 60);
                DrawTexture(this.mTex_char, -240, 340, 160, 160);
                DrawLbl(this.mTex_fonts[6], '' + '?'.toUpperCase().charAt(0), 240, 360, this.CLR_WHT, 60);
                DrawTexture(this.mTex_char2, 240, 340, 160, 160);

                break;
            case this.GAMEPLAY:
                this.movemet();
                break;
            case this.GAMEOVER:
                this.Number.forEach(element => { DrawTexture(element, 0, 360, 2, 2); });

                DrawTexture(this.mTex_White, 0, 0, 4920, 1920);
                DrawLbl(this.mTex_fonts[0], 'WARP Ride', -220, -750, this.CLR_RED, 100);
                DrawTexture(this.mTex_cress, 410, -790, 128 * (this.mSel == 1 ? 1.1 : 1), 128 * (this.mSel == 1 ? 1.1 : 1));
                DrawLbl(this.mTex_fonts[1], '' + this.me.status, 0, -520, this.CLR_BLUE, 100);

                DrawLbl(this.mTex_fonts[2], 'vs', 0, -360, this.CLR_BLACK, 60);
                DrawTexture(this.mTex_char, -240, -370, 160 + this.counter % 2, 160);
                DrawTexture(this.mTex_char2, 240, -370, 160 + this.counter % 2, 160);

                DrawLbl(this.mTex_fonts[3], '' + this.me.name, -240, -220, this.CLR_BLACK, 50);
                DrawLbl(this.mTex_fonts[4], '' + this.me.OppName, 240, -220, this.CLR_BLACK, 50);

                DrawLbl(this.mTex_fonts[5], this.me.score + '\npoints', -240, -150, this.CLR_BLUE, 50);
                DrawLbl(this.mTex_fonts[6], this.me.oppScore + '\npoints', 240, -150, this.CLR_BLACK, 50);


                DrawTexture(this.mTex_share, 0, 160, 320 * (this.mSel == 2 ? 2.6 : 2.5), 40 * (this.mSel == 2 ? 2.6 : 2.5));
                DrawTexture(this.reload, 0, 320, 320 * (this.mSel == 3 ? 2.6 : 2.5), 40 * (this.mSel == 3 ? 2.6 : 2.5));

                break;
            // case this.GAMELOAD:
            //     DrawLbl(this.mTex_fonts[0], '' + this.me.status, 0, -0, this.CLR_WHT, 100);
            //     this.Number.forEach(element => { DrawTexture(element, 0, 360, 2, 2); });
            //     break;
        }
        if (this.isResize > 0) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.postCamera.aspect = window.innerWidth / window.innerHeight;
            this.postCamera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.renderTarget.setSize(window.innerWidth / 4, window.innerHeight / 4);
            this.RT1.setSize(window.innerWidth / 4, window.innerHeight / 4);
            this.RT2.setSize(window.innerWidth, window.innerHeight);
            this.RT3.setSize(window.innerWidth, window.innerHeight);
            this.RT4.setSize(window.innerWidth, window.innerHeight);
            this.RT5.setSize(window.innerWidth, window.innerHeight);
            this.RT6.setSize(window.innerWidth, window.innerHeight);
            this.gameUI.resize();
            this.isResize--;
        }


    }

    movemet() {
        DrawTexture(this.mTex_White, 0, -880, 4920, 170);
        DrawLbl(this.mTex_fonts[1], 'WARP Ride', -240, -850, this.CLR_RED, 100);
        DrawTexture(this.mTex_power, 380, -860, 63 * .6, 138 * .6);
        DrawLbl(this.mTex_fonts[0], '' + this.boosCount, 460, -850, this.CLR_BLACK, 60);
        if (this.gameCounter < 300) {
            this.Number.forEach(element => { element.visible = false; });
            DrawTexture(this.Number[Math.floor(this.gameCounter / 100)], 0, 0, 128 * (this.gameCounter % 100) * .02, 128 * (this.gameCounter % 100) * .02);
            this.gameCounter += 4;
            if (this.gameCounter == 300) {
                this.Number.forEach(element => { element.visible = false; });
            }
            this.boosAnim = 250;
            for (let i = 0; i < this.cylinders.length; i++) {
                this.cylinders[i].rotation.set(Math.PI, 0, 0);
                this.cylinders[i].position.set(0, 0, -110 - (220 * i));
                this.cylinders[i].children[2].children.forEach(element => { element.visible = false; });
                for (let j = 0; j < this.cylinders[i].children[2].children.length; j++) {
                    // this.cylinders[i].children[2].children[j].visible = false;
                    // this.cylinders[i].children[2].children[(i % 3) + 2].visible = true;
                    // this.cylinders[i].children[2].children[1].visible = true;
                    // this.cylinders[i].children[2].children[5].visible = true;
                    if (this.cylinders[i].children[2].children[j].name == "RedCable")
                        this.cylinders[i].children[2].children[j].visible = true;
                    if (this.cylinders[i].children[2].children[j].name == "Door_Grp")
                        this.cylinders[i].children[2].children[j].visible = true;
                    if (this.cylinders[i].children[2].children[j].name == "A" && (i % 3) == 0)
                        this.cylinders[i].children[2].children[j].visible = true;
                    if (this.cylinders[i].children[2].children[j].name == "B" && (i % 3) == 1)
                        this.cylinders[i].children[2].children[j].visible = true;
                    if (this.cylinders[i].children[2].children[j].name == "Spiral" && (i % 3) == 2)
                        this.cylinders[i].children[2].children[j].visible = true;
                }
            }
        } else {

            // DrawLbl(this.mTex_fonts[1], '' + this.me.name, -200, 850, this.CLR_WHT, 50);
            // DrawLbl(this.mTex_fonts[2], '' + this.me.OppName, 200, 850, this.CLR_WHT, 50);
            if (this.overCount == 0) {
                this.boosAnim--;
                this.camera.fov = 10;
                aniparticle();
                stars.visible = particles.visible = true;
                if (this.camera.position.y > .2)
                    this.camera.position.y -= .025;//set(0, 1.2, 0);
                if (this.spd < 1.21) {
                    this.spd += 1.1;
                }
            } else {
                // if (this.camera.position.y < 1)
                //     this.camera.position.y += .025;//set(0, 1.2, 0);
                // this.camera.fov = 40;
                // stars.visible = particles.visible = false;
                // if (this.spd < .2) {
                //     this.spd += .001;
                // }
                if (this.spd > 0) {
                    this.spd -= 1.1;
                    if (this.spd <= 0) {
                        this.setScreen(this.GAMEOVER);
                    }
                }
            }

            // if (this.counter % 10 == 0) {
            //     this.scoreUpdare();
            // }

            this.Gate.position.z += this.spd;
            for (let i = 0; i < this.cylinders.length; i++) {
                this.cylinders[i].position.z += this.spd;
            }
            for (let i = 0; i < this.cylinders.length; i++) {
                if (this.cylinders[i].position.z > 220) {
                    var clyz = this.cylinders[(i == 0 ? this.cylinders.length : i) - 1].position.z - 220;
                    if (clyz > this.Gate.position.z)
                        this.cylinders[i].position.z = clyz;


                    if (this.mixer[i]) {
                        this.mixer[i].used = 0;
                        this.obj_WarpRide.animations.forEach(function (clip) {
                            mGames.mixer[i].clipAction(clip).stop();
                        });
                    }

                }
                if (this.cylinders[i].position.z > 40) {
                    if (this.mixer[i]) {
                        if (this.mixer[i].used < .800)
                            this.mixer[i].update(this.delta);
                        this.mixer[i].used += this.delta;
                        // this.mixer[i].stopAllAction();
                        this.obj_WarpRide.animations.forEach(function (clip) {
                            mGames.mixer[i].clipAction(clip).play();
                            // console.log(clip.duration);
                        });
                    }
                }
            }
            for (let i = 0; i < this.boosters.length; i++) {
                this.boosters[i].position.z += this.spd;
                if (this.spd < 1) {
                    if (this.boosters[i].visible && CircRectsOverlap(this.MovingCube.position.x, this.MovingCube.position.z, .05, 0.5, this.boosters[i].position.x, this.boosters[i].position.z, .05)) {
                        this.boosters[i].visible = false;

                        if (pick_up.isPlaying) {
                            pick_up.stop();
                        }
                        pick_up.play();
                        this.scoreUpdare();
                    }
                } else {
                    if (this.boosters[i].visible && CircRectsOverlap(this.MovingCube.position.x, this.MovingCube.position.z, .15, 3, this.boosters[i].position.x, this.boosters[i].position.z, .15)) {
                        this.boosters[i].visible = false;

                        if (pick_up.isPlaying) {
                            pick_up.stop();
                        }
                        pick_up.play();
                        this.scoreUpdare();
                    }
                }
            }
            for (let i = 0; i < this.boosters.length; i++) {
                if (this.boosters[i].position.z > 20) {
                    this.boosters[i].position.z = this.boosters[(i == 0 ? this.boosters.length : i) - 1].position.z - 20;
                    this.boosters[i].position.x = (Math.random() * 2) - 1;
                    this.boosters[i].visible = true;
                    this.boosTotal++;
                }
            }
            mGames.Gate.visible = true;
            if (this.Gate.position.z > 0) {
                this.setScreen(this.GAMEOVER);
            }
            //if (this.boosCount > 20)
            {
                this.boosAnim = 200;
                // this.boosCount = 0;
            }
            if ((keydown == 39 || this.direction > 0) && this.MovingCube.position.x < 2) {
                this.myAvatarMesh.rotation.y += 0.2;
                this.MovingCube.position.x += .03;

            }
            else if ((keydown == 37 || this.direction < 0) && this.MovingCube.position.x > -2) {
                this.myAvatarMesh.rotation.y -= 0.2;
                this.MovingCube.position.x -= .03;
            } else {
                this.myAvatarMesh.rotation.y = Math.PI;
            }
            if (this.myAvatarMesh.rotation.y > Math.PI + 0.7) {
                this.myAvatarMesh.rotation.y = Math.PI + 0.7;
            } else if (this.myAvatarMesh.rotation.y < Math.PI - 0.7) {
                this.myAvatarMesh.rotation.y = Math.PI - 0.7;
            }
            if (this.MovingCube.position.z > -5) {
                this.MovingCube.position.z -= 1;
            }

        }
        if (this.myAvatarMesh != null) {
            // this.myAvatarMesh.rotation.set(-Math.PI * .37, Math.PI, 0);
            this.myAvatarMesh.position.set(this.MovingCube.position.x, this.MovingCube.position.y - .34, this.MovingCube.position.z + .8);
            // this.myAvatarMesh.rotation.z
            this.myAvatarMesh.scale.set(.5, .5, .5);
            this.myAvatarMesh.visible = true;

        }
    }

    setScreen(scr) {
        this.GameScreen = scr;
        this.mTex_logo.visible = false;
        this.Number.forEach(element => { element.visible = true; });
        this.mTex_fonts.forEach(element => { element.visible = false; });
        this.cylinders.forEach(element => { element.visible = false; });
        this.boosters.forEach(element => { element.visible = false; });
        this.Gate.visible = this.MovingCube.visible = stars.visible = particles.visible = false;
        this.reload.visible = false;
        this.mTex_White.visible = this.mTex_char.visible = this.mTex_char2.visible = this.mTex_cress.visible = this.mTex_help.visible = this.mTex_play.visible = false;
        this.mTex_Opp.visible = this.mTex_power.visible = this.mTex_share.visible = false;
        switch (this.GameScreen) {
            case this.GAMEMENU:
                break;
            case this.GAMELOAD:
                MatchmakerService.connect(this.onConnect);
                console.log("GAME MatchmakerService connect setScreen");
                break;
            case this.GAMEPLAY:
                this.cylinders.forEach(element => { element.visible = true; });
                this.boosters.forEach(element => { element.visible = true; });
                this.Gate.visible = this.MovingCube.visible = true;
                this.gameCounter = 0;
                this.overCount = 0;
                var z = 0;
                var x = 0;
                for (let i = 0; i < this.cylinders.length; i++) {
                    this.cylinders[i].rotation.set(Math.PI * .5, 0, 0);
                    this.cylinders[i].position.set(0, 0, -110 - 220 * i);


                    for (let j = 0; j < this.cylinders[i].children[2].children.length; j++) {
                        this.cylinders[i].children[2].children[j].visible = false;
                        this.cylinders[i].children[2].children[(i % 3) + 2].visible = true;
                        this.cylinders[i].children[2].children[1].visible = true;
                        this.cylinders[i].children[2].children[5].visible = true;
                    }
                }
                for (let i = 0; i < this.boosters.length; i++) {
                    this.boosters[i].position.set((Math.random() * 2) - 1, 0, -50 - i * 20);
                }
                this.MovingCube.position.set(0, 0, 5);
                this.Gate.position.set(0, 0, -mGames.me.maxTime);
                this.boosCount = 0;
                this.boosTotal = 0;
                this.boosAnim = 0;
                this.time = (new Date()).getTime();
                this.timesout = setTimeout(this.timeout, mGames.me.maxTime - 4000);
                this.gameStart = 0;

                break;
            case this.GAMEOVER:
                this.time = (new Date()).getTime() - this.time;
                // console.log(this.me.state + " this.time = " + this.time);
                game_over.play();
                // this.me.score = this.boosCount;//(this.boosCount * 10 - this.boosTotal);
                if (this.me.state == GAME_STATES.BOT) {
                    this.me.oppScore = 100;
                    // console.log(this.me.state + " this.oppScore = " + this.time);
                    if (this.me.score > 200) {
                        if (Math.random() < .85) {
                            this.me.oppScore = this.me.score + Math.floor(Math.random() * 50);
                        } else {
                            this.me.oppScore = this.me.score - Math.floor(Math.random() * 50);
                        }
                    } else if (this.me.score > 100) {
                        if (Math.random() < .75) {
                            this.me.oppScore = this.me.score + Math.floor(Math.random() * 50);
                        } else {
                            this.me.oppScore = this.me.score - Math.floor(Math.random() * 50);
                        }
                    } else {
                        if (Math.random() < .5) {
                            this.me.oppScore = this.me.score + Math.floor(Math.random() * 50);
                        } else {
                            this.me.oppScore = this.me.score - Math.floor(Math.random() * 50);
                            if (this.me.oppScore <= 0) {
                                this.me.oppScore = 10;
                            }
                        }
                    }
                }
                if (this.me.score > this.me.oppScore)
                    mGames.me.status = "YOU WIN!!";
                else
                    mGames.me.status = "YOU LOSE!!";
                break;
        }
    }

    onConnect() {
        console.log("  onConnect~~~~  ");
        MatchmakerService.join(GAME_TYPES.WARPRIDE, ROOM_TYPES.PRIVATE, mGames.onJoined);
    }

    onJoined(responseData) {
        console.log("GAME JOINED ", responseData);
        console.log("GAME GAME_STATES ", responseData.status);
        mGames.me.status = "FINDING MATCH...";
        if (responseData.users) {
            let _me = mGames.getMyUser(responseData);
            mGames.me.name = _me.name;
        }
        mGames.me.state = responseData.status;
        if (responseData.status == GAME_STATES.RUNNING || responseData.status == GAME_STATES.BOT) {
            mGames.startGame(responseData);
            mGames.me.status = "";
            let opponent = mGames.getOpponent(responseData);
            if (opponent)
                mGames.me.OppName = opponent.name;
            else
                mGames.me.OppName = "Anonymous User";
        }
    }

    startGame(gameData) {
        console.log("startGame Hertz game played");
        // game.gameTimer = game.time.addEvent({ delay: 1000, callback: updateTimer, callbackScope: game, loop: true });
        console.log("GAME gameData.maxTime =  ", gameData.maxTime);
        mGames.me.maxTime = gameData.maxTime;
        // createTimer(gameData.maxTime);
        MatchmakerService.registerReciever('drive:score', mGames.recieveScore);
        MatchmakerService.registerReciever('drive:gameend', mGames.gameover);
        ReactGA.event({ category: 'WARP RIDE', action: 'Start Game Play' });
        this.setScreen(this.GAMEPLAY);
    }
    getMyUser(response_data) {
        for (var i = 0; i < response_data.users.length; i++) {
            if (response_data.users[i].userId == mGames.me.id)
                return response_data.users[i];
        }
        return "";
    }
    getOpponent(response_data) {
        if (response_data.users == null || response_data.users.length == 1)
            return null;

        for (var i = 0; i < response_data.users.length; i++) {
            if (response_data.users[i].userId != mGames.me.id)
                return response_data.users[i];
        }
    }
    gameover(response) {
        console.log("Game~~~~~~~~~Over " + mGames.Gate.position.z);
        let _me = mGames.getMyUser(response);
        let opponent = mGames.getOpponent(response);
        if (_me) {
            console.log(mGames.me.score + "!!!  _me.score = " + _me.score);
            mGames.me.score = _me.score
        }
        console.log(response);
        if (opponent) {
            mGames.me.oppScore = opponent.score;

            console.log(mGames.me.score + "  _me.score = " + _me.score);
            if (mGames.me.score > opponent.score)
                mGames.me.status = "YOU WIN!!"
            else
                mGames.me.status = "YOU LOSE!!"
        }
        else {
            mGames.me.status = "YOU WIN!!"
        }
        this.gameStart = 1;
        // mGames.overCount = 1;
        clearTimeout(mGames.timesout);
        if (mGames.Gate.position.z < -100)
            mGames.Gate.position.set(0, 0, -100);
        // mGames.setScreen(mGames.GAMEOVER);
    }
    recieveScore(response) {
        console.log("Recieved: ", response);
        let opponent = mGames.getOpponent(response);
        if (opponent) {
            mGames.me.oppScore = opponent.score;
        }
    }
    scoreUpdare() {
        if (this.gameStart == 0) {
            this.boosCount++;
            this.me.score = this.boosCount;//(this.boosCount * 10 - this.boosTotal);
            this.me.totalCross = this.boosTotal;
            var obj = { score: 1 };
            console.log(this.boosCount, this.me.score + " Sending ", obj);
            MatchmakerService.send('drive:score', obj);
        }
    }
    timeout() { mGames.Gate.position.set(0, 0, -200); }
    destroyGame() {
        this.destroyThree();
    }

    destroyThree() {
        if (animationFrameId)
            cancelAnimationFrame(animationFrameId);

        this.renderer.dispose();

        this.scene.traverse(object => {
            if (!object.isMesh) return;

            console.log(`Dispose object ${object.uuid}`);
            object.geometry.dispose();
            if (object.material.isMaterial) {
                //    this.cleanMaterial(object.material);
            } else {
                //   for (const material of object.material) this.cleanMaterial(material);
            }
        });
        this.scene = undefined;
        this.camera = undefined;
        this.renderer && this.renderer.renderLists.dispose();
        this.renderer = undefined;

        window.removeEventListener('resize', this.onWindowResize);

        // document.removeEventListener('touchstart', this.touchEvent);
        // document.removeEventListener('touchmove', this.touchEvent);
        // document.removeEventListener('touchend', this.touchEvent);

        // document.removeEventListener('mousedown', this.touchEvent);
        // document.removeEventListener('mousemove', this.touchEvent);
        // document.removeEventListener('mouseup', this.touchEvent);

        document.removeEventListener('touchstart', mGames.eventDown);
        document.removeEventListener('touchmove', mGames.eventMove);
        document.removeEventListener('touchend', mGames.eventUp);
        document.removeEventListener('mousedown', mGames.eventDown);
        document.removeEventListener('mousemove', mGames.eventMove);
        document.removeEventListener('mouseup', mGames.eventUp);

        window.removeEventListener('blur', this.minimizeSoundPause);
        window.removeEventListener('focus', this.maximizeSoundPlay);
        background_music.stop();

        //game_over.stop();
        document.removeEventListener('keydown', dealWithKeyboard);
        document.removeEventListener('keyup', upWithKeyboard);

        mGames = undefined;
    }
    cleanMaterial(material) {
        // material.dispose()

        // // dispose textures
        // for (const key of Object.keys(material)) {
        //     const value = material[key]
        //     if (value && typeof value === 'object' && 'minFilter' in value) {
        //         value.dispose();
        //     }
        // }
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
