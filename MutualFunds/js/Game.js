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
    this.scene.background = new THREE.Color(0x181f32);
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 100, 420); //30
    // this.camera.lookAt(new THREE.Vector3(0, 20, 0));
    this.camera.position.set(0, 1000, 0); //30
    // this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.camera.position.set(0, 30, 350); //30
    // this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.camera.position.set(0, 34, 348); //30
    this.camera.rotation.set(-Math.PI * 0.04, Math.PI * ry, Math.PI * rz); //30

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    this.gameUI = new ThreeUI(this.renderer.domElement, 1280);
    this.clock = new THREE.Clock();
    this.coords = new THREE.Vector2();
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.mSel = 0;

    var texture_bow = loadTexture("assets/bowler.png");
    var texture_bat = loadTexture("assets/batsman.png");
    var texture_filder = loadTexture("assets/s1min.png");
    var texture_ground = loadTexture("assets/ground.jpg");
    var texture_stadium = loadTexture("assets/stadium.jpg");
    var texture_pitch = loadTexture("assets/pitch.jpg");
    var texture_balltex = loadTexture("assets/balltex.jpg");
    var texture_citi = loadTexture("assets/sahiHai.jpg");
    texture_ground.wrapS = THREE.RepeatWrapping;
    texture_ground.wrapT = THREE.RepeatWrapping;
    texture_ground.repeat.set(16, 16);
    this.Ground = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(580, 580, 1, 1),
      new THREE.MeshBasicMaterial({ map: texture_ground })
    );
    this.Ground.rotation.set(-Math.PI * 0.5, 0, 0);
    this.scene.add(this.Ground);
    var material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: texture_stadium,
    });
    this.sPublic = new THREE.Mesh(
      new THREE.CylinderGeometry(
        500,
        300,
        200,
        16,
        0.5,
        true,
        Math.PI * 0.5,
        Math.PI * 1
      ),
      material
    );
    this.scene.add(this.sPublic);
    this.sPublic.position.set(0, 100, 0);
    this.sPublic.visible = true;
    var material = new THREE.MeshBasicMaterial({ map: texture_pitch });
    this.pitch = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(70 * 0.5, 280 * 0.5, 1, 1),
      material
    );
    this.scene.add(this.pitch);
    this.pitch.rotation.set(-Math.PI * 0.5, 0, Math.PI * 0.5);
    this.pitch.position.set(0, 0.1, 0);

    var material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: texture_citi,
    });
    texture_citi.wrapS = THREE.RepeatWrapping;
    texture_citi.wrapT = THREE.RepeatWrapping;
    texture_citi.repeat.set(8, 1);
    this.citi = new THREE.Mesh(
      new THREE.CylinderGeometry(
        300,
        300,
        16,
        16,
        0.5,
        true,
        Math.PI * 0.5,
        Math.PI * 1
      ),
      material
    );
    // this.scene.add(this.citi);
    this.citi.position.y = 6;

    var batsman = TexSingle(texture_bat, 1, 1, 1, 36);
    this.scene.add(batsman.mBody);
    var bowler = TexSingle(texture_bow, 1, 1, 1, 40);
    this.scene.add(bowler.mBody);

    var filder = TexSingle(texture_filder, 8, 16, 128, 40);
    this.scene.add(filder.mBody);
    filder.mBody.visible = true;

    var shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1, 8),
      new THREE.PointsMaterial({
        color: 0x000000,
        opacity: 0.8,
        transparent: true,
      })
    );
    this.scene.add(shadow);

    var ball = new THREE.Mesh(
      new THREE.SphereGeometry(1, 16, 16),
      new THREE.MeshLambertMaterial({ map: texture_balltex })
    );
    this.scene.add(ball);
    ball.position.set(0, 0, 0);
    this.mBall = new Ball(ball, batsman, bowler, filder, shadow);

    AssetLoader.add.image("assets/mf.png");

    AssetLoader.add.image("assets/over.jpeg");
    AssetLoader.add.image("assets/help.jpeg");
    AssetLoader.add.image("assets/home.jpeg");
    AssetLoader.add.image("assets/jersey.jpeg");
    AssetLoader.add.image("assets/play.png");
    AssetLoader.add.image("assets/conti.png");
    AssetLoader.add.image("assets/icon1.png");
    AssetLoader.add.image("assets/icon2.png");
    this.rect = loadUIRect(game.gameUI, 0, 0, 2950, 1280, "#000000");
    this.rect.visible = true;
    AssetLoader.progressListener = function (progress) {};
    AssetLoader.load(function () {
      game.mTex_over = loadUI(game.gameUI, "assets/over.jpeg", 0, 0, 0);
      game.mTex_help = loadUI(game.gameUI, "assets/help.jpeg", 0, 0, 0);
      game.mTex_home = loadUI(game.gameUI, "assets/home.jpeg", 0, 0, 0);
      game.mTex_jersey = loadUI(game.gameUI, "assets/jersey.jpeg", 0, 0, 0);
      game.mTex_mf = loadUI(game.gameUI, "assets/mf.png", 0, 0, 0);
      game.mTex_play = loadUI(game.gameUI, "assets/play.png", 0, 0, 1);
      game.mTex_conti = loadUI(game.gameUI, "assets/conti.png", 0, 0, 2);

      game.mTex_icon1 = loadUI(game.gameUI, "assets/icon1.png", 0, 0, 0);
      game.mTex_icon2 = loadUI(game.gameUI, "assets/icon2.png", 0, 0, 0);

      for (var i = 0; i < game.mTex_fonts.length; i++) {
        game.mTex_fonts[i] = createTexts(
          game.gameUI,
          "100",
          20,
          "#fff",
          ThreeUI.anchors.center,
          ThreeUI.anchors.center,
          "center",
          "myfont"
        );
      }
      game.setScreen(GAMEMENU);
      // game.setScreen(GAMEPLAY);
      game.start = 1;
    });
    this.helper = new CannonHelper(this.scene);
    this.helper.addLights(this.renderer);
    document.addEventListener("keydown", dealWithKeyboard);
    if (isMobile.any()) {
      document.addEventListener("touchstart", (e) => {
        this.touchEvent(e, 0, 1);
      });
      document.addEventListener("touchmove", (e) => {
        this.touchEvent(e, 1, 1);
      });
      document.addEventListener("touchend", (e) => {
        this.touchEvent(e, 2, 1);
      });
    } else {
      document.addEventListener("mousedown", (e) => {
        this.touchEvent(e, 0, 0);
      });
      document.addEventListener("mousemove", (e) => {
        this.touchEvent(e, 1, 0);
      });
      document.addEventListener("mouseup", (e) => {
        this.touchEvent(e, 2, 0);
      });
    }
    window.addEventListener("resize", this.onWindowResize, false);
    this.animate();
  }
  Handle_Menu(clickval) {
    console.log("clickval yogesh " + clickval);
    if (clickval == 1) {
      this.setScreen(GAMEJERSEY);
    }
    if (clickval == 2) {
      this.setScreen(GAMEHELP);
    }
  }
  onWindowResize() {
    mGame.camera.aspect = window.innerWidth / window.innerHeight;
    mGame.camera.updateProjectionMatrix();
    mGame.renderer.setSize(window.innerWidth, window.innerHeight);
    mGame.isResize = 5;
  }
  touchEvent(e, type, sys) {
    var scale =
      this.gameUI.height /
      this.gameUI.gameCanvas.getBoundingClientRect().height;
    var CANVAS_HEIGHT = window.innerHeight;
    var CANVAS_WIDTH = window.innerWidth;
    if (e.touches != null) {
      if (e.touches.length > 0) {
        this.mouse.x = (e.touches[0].pageX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(e.touches[0].pageY / window.innerHeight) * 2 + 1;
        this.coords.x =
          (e.touches[0].pageX -
            (window.innerWidth -
              this.gameUI.gameCanvas.getBoundingClientRect().width) /
              2) *
          scale;
        this.coords.y = e.touches[0].pageY * scale;
      }
    } else {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this.coords = { x: e.clientX, y: e.clientY };
      this.coords.x =
        (e.clientX -
          (window.innerWidth -
            this.gameUI.gameCanvas.getBoundingClientRect().width) /
            2) *
        scale;
      this.coords.y = e.clientY * scale;

      var elem = this.renderer.domElement,
        boundingRect = elem.getBoundingClientRect(),
        x =
          (event.clientX - boundingRect.left) *
          (elem.width / boundingRect.width),
        y =
          (event.clientY - boundingRect.top) *
          (elem.height / boundingRect.height);
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
        break;
      case GAMEPLAY:
        this.mBall.tapScr(type);
        break;
      case GAMEHELP:
        if (type == 2 && this.counter > 10) {
          this.setScreen(GAMEPLAY);
        }
        break;
      case GAMERESULT:
        if (type == 2 && this.mouse.y < 0.8) {
          this.setScreen(GAMEHELP);
        }
        break;
    }
  }
  animate() {
    const game = this;
    setTimeout(function () {
      requestAnimationFrame(function () {
        game.animate();
      });
    }, 1000 / 40);
    this.delta = this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
    this.gameUI.render(this.renderer);
    this.counter++;
    if (this.start === undefined) {
      return;
    }

    switch (GameScreen) {
      case GAMEMENU:
        DrawTexture(this.mTex_home, 0, 0, 720, 1280);
        DrawTexture(this.mTex_play, 0, 500, 405, 130);
        break;
      case GAMEJERSEY:
        this.rect.visible = true;
        DrawTexture(this.mTex_jersey, 0, 0, 720, 1280);
        DrawTexture(this.mTex_conti, 0, 500, 405, 130);
        break;
      case GAMEHELP:
        this.rect.visible = true;
        DrawTexture(this.mTex_icon1, -240, 460, 117, 134);
        DrawTexture(this.mTex_icon2, 240, 460, 117, 134);
        DrawLbl(
          this.mTex_fonts[0],
          "SWIPE LEFT\nTO MOVE LEFT",
          -234,
          560,
          CLR_WHT,
          30
        );
        DrawLbl(
          this.mTex_fonts[1],
          "SWIPE RIGHT\nTO MOVE RIGHT",
          234,
          560,
          CLR_WHT,
          30
        );
        break;
      case GAMEPLAY:
        this.rect.visible = false;
        this.mBall.update(this.delta * 1000);
        DrawLbl(
          this.mTex_fonts[0],
          "" + mGame.mBall.run,
          170,
          -475,
          CLR_WHT,
          70
        );
        break;
      case GAMERESULT:
        DrawTexture(this.mTex_over, 0, 0, 720, 1280);
        DrawLbl(
          this.mTex_fonts[0],
          "" + this.mBall.run,
          -90 + sx,
          -12,
          CLR_WHT,
          80
        );
        break;
    }
    // this.camera.position.set(0, 30+sy, 350+sz);//30
    // this.camera.rotation.set(Math.PI*rx*.1, Math.PI*ry, Math.PI*rz);//30

    if (this.isResize > 0) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.gameUI.resize();
      this.isResize--;
    }
  }
  setScreen(scr) {
    this.mTex_fonts.forEach((element) => {
      element.visible = false;
    });
    this.mTex_over.visible =
      this.mTex_help.visible =
      this.mTex_home.visible =
      this.mTex_jersey.visible =
      this.mTex_mf.visible =
        false;
    this.mTex_conti.visible = this.mTex_play.visible = false;
    this.mTex_icon1.visible = this.mTex_icon2.visible = false;
    this.rect.visible = false;
    this.rect.alpha = 0.7;

    GameScreen = scr;
    switch (GameScreen) {
      case GAMEMENU:
        this.rect.visible = true;
        break;
      case GAMEPLAY:
        this.mBall.gameReset();
        DrawTexture(this.mTex_mf, 0, -500, 676, 242);
        break;
      case GAMERESULT:
        this.rect.visible = true;
        break;
      case GAMEHELP:
        this.rect.visible = true;
        this.counter = 0;
        break;
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
    const ambient = new THREE.AmbientLight(0xeeeeee, 0.9);
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
