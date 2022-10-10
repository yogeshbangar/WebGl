var rooftop;
class Game {
    constructor() {this.init();}
    init() {
        const game = this;
        this.counter = 0;
        this.isResize = 0;
        this.go = 0;
        this.lJump = 0;
        this.mTex_fonts = Array(15);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x6eafe7);
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 1.0, -10);//30
        this.camera.rotation.set(-.2, 0, 0);//30
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.gameUI = new ThreeUI(this.renderer.domElement, 1280);
        this.clock = new THREE.Clock();
        this.coords = new THREE.Vector2();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.mSel = 0;
        var manager = new THREE.LoadingManager(loadModel);
        manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {

            console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        
        };
        manager.onError = function ( url ) {

            console.log( 'There was an error loading ' + url );
        
        };
        var shadowTex = loadTexture(SHADOW_64);
        var backText = loadTexture(BACK_64);
        var dishtxt = loadTexture(DISH2_64);
        var target = loadTexture(YELLOWMARK_64);
        var rlbf = loadTexture(RIGHT_64);
        var roof = loadTexture(TOP_64);
        var runTex = loadTexture(RUN_64);
        var jumpTex = loadTexture(JUMP_64);
        var rollTex = loadTexture(ROLL_64);
        rooftop = loadTexture(TOP2_64);
        rlbf.wrapS = THREE.RepeatWrapping; rlbf.wrapT = THREE.RepeatWrapping; rlbf.repeat.set(2, 30);
        var sideBuildTex = [];
        sideBuildTex.push(new THREE.TextureLoader().load(BR0_64));
        sideBuildTex.push(new THREE.TextureLoader().load(BR1_64));
        sideBuildTex.push(new THREE.TextureLoader().load(BR2_64));
        sideBuildTex.push(new THREE.TextureLoader().load(BR3_64));
        sideBuildTex.push(new THREE.TextureLoader().load(BR4_64));
        for (let i = 0; i < sideBuildTex.length; i++) {
            sideBuildTex[i].wrapS = THREE.RepeatWrapping; sideBuildTex[i].wrapT = THREE.RepeatWrapping; sideBuildTex[i].repeat.set(1, 10);
        }
        var geometry = new THREE.PlaneBufferGeometry(512, 100);
        backText.wrapS = THREE.RepeatWrapping; backText.wrapT = THREE.RepeatWrapping; backText.repeat.set(5, 1);
        var material = new THREE.MeshBasicMaterial({ map: backText });
        this.mBackPLan = new THREE.Mesh(geometry, material);
        this.scene.add(this.mBackPLan);
        var up = new THREE.Mesh(new THREE.PlaneBufferGeometry(512, 100), new THREE.MeshBasicMaterial({ color: 0xffffff }));
        this.mBackPLan.add(up);
        up.position.set(0, 98, .1);
        var down = new THREE.Mesh(new THREE.PlaneBufferGeometry(512, 100), new THREE.MeshBasicMaterial({ color: 0x6eafe7 }));//
        this.mBackPLan.add(down);
        down.position.set(0, -99, .1);
        this.mBackPLan.position.set(0, 0, -300);
        this.mBackPLan.rotation.set(-.2, 0, 0);
        var geometry = new THREE.PlaneBufferGeometry(2, 2);
        var material = new THREE.MeshBasicMaterial({ map: target, transparent: true });
        this.mTargetPlan = new THREE.Mesh(geometry, material);
        this.scene.add(this.mTargetPlan);
        this.mTargetPlan.position.set(0, 1.2, -150);
        this.mTargetPlan.rotation.set(0, 0, 0);
        this.tatasky = [];
        var material = new THREE.MeshBasicMaterial({ map: dishtxt, transparent: true });
        var geometry = new THREE.PlaneBufferGeometry(.5, 1);
        for (let i = 0; i < 20; i++) {
            this.tatasky.push(new THREE.Mesh(geometry, material));
            this.scene.add(this.tatasky[i]);
            this.tatasky[i].position.set(0, 0, -50);
        }
        this.tatasky2 = [];
        for (let i = 0; i < 10; i++) {
            this.tatasky2.push(new THREE.Mesh(geometry, material));
            this.scene.add(this.tatasky2[i]);
            this.tatasky2[i].position.set(0, 0, -50);
        }
        var geometry = new THREE.PlaneBufferGeometry(1, 2);
        this.skyTarget = new THREE.Mesh(geometry, material);
        this.scene.add(this.skyTarget);
        clr = 100;
        var MovingCubeGeom = new THREE.CubeGeometry(1, 1, 1);
        this.mLSide = [];
        this.mRSide = [];
        for (let i = 0; i < 10; i++) {
            this.mLSide.push(new THREE.Mesh(MovingCubeGeom, this.materialArr(sideBuildTex[i % 5], (i + 5) % 10)));
            this.scene.add(this.mLSide[i]);
            this.mRSide.push(new THREE.Mesh(MovingCubeGeom, this.materialArr(sideBuildTex[(i + 2) % 5], (i + 7) % 10)));
            this.scene.add(this.mRSide[i]);
            this.mLSide[i].scale.set(6, Math.random() * 2 + 3, 5);
            this.mRSide[i].scale.set(6, Math.random() * 2 + 3, 5);
            this.mLSide[i].position.set(-7, -10 + this.mLSide[i].scale.y * .5, -20 - i * 6);
            this.mRSide[i].position.set(7, -10 + this.mRSide[i].scale.y * .5, -20 - i * 6);
        }
        var MovingCubeGeom = new THREE.CubeGeometry(1, 1, 1);
        this.mBuilding = [];
        var z = -20;
        clr = 0;
        for (let i = 0; i < 10; i++) {
            var materialArray = [];
            materialArray.push(new THREE.MeshBasicMaterial({ map: rlbf }));
            materialArray.push(new THREE.MeshBasicMaterial({ map: rlbf }));
            materialArray.push(new THREE.MeshBasicMaterial({ map: roof }));
            materialArray.push(new THREE.MeshBasicMaterial({ map: roof }));
            materialArray.push(new THREE.MeshBasicMaterial({ map: rlbf }));
            materialArray.push(new THREE.MeshBasicMaterial({ map: rlbf }));
            this.mBuilding.push(new THREE.Mesh(MovingCubeGeom, materialArray));
            this.scene.add(this.mBuilding[i]);
            this.mBuilding[i].position.set(0, -5, -i * 6);
            this.mBuilding[i].scale.set(1.2, 10, 5);
            this.mBuilding[i].traverse(function (child) {
                if (child.isMesh) {
                    var color = createColor(.1);
                    for (let j = 0; j < child.material.length; j++) {
                        if (j == 2 || j == 3)
                            child.material[j].color = hexToRgb(BUILDCOLORS[i][0]);
                        else
                            child.material[j].color = hexToRgb(BUILDCOLORS[i][1]);
                    }
                }
            });
            if (i == 2 || i == 8) {
                var materialArray = [];
                materialArray.push(new THREE.MeshBasicMaterial({ color: BUILDCOLORS[i][1] }));
                materialArray.push(new THREE.MeshBasicMaterial({ map: rlbf, color: BUILDCOLORS[i][0] }));
                materialArray.push(new THREE.MeshBasicMaterial({ map: rlbf, color: BUILDCOLORS[i][0] }));
                materialArray.push(new THREE.MeshBasicMaterial({ map: rlbf, color: BUILDCOLORS[i][0] }));
                materialArray.push(new THREE.MeshBasicMaterial({ color: BUILDCOLORS[i][0] }));
                materialArray.push(new THREE.MeshBasicMaterial({ color: BUILDCOLORS[i][0] }));
                var build = new THREE.Mesh(MovingCubeGeom, materialArray);
                build.position.set(i == 8 ? 0.9 : -.9, 0, 0);
                build.scale.set(.81, 1.08, .51);
                this.mBuilding[i].add(build);
            }
        }
        this.myAudioFall = loadSound("FALL_MP3", FALL_MP3);
        this.myAudiocheer = loadSound("CHEER_MP3", CHEER_MP3);
        this.myAudiojump = loadSound("JUMP_MP3", JUMP_MP3);
        this.myAudiobg = loadSound("BG_SOUNDTRACK_MP3", BG_SOUNDTRACK_MP3);
        this.myAudiobg.loop = true;
        this.runner = new Runner(this,runTex,jumpTex,rollTex, shadowTex);
        this.mTex_Back = loadUIRect(this.gameUI, 0, 0, 256, 256, '#ffffff');
        DrawTexture(this.mTex_Back, 0, 0, 3000, 1280);
        AssetLoader.progressListener = function (progress) { };
        AssetLoader.add.image64('TITLE_64', TITLE_64);
        AssetLoader.add.image64('DISH_64', DISH_64);
        AssetLoader.add.image64('DISH2_64', DISH2_64);
        AssetLoader.add.image64('POWER_64', POWER_64);
        AssetLoader.add.image64('NAME_64', NAME_64);
        AssetLoader.add.image64('PLAY_64', PLAY_64);
        AssetLoader.add.image64('BOOKNOW_64', BOOKNOW_64);
        AssetLoader.add.image64('ICON1_64', ICON1_64);
        AssetLoader.add.image64('ICON2_64', ICON2_64);
        AssetLoader.add.image64('ICON3_64', ICON3_64);
        AssetLoader.add.image64('WELL_DONE_64', WELL_DONE_64);
        AssetLoader.add.image64('ENDSCREEN_64', ENDSCREEN_64);
        AssetLoader.add.image64('WHITE_IMAGE_64', WHITE_IMAGE_64);
        AssetLoader.add.image64('ONLINE_PAYMENT_64', ONLINE_PAYMENT_64);
        AssetLoader.add.image64('C0_64', C0_64);
        AssetLoader.add.image64('C1_64', C1_64);
        AssetLoader.add.image64('C2_64', C2_64);
        AssetLoader.add.image64('C3_64', C3_64);
        AssetLoader.add.image64('RS_64', RS_64);
        AssetLoader.add.image64('POWER1_64', POWER1_64);
        AssetLoader.add.image64('TRASPRENT_64', TRASPRENT_64);
        AssetLoader.load(function () {
          console.log("AssetLoader ");
            game.mTex_pBack = loadUIRect(game.gameUI, 0, 0, 256, 256, '#bbb');
            game.mTex_playBack = loadUIRect(game.gameUI, 0, 0, 256, 256, CLR_BLUE);
            game.mTex_trasprent = loadUI(game.gameUI, 'TRASPRENT_64', 0, 0, 0);
            game.mTex_title = loadUI(game.gameUI, 'TITLE_64', 0, 0, 0);
            game.mTex_power = loadUI(game.gameUI, 'POWER_64', 0, 0, 0);
            game.mTex_power1 = loadUI(game.gameUI, 'POWER1_64', 0, 0, 0);
            game.mTex_name = loadUI(game.gameUI, 'NAME_64', 0, 0, 0);
            game.mTex_play = loadUI(game.gameUI, 'PLAY_64', 0, 0, 1);
            game.mTex_book = loadUI(game.gameUI, 'BOOKNOW_64', 0, 0, 2);
            game.mTex_icons = [];
            game.mTex_icons.push(loadUI(game.gameUI, 'ICON1_64', 0, 0, 0));
            game.mTex_icons.push(loadUI(game.gameUI, 'ICON2_64', 0, 0, 0));
            game.mTex_icons.push(loadUI(game.gameUI, 'ICON3_64', 0, 0, 0));
            game.mTex_GO = [];
            game.mTex_GO.push(loadUI(game.gameUI, 'C3_64', 0, 0, 0));
            game.mTex_GO.push(loadUI(game.gameUI, 'C2_64', 0, 0, 0));
            game.mTex_GO.push(loadUI(game.gameUI, 'C1_64', 0, 0, 0));
            game.mTex_GO.push(loadUI(game.gameUI, 'C0_64', 0, 0, 0));
            game.mTex_welldone = loadUI(game.gameUI, 'WELL_DONE_64', 0, 0, 0);
            game.mTex_endscreen = loadUI(game.gameUI, 'ENDSCREEN_64', 0, 0, 0);
            game.mTex_whiteimage = loadUI(game.gameUI, 'WHITE_IMAGE_64', 0, 0, 0);
            game.mTex_onlinepay = loadUI(game.gameUI, 'ONLINE_PAYMENT_64', 0, 0, 0);
            game.mTex_disBack2 = loadUIRect(game.gameUI, 0, 0, 256, 256, '#4480bc');
            game.mTex_disBack = loadUIRect(game.gameUI, 0, 0, 256, 256, '#588fcf');
            game.mTex_dish = loadUI(game.gameUI, 'DISH_64', 0, 0, 0);
            game.mTex_rs = loadUI(game.gameUI, 'RS_64', 0, 0, 0);
            game.mTex_dish2 = loadUI(game.gameUI, 'DISH2_64', 0, 0, 0);
            game.mTex_power.anchor.x = ThreeUI.anchors.left;
            game.start = 1;
            for (var i = 0; i < game.mTex_fonts.length; i++) {
                game.mTex_fonts[i] = createTexts(game.gameUI, "100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "myfont");
            }
            game.setScreen(GAMEPLAY);
            game.setScreen(GAMELOAD);
        });
        this.helper = new CannonHelper(this.scene);
        this.helper.addLights(this.renderer);
        document.addEventListener('keydown', dealWithKeyboard);
        document.addEventListener('keyup', upWithKeyboard);
        // if (isMobile.any()){
            document.addEventListener('touchstart', e => { this.touchEvent(e, 0, 1); });
            document.addEventListener('touchmove', e => { this.touchEvent(e, 1, 1); });
            document.addEventListener('touchend', e => { this.touchEvent(e, 2, 1); });
        // } else {
            document.addEventListener('mousedown', e => { this.touchEvent(e, 0, 0); });
            document.addEventListener('mousemove', e => { this.touchEvent(e, 1, 0); });
            document.addEventListener('mouseup', e => { this.touchEvent(e, 2, 0); });
        // }

        window.addEventListener('resize', this.onWindowResize, false);


        document.addEventListener('visibilitychange', e => { this.visibility_change(document.visibilityState); });
        // document.addEventListener("blur", function () {this.visibility_change('hidden')});
        // document.addEventListener("focus", function () {this.visibility_change('visible')});

        window.addEventListener('blur', () => { this.visibility_change('hidden'); });
        window.addEventListener('focus',() => { this.visibility_change('visible'); });
        this.animate();
    }
    visibility_change(visibilityState){
        if (visibilityState === 'hidden') {
            if (GameScreen === GAMEPLAY||GameScreen === GAMEHELP){
                mGame.myAudiobg.pause();
            }
        }else{
            if (GameScreen === GAMEPLAY||GameScreen === GAMEHELP){
                mGame.myAudiobg.play();
            }
        }
    }
    materialArr(tex, i) {
        var materialArray = [];
        materialArray.push(new THREE.MeshBasicMaterial({ map: tex, color: BUILDCOLORS[i][1] }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: tex, color: BUILDCOLORS[i][0] }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: rooftop, color: BUILDCOLORS[i][0] }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: rooftop, color: BUILDCOLORS[i][1] }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: rooftop, color: BUILDCOLORS[i][1] }));
        materialArray.push(new THREE.MeshBasicMaterial({ map: rooftop, color: BUILDCOLORS[i][0] }));
        return materialArray;

    }
    Handle_Menu(clickval) {
        switch (clickval) {
            case 1:
                if (GameScreen == GAMEOVER) {
                    this.setScreen(GAMEPLAY);
                }
                this.setScreen(GAMEHELP);
                this.myAudiobg.play();
                this.myAudioFall.play();
                this.myAudiocheer.play();
                this.myAudiojump.play();


                mGame.myAudioFall.pause();
                mGame.myAudiocheer.pause();
                mGame.myAudiojump.pause();


                break;
            case 2:
                callAds();
                break;
        }
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
        this.dx = this.mouse.x * scale;
        switch (GameScreen) {
            case GAMEMENU:
            case GAMEOVER:
            break;
            case GAMEPLAY:
                if (type == 0) {
                    this.runner.dx = this.mouse.x * scale;
                    this.runner.dy = this.mouse.y;
                    this.runner.isDwon = true;
                }
                if (this.runner.isDwon) {

                    if (this.runner.dx - (this.mouse.x * scale) > .1) {
                        mGame.runner.tap(LEFT);
                        this.runner.isDwon = false;
                    }
                    if (this.runner.dx - (this.mouse.x * scale) < -.1) {
                        mGame.runner.tap(RIGHT);
                        this.runner.isDwon = false;
                    }
                    if (this.runner.dy - this.mouse.y < -.1) {
                        mGame.runner.tap(UP);
                        this.runner.isDwon = false;
                    }
                }
                if (type == 2) {
                    this.runner.isDwon = false;
                }
                break;
        }

    }
    animate() {
        setTimeout(function () {
            requestAnimationFrame(function () { game.animate(); });
        }, 1000 / 40);
        const game = this;
        this.delta = this.clock.getDelta();
        this.renderer.render(this.scene, this.camera);
        this.gameUI.render(this.renderer);
        this.counter++;
        if (this.start === undefined) {
            console.log("Game "+this.counter);
            this.counter =0;
            return;
        }
        switch (GameScreen) {
            case GAMEMENU:
                this.DrawMenu();
                break;
            case GAMEHELP:
                this.DrawHelp();
                break;
            case GAMEPLAY:
                this.DrawGameplay();
                break;
            case GAMEOVER:
                this.DrawOver();
                break;
            case GAMELOAD:
                DrawTexture(this.mTex_Back, 0, 0, 3000, 1280);
                if(this.mTex_fonts.length > 0)
                  DrawLbl(this.mTex_fonts[0], "Presents", 0, -1460, CLR_BLUE, 38);
                if (this.counter > 5){
                    this.setScreen(GAMEMENU);
                    this.DrawMenu();
                    // this.setScreen(GAMEOVER);
                }
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
    DrawMenu() {

        DrawTexture(this.mTex_title, 0, -550, 400 * .9, 105 * .9);
        DrawTexture(this.mTex_name, 0, -320, 375 * .9, 263 * .9);
        this.camera.rotation.set(-.07, 0, 0);//30
        this.camera.position.set(0, 1.0, -19);//30
        DrawLbl(this.mTex_fonts[0], "Presents", 0, -460, CLR_BLUE, 38);
        DrawLbl(this.mTex_fonts[1], "Find the roof to install a Tata Sky", 0, -170, CLR_BLUE, 38);
        DrawLbl(this.mTex_fonts[2], "connection & win exciting offers.", 0, -125, CLR_BLUE, 38);
        DrawTexture(this.mTex_play, 0, 500, 442, 117);
        this.runner.first.body.position.set(0, .4, -21);
        this.mBackPLan.position.set(0, 20, -300);
        this.runner.setshadwow();
        this.runner.shadow.position.z = this.runner.first.body.position.z + .2;


        if(this.counter % 10==1){
            this.runner.roll.annie.update(mGame.delta * 1000);
            this.runner.jump.annie.update(mGame.delta * 1000);
            this.runner.jump.body.visible = true;
            this.runner.roll.body.visible = true;
            this.runner.roll.body.position.set(0,5,-53);
            this.runner.jump.body.position.set(0,5,-53);
        }

    }
    DrawHelp() {
        DrawTexture(this.mTex_trasprent, 0, 0, 3000, 1280);
        this.mTex_trasprent.alpha = .8;
        // DrawTexture(this.mTex_title, 0, -580, 400 * .6, 105 * .6);
        DrawTexture(this.mTex_pBack, 0, -500, 360, 34);
        DrawTexture(this.mTex_title, 0, -600, 400 * .5, 105 * .5);
        DrawTexture(this.mTex_dish, 190, -500, 128 * 1.25, 128 * 1.25);
        DrawTexture(this.mTex_power, -178 + this.runner.time * .5, -500, this.runner.time, 30);
        DrawTexture(this.mTex_power1, -184, - 500, 16, 36);


        // if (this.camera.position.z < -10)
        this.camera.position.set(0, 1.0, -10);//30
        var scl = 1.2;
        DrawTexture(this.mTex_icons[0], -250, 450, 97 * scl, 84 * scl);
        DrawTexture(this.mTex_icons[1], -10, 300, 117 * scl, 134 * scl);
        DrawTexture(this.mTex_icons[2], 250, 450, 97 * scl, 84 * scl);
        this.camera.rotation.set(-.2, 0, 0);//30
        DrawLbl(this.mTex_fonts[0], "SWIPE LEFT\nTO MOVE LEFT", -250, 540, CLR_WHT, 30);
        DrawLbl(this.mTex_fonts[1], "SWIPE UP\nTO JUMP", 10, 420, CLR_WHT, 30);
        DrawLbl(this.mTex_fonts[2], "SWIPE RIGHT\nTO MOVE RIGHT", 250, 540, CLR_WHT, 30);
        DrawLbl(this.mTex_fonts[3], "Do not try this at home", 0, -430, CLR_BLUE, 36);

        scl = (this.counter % 30) * .05;
        if (this.counter % 30 == 0) {
            if (this.go < 3)
                this.go++;
            else {
                this.go++;
                this.setScreen(GAMEPLAY);
                // this.myAudiobg.play();
            }
        }
        this.mTex_GO.forEach(element => { element.visible = false; });
        DrawTexture(this.mTex_GO[this.go % 4], 0, -100, 128 * scl * (this.go == 3 ? 2 : 1), 128 * scl);
        this.mTargetPlan.position.set(0, 1.2, -150);
        this.runner.y = RHIGHT;
        this.runner.first.body.position.set(0, this.runner.y, -13);
        this.runner.setshadwow();
        this.runner.shadow.position.z = this.runner.first.body.position.z + .3;
        this.runner.roll.body.position.set(0,5,53);
        this.runner.jump.body.position.set(0,5,53);
    }
    DrawOver() {
        DrawTexture(this.mTex_Back, 0, 0, 3000, 1280);
        this.mTex_Back.alpha = .3;

        DrawTexture(this.mTex_title, 0, -550, 400 * .9, 105 * .9);
        DrawTexture(this.mTex_welldone, 0, -380, 489 * .99, 77 * .99);
        // DrawLbl(mGame.mTex_fonts[2], "Get     200 off on", 0, -220, CLR_BLUE, 38);
        DrawLbl(mGame.mTex_fonts[2], "You have won     150 off on ", 0, -220, CLR_BLUE, 38);
        DrawTexture(this.mTex_rs, 24, -232, 32 * .56, 64 * .56);
        DrawTexture(this.mTex_onlinepay, 0, -180, 391 * 1.1, 33 * 1.1);
        DrawTexture(this.mTex_whiteimage, 0, -50, 345 * 1.1, 133 * 1.1);
        DrawTexture(this.mTex_endscreen, -180, 200, 316 * 0.8, 270 * 0.8);
        DrawLbl(mGame.mTex_fonts[1], "Book your Tata Sky\nconnection now & get\nsavings & flexibility\nlike never before.", 0, 160, CLR_BLUE, 32, 'left');
        // DrawLbl(mGame.mTex_fonts[1], "Book your Tata sky\nconnection today and\nwin exciting offers!\nGet savings & flexibility\nlike never before.", 0, 160, CLR_BLUE, 32, 'left');
        DrawLbl(mGame.mTex_fonts[3], "Play Again", 0, 585, CLR_BLUE, 46);
        DrawTexture(this.mTex_book, 0, 450, 487 * .9, 126 * .9);
        DrawTexture(this.mTex_play, 0, 550, 487, 126);
        this.mTex_play.alpha = .01;
        DrawTexture(this.mTex_playBack, 0, 600, 200, 6);
        this.mBackPLan.position.set(0, -20, -300);
        this.mTargetPlan.visible = this.runner.first.body.visible = false;
        this.skyTarget.visible = false;
        this.mTex_dish.visible = this.mTex_power.visible =  this.mTex_power1.visible =  this.mTex_power1.visible = false;
    }
    DrawGameplay() {
        if(this.go < 3){
            DrawLbl(mGame.mTex_fonts[0], "Game continues in", 0, -300, CLR_BLUE, 46);
            this.mTex_GO.forEach(element => { element.visible = false; });
            var scl = (this.counter % 30) * .05;
            DrawTexture(this.mTex_GO[this.go % 4], 0, -100, 128 * scl * (this.go == 3 ? 2 : 1), 128 * scl);
            this.runner.spd = 0;
            if (this.counter % 30 == 0) {
                this.go++;
                if (this.go == 3){
                    this.go = 10;
                    mGame.mTex_fonts[0].visible = false;
                }
            }
        }


        var isIn = false;
        var yi = 0;
        var syi = -1;
        var rp = 0;
        var isLast = -1;
        for (let i = 0; i < this.mBuilding.length && this.runner.over == 0 && isLast == -1; i++) {
            if (CircRectsOverlap(this.mBuilding[i].position.x, this.mBuilding[i].position.z, this.mBuilding[i].scale.x * 1, this.mBuilding[i].scale.z * .5, 0,this.mTargetPlan.position.z, .1)) {
                this.tatasky2[i].visible = false;
                isLast = i;
                this.runner.time = this.mBuilding[i].position.z + MAXLNG;
            }
        }
        for (let i = 0; i < this.mBuilding.length && this.runner.over == 0; i++) {
            this.mBuilding[i].position.z += this.runner.spd;

            if (CircRectsOverlap(this.mBuilding[i].position.x, this.mBuilding[i].position.z, this.mBuilding[i].scale.x * .5, this.mBuilding[i].scale.z * .5, this.runner.x, this.runner.z, .01)) {
                yi = i;
                this.lJump = i;
                var bH = this.mBuilding[yi].position.y + this.mBuilding[yi].scale.y * .5 + RHIGHT;
                if (this.runner.y > bH - .2 && this.runner.y <= bH) {
                    isIn = true;
                    this.runner.onBase = 0;
                    if (this.runner.time >= MAXLNG-20 && this.runner.gComp == 0 && isLast==i) {
                        this.runner.gComp = 1;
                        console.log("this.runner.gComp = "+this.runner.gComp);
                    }
                } else if (this.runner.y < bH - .2) {
                    this.runner.spd = 0.0;
                    this.runner.over = 1;
                    this.mBuilding[i].position.z -= .1;
                }

                syi = i;
            }
            if ((this.mBuilding[i].position.z - this.mBuilding[i].scale.z * .5) < this.mTargetPlan.position.z && (this.mBuilding[i].position.z + this.mBuilding[i].scale.z * .5) > this.mTargetPlan.position.z) {
                rp = i;
            }


        }
        for (let i = 0; i < this.mBuilding.length && this.runner.over == 0 && isLast == -1; i++) {
            if (CircRectsOverlap(this.mBuilding[i].position.x, this.mBuilding[i].position.z, this.mBuilding[i].scale.x * 1, this.mBuilding[i].scale.z * .7, 0,this.mTargetPlan.position.z, .1)) {
                isLast = i;
                this.runner.time-=1;
                console.log(this.mBuilding[i].position.z,' !!i = '+i,this.mTargetPlan.position.z);
            }
        }
        if (isIn == true || this.runner.gComp > 0) {
            this.runner.vy = 0.0;
            this.runner.y = this.mBuilding[yi].position.y + this.mBuilding[yi].scale.y * .5 + RHIGHT;
        }
        this.runner.sy = this.mBuilding[yi].position.y + this.mBuilding[yi].scale.y * .5;
        this.runner.shadow.visible = syi != -1;
        for (let i = 0; i < this.mBuilding.length; i++) {
            if (this.mBuilding[i].position.z > -0) {
                var j = (i == 0 ? this.mBuilding.length : i) - 1;
                var x = this.mBuilding[j].position.x + (random(0, 2) == 0 ? -.5 : .5);
                if (this.mBuilding[j].position.x > 1) {
                    var x = this.mBuilding[j].position.x - .5;
                }
                if (this.mBuilding[j].position.x < -1) {
                    var x = this.mBuilding[j].position.x + .5;
                }
                this.mBuilding[i].position.z = this.mBuilding[j].position.z - (this.mBuilding[j].scale.z + this.mBuilding[i].scale.z) * .5 - GAP;
                this.mBuilding[i].position.x = x;
                if (this.mBuilding[i].position.z < -MAXLNG + this.runner.time+20) {
                    this.mBuilding[i].position.x = 0;
                }
            }

        }
        for (let i = 0; i < this.mRSide.length; i++) {
            this.mRSide[i].position.z += this.runner.spd * .5;
            this.mLSide[i].position.z += this.runner.spd * .5;
            if (this.mLSide[i].position.z > -10) {
                var j = (i == 0 ? this.mLSide.length : i) - 1;
                this.mLSide[i].position.z = this.mRSide[j].position.z - 7;
            }
            if (this.mRSide[i].position.z > -10) {
                var j = (i == 0 ? this.mLSide.length : i) - 1;
                this.mRSide[i].position.z = this.mRSide[j].position.z - 7;
            }
            // if (i % 2 == 0)
                this.tatasky[i].position.set(-7 + this.mLSide[i].scale.x * .40, this.mLSide[i].position.y + this.mLSide[i].scale.y * .5 + .3, this.mLSide[i].scale.z * .40 + this.mLSide[i].position.z);
            // else
                this.tatasky[i+10].position.set(7 - this.mLSide[i].scale.x * .40, this.mRSide[i].position.y + this.mRSide[i].scale.y * .5 + .3, this.mLSide[i].scale.z * .40 + this.mLSide[i].position.z);
        }
        for (let i = 0; i < this.tatasky2.length; i++) {
            var j = i;
            this.tatasky2[i].position.set(this.mBuilding[j].position.x + this.mBuilding[j].scale.x * .5 - .15, this.mBuilding[j].position.y + this.mBuilding[j].scale.y * .5 + .3, this.mBuilding[j].position.z);
        }
        this.runner.update();

        // TWEEN.update();
        // new TWEEN.Tween(mGame.camera).to({ position: {x: this.runner.x * .8, y: 1 + this.runner.y * .8}}, 200).start();
        // this.camera.position.x = this.runner.x * .8;
        // this.camera.position.y = 1 + this.runner.y * .8;




        DrawTexture(this.mTex_title, 0, -600, 478 * .5, 121 * .5);
        if(this.runner.gComp==0){
            DrawTexture(this.mTex_pBack, 0, -500, 360, 34);
            DrawTexture(this.mTex_dish, 190, -500, 128 * 1.25, 128 * 1.25);
            DrawTexture(this.mTex_power, -178 + this.runner.time * .5 * (360.0 / MAXLNG), -500, this.runner.time * (360.0 / MAXLNG), 30);
            DrawTexture(this.mTex_power1, -184, - 500, 16, 36);
        }else{
            this.mTex_dish.visible = this.mTex_power.visible =  this.mTex_power1.visible = this.mTex_pBack.visible=false;
        }

        this.mTargetPlan.position.set(0, 1.0, this.runner.time-MAXLNG);
        // if (this.mTargetPlan.position.z > -20) {
        //     this.mTargetPlan.position.set(this.mBuilding[rp].position.x, 1.2, -20);
        // }
        // if (this.mTargetPlan.position.z < -200) {
        //     this.mTargetPlan.position.set(0, 1.2, -200);
        // }
        // if (this.runner.gComp > 0) {
        //     this.mTargetPlan.position.set(this.mBuilding[rp].position.x, 1.2, this.skyTarget.position.z - .5);
        // }
        if (this.runner.gComp > 130) {
            setTimeout(() => { confetti.reset(); }, 50);
            this.setScreen(GAMEOVER);
        }
        // this.mTargetPlan.position.set(0, 1.2, sy);
    }

    setScreen(scr) {
        GameScreen = scr;
        this.mTex_icons.forEach(element => { element.visible = false; });
        this.mTex_GO.forEach(element => { element.visible = false; });
        this.skyTarget.visible = this.mTex_power1.visible = this.mTex_book.visible = this.mTex_playBack.visible = false;
        this.mTex_title.visible = this.mTex_dish.visible = this.mTex_power.visible = this.mTex_pBack.visible = this.mTex_play.visible = false;
        this.mTex_rs.visible = this.mTex_Back.visible = this.mTex_name.visible = false;
        this.mTex_fonts.forEach(element => { element.visible = false; });
        this.mLSide.forEach(element => { element.visible = false; });
        this.mRSide.forEach(element => { element.visible = false; });
        this.mBuilding.forEach(element => { element.visible = false; });

        this.mTargetPlan.visible = true;
        this.mTex_trasprent.visible = this.mTex_disBack2.visible = this.mTex_disBack.visible = this.mTex_dish2.visible = false;

        this.tatasky.forEach(element => { element.visible = true; });
        this.tatasky2.forEach(element => { element.visible = true; });
        this.mTex_welldone.visible = this.mTex_endscreen.visible = this.mTex_whiteimage.visible = this.mTex_onlinepay.visible = false;
        this.mBackPLan.position.set(0, 10, -300);
        switch (GameScreen) {
            case GAMELOAD:
                DrawTexture(this.mTex_Back, 0, 0, 3000, 1280);
                break;
            case GAMEMENU:
                this.mLSide.forEach(element => { element.visible = true; });
                this.mRSide.forEach(element => { element.visible = true; });
                this.mBuilding.forEach(element => { element.visible = true; });

                for (let i = 0; i < this.mRSide.length; i++) {
                    this.mLSide[i].position.set(-7, -30 + this.mLSide[i].scale.y * .5, -30 - i * 10);
                    this.mRSide[i].position.set(7, -30 + this.mRSide[i].scale.y * .5, -30 - i * 10);

                }
                this.runner.first.body.visible = true;
                break;
            case GAMEPLAY:
                this.go = 10;
                this.mLSide.forEach(element => { element.visible = true; });
                this.mRSide.forEach(element => { element.visible = true; });
                this.mBuilding.forEach(element => { element.visible = true; });

                this.runner.first.body.visible = true;

                for (let i = 0; i < this.mRSide.length; i++) {
                    this.mLSide[i].scale.set(6 + Math.random(), Math.random() * 5 + 25, 5 + 2 * Math.random());
                    this.mRSide[i].scale.set(6 + Math.random(), Math.random() * 5 + 25, 5 + 2 * Math.random());

                    this.mLSide[i].position.set(-7, -30 + this.mLSide[i].scale.y * .5, -20 - i * 7);
                    this.mRSide[i].position.set(7, -30 + this.mRSide[i].scale.y * .5, -20 - i * 7);
                }
                var z = -17.0;
                var x = 0;
                for (let i = 0; i < this.mBuilding.length; i++) {
                    if (i < 1)
                        x = 0;
                    else {
                        x = this.mBuilding[i - 1].position.x + (random(0, 2) == 0 ? -.5 : .5);
                        if (this.mBuilding[i - 1].position.x > 1) {
                            x = this.mBuilding[i - 1].position.x - .5;
                        }
                        if (this.mBuilding[i - 1].position.x < -1) {
                            x = this.mBuilding[i - 1].position.x + .5;
                        }
                    }
                    this.mBuilding[i].scale.set(positionArr[i][0], positionArr[i][1] + 20, positionArr[i][2]);
                    this.mBuilding[i].position.set(positionArrx[i], -30 + this.mBuilding[i].scale.y * .5, z);
                    if (i < this.mBuilding.length - 1)
                        z -= GAP + (positionArr[i][2] + positionArr[i + 1][2]) * .5;
                    //
                }


                for (let i = 0; i < this.tatasky2.length; i++) {
                    var j = i;
                    this.tatasky2[i].scale.set(.5, .5, .5);
                    this.tatasky2[i].position.set(this.mBuilding[j].position.x + this.mBuilding[j].scale.x * .5 - .15, this.mBuilding[j].position.y + this.mBuilding[j].scale.y * .5 + .3, this.mBuilding[j].position.z);
                }




                this.runner.reset();
                break;
            case GAMEOVER:

                this.tatasky.forEach(element => { element.visible = false; });
                this.tatasky2.forEach(element => { element.visible = false; });
                this.runner.shadow.visible = false;
                // this.mBackPLan.children[0].traverse(function (child) {
                //     if (child.isMesh) {
                //         child.material.color = new THREE.Color('rgb(110,175,231)');
                //     }
                // });
                // this.mBackPLan.children[0].position.set(0, -110, 0.1);
                break;
            case GAMEHELP:
                this.go = 0;
                this.runner.revive();
                this.runner.first.body.visible = true;
                this.mLSide.forEach(element => { element.visible = true; });
                this.mRSide.forEach(element => { element.visible = true; });
                this.mBuilding.forEach(element => { element.visible = true; });
                this.counter = 0;
                // this.mBackPLan.children[0].traverse(function (child) {
                //     if (child.isMesh) {
                //         child.material.color = new THREE.Color('rgb(255,255,255)');
                //     }
                // });
                // this.mBackPLan.children[0].position.set(0, 130, .1);
                break;
        }
        for (let i = 0; i < this.mRSide.length; i++) {
            // if (i % 2 == 0)
                this.tatasky[i].position.set(-7 + this.mLSide[i].scale.x * .40, this.mLSide[i].position.y + this.mLSide[i].scale.y * .5 + .3, this.mLSide[i].scale.z * .40 + this.mLSide[i].position.z);
            // else
                this.tatasky[i+10].position.set(7 - this.mLSide[i].scale.x * .40, this.mRSide[i].position.y + this.mRSide[i].scale.y * .5 + .3, this.mLSide[i].scale.z * .40 + this.mLSide[i].position.z);
        }
    }
    revive() {
        this.runner.revive();
        var z = -17.0;
        var x = 0;
        for (let i = 0; i < this.mBuilding.length; i++) {
            if (i < 1)
                x = 0;
            else {
                x = this.mBuilding[i - 1].position.x + (random(0, 2) == 0 ? -.5 : .5);
                if (this.mBuilding[i - 1].position.x > 1) {
                    x = this.mBuilding[i - 1].position.x - .5;
                }
                if (this.mBuilding[i - 1].position.x < -1) {
                    x = this.mBuilding[i - 1].position.x + .5;
                }
            }
            this.mBuilding[i].scale.set(positionArr[i][0], positionArr[i][1] + 20, positionArr[i][2]);
            this.mBuilding[i].position.set(positionArrx[i], -30 + this.mBuilding[i].scale.y * .5, z);
            if (i < this.mBuilding.length - 1)
                z -= 2 + (positionArr[i][2] + positionArr[i + 1][2]) * .5;
            if (this.mBuilding[i].position.z < -MAXLNG + this.runner.time) {
                this.mBuilding[i].position.x = 0;
            }
            if(this.runner.time)
            this.tatasky2[i].visible = true;
        }
        var move = 0;
        if (this.lJump > 2 && this.lJump < 6) {
            move = 3;
        }
        if (this.lJump >= 6) {
            move = 6;
        }
        while (this.mBuilding[move].position.z < -18) {
            for (let i = 0; i < this.mBuilding.length; i++) { this.mBuilding[i].position.z += 2; }
            for (let i = 0; i < this.mBuilding.length; i++) {
                if (this.mBuilding[i].position.z > -0) {
                    var j = (i == 0 ? this.mBuilding.length : i) - 1;
                    var x = this.mBuilding[j].position.x + (random(0, 2) == 0 ? -.5 : .5);
                    if (this.mBuilding[j].position.x > 1) {
                        var x = this.mBuilding[j].position.x - .5;
                    }
                    if (this.mBuilding[j].position.x < -1) {
                        var x = this.mBuilding[j].position.x + .5;
                    }
                    this.mBuilding[i].position.z = this.mBuilding[j].position.z - (this.mBuilding[j].scale.z + this.mBuilding[i].scale.z) * .5 - GAP;
                    this.mBuilding[i].position.x = x;
                    if (this.mBuilding[i].position.z < -MAXLNG + this.runner.time+20) {
                        this.mBuilding[i].position.x = 0;
                    }
                }
            }
        }

        this.go = 0;
        this.counter = 0;
    }
}
positionArrx = [0, -.41, 0, .1, -.10, -1, .21, .1, -.1, -.51];
// positionArr = [[1.2, 10, 13], [2, 9.5, 4], [1.8, 9.5, 3.2], [2, 9.8, 10], [1.4, 9.5, 4.2], [2, 9.8, 5], [2, 9.5, 10], [1.2, 10, 5], [2, 9.5, 4.5], [2, 10, 4.5]];
positionArr = [[1.2, 10, 13], [2, 9.5, 6], [1.8, 9.5, 7], [2, 9.8, 10], [1.4, 9.5, 7], [2, 9.8, 7], [2, 9.5, 10], [1.2, 10, 7], [2, 9.5, 6], [2, 10, 8]];
class CannonHelper {
    constructor(scene) {
        this.scene = scene;
    }
    addLights(renderer) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        const ambient = new THREE.AmbientLight(0xeeeeee, .6);
        this.scene.add(ambient);
        const light = new THREE.DirectionalLight(0xdddddd, .1);
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
