var rooftop;
class Game {
    constructor() {this.init();}
    init() {
        const game = this;
        this.counter = 0;
        this.isResize = 0;
        this.mTex_fonts = Array(15);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x6eafe7);
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 0);//30
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
        this.gameUI = new ThreeUI(this.renderer.domElement, 1920);
        this.clock = new THREE.Clock();
        this.coords = new THREE.Vector2();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.mSel = 0;
        // var tex_img0 = loadTexture('assets/img0.jpeg');
        
        this.mTex_Back = loadUIRect(this.gameUI, 0, 0, 256, 256, '#ffffff');
        DrawTexture(this.mTex_Back, 0, 0, 4000, 1920);
        AssetLoader.progressListener = function (progress) { };
        AssetLoader.add.image('assets/drag.png');
        AssetLoader.add.image('assets/dragn.png');
        AssetLoader.add.image('assets/img0.png');
        AssetLoader.add.image('assets/img1.png');
        AssetLoader.load(function () {
            game.mTex_img0 = loadUI(game.gameUI, 'assets/img0.png', 0, 0, 0);
            game.mTex_img1 = loadUI(game.gameUI, 'assets/img1.png', 0, 0, 0);
            game.mTex_img1.alpha = 0.01;
            game.mTex_drag = loadUI(game.gameUI, 'assets/drag.png', 0, 0, 0);
           
            
            for (var i = 0; i < game.mTex_fonts.length; i++) {
                game.mTex_fonts[i] = createTexts(game.gameUI, "100", 20, "#fff", ThreeUI.anchors.center, ThreeUI.anchors.center, "center", "myfont");
            }
            game.mTex_dragn = loadUI(game.gameUI, 'assets/dragn.png', 0, 0, 0);
            game.mTex_dragn.isPress = false;
            game.mTex_dragn.mx = -260;
            game.mTex_dragn.open = false;
            game.start = 1;
            game.setScreen(GAMEMENU);
            
        });
        this.helper = new CannonHelper(this.scene);
        this.helper.addLights(this.renderer);
        document.addEventListener('keydown', dealWithKeyboard);
        document.addEventListener('keyup', upWithKeyboard);
        if (isMobile.any()){
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
        switch (clickval) {
            case 1:
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
        this.dx = this.mouse.x * (CANVAS_WIDTH/CANVAS_HEIGHT);
        this.Handle_Play(type);
        switch (GameScreen) {
            case GAMEMENU:
            case GAMEOVER:
            break;
            case GAMEPLAY:
                break;
        }

    }
    animate() {
        setTimeout(function () {requestAnimationFrame(function () { game.animate(); });}, 1000 / 40);
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
        this.DrawGameplay();
        if (this.isResize > 0) {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.gameUI.resize();
            this.isResize--;
        }
    }
    
    DrawGameplay() {
        
        DrawTexture(this.mTex_img0, 0, 0, 1080, 1920);
        // DrawTexture(this.mTex_img1,-1080+ ((260 + this.mTex_dragn.mx)/520)*1080, 0, 1080, 1920);
        DrawTexture(this.mTex_img1,0, 0, 1080, 1920);
        if(this.mTex_dragn.open == false){
            DrawTexture(this.mTex_drag, 0, 650, 725, 193);
            DrawTexture(this.mTex_dragn, this.mTex_dragn.mx, 655, 182, 182);
            DrawLbl(this.mTex_fonts[0], "Drag to right", 80, 670, CLR_WHT, 58);
        }else{
            this.mTex_fonts[0].visible=this.mTex_drag.visible =this.mTex_dragn.visible = false;
        }
        this.mTex_img1.alpha = (260 + this.mTex_dragn.mx)/520;
    }
    Handle_Play(type){
        var bounds = this.mTex_dragn.getBounds();
        console.log(type,mGame.mTex_dragn.isPress);
        if (this.mTex_dragn.open ==false && type==0 && ThreeUI.isInBoundingBox(this.coords.x, this.coords.y, bounds.x, bounds.y, bounds.width, bounds.height)) {
            this.mTex_dragn.isPress = true;
        }
        
        if(this.mTex_dragn.isPress == true){
            this.mTex_dragn.mx = this.dx*1000;
            if(this.mTex_dragn.mx > 250){
                this.mTex_dragn.open = true;
                this.mTex_dragn.mx = 260;
                this.mTex_dragn.isPress = false;
            }
            if(this.mTex_dragn.mx < -260){
                this.mTex_dragn.mx = -260;
            }
        }
        if(type == 2){
            
            this.mTex_dragn.isPress = false;
            this.mTex_dragn.mx = -260;
            if(this.mTex_dragn.open==true){
                this.mTex_dragn.mx = 260;
            }
            console.log(type,mGame.mTex_dragn.isPress);
        }

    }
    setScreen(scr) {
        GameScreen = scr;
        this.mTex_img0.visible = this.mTex_img1.visible = this.mTex_dragn.visible=this.mTex_drag.visible = false;
        this.mTex_fonts.forEach(element => {element.visible =false;});
    }
    reset(){
        mGame.mTex_dragn.isPress = false;
        mGame.mTex_dragn.mx = -260;
        mGame.mTex_dragn.open = false;
            
    }
    
}
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
