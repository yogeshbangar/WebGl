class Game {
  constructor() {
    this.init();
  }
  shaderAdd() {
    this.renderSwap = false;
    this.postScene = new THREE.Scene();
    this.postCamera = new THREE.OrthographicCamera(
      -1, // left
      1, // right
      1, // top
      -1, // bottom
      -1, // near,
      1 // far
    );
    // this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    this.renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBFormat,
      }
    );

    this.RT1 = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );
    this.RT2 = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );
    this.RT3 = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );
    this.RT4 = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );
    this.RT5 = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );
    this.RT6 = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight
    );
    ////////////////////Shader///////////////////

    let uniforms = {
      tex1: {
        value: this.renderTarget.texture,
      },
      tex2: {
        value: this.RT2.texture,
      },
      tex3: {
        value: this.RT4.texture,
      },
      factor: {
        value: 0.8,
      },
      intensity: {
        value: 1.0,
      },
    };

    let uniformsP = {
      tex: {
        value: this.RT3.texture,
      },
    };

    let uniformsH = {
      tex: {
        value: this.renderTarget.texture,
      },
      width: { value: window.innerWidth },
      height: { value: window.innerHeight },
    };

    let uniformsV = {
      tex: {
        value: this.RT1.texture,
      },
      backbuffer: {
        value: this.RT3.texture,
      },
      width: { value: window.innerWidth },
      height: { value: window.innerHeight },
    };

    this.HorizontalBlur = new THREE.ShaderMaterial({
      uniforms: uniformsH,
      fragmentShader: Blurfs(),
      vertexShader: BlurHvs(),
    });
    this.VerticalBlur = new THREE.ShaderMaterial({
      uniforms: uniformsV,
      fragmentShader: Blurfs(),
      vertexShader: BlurVvs(),
    });

    this.FinalShader = new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: fragmentShader(),
      vertexShader: vertexShader(),
    });

    this.PostShader = new THREE.ShaderMaterial({
      uniforms: uniformsP,
      fragmentShader: simpleFragmentShader(),
      vertexShader: vertexShader(),
    });

    const materialShad = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      color: 0xff0ff0,
    });

    const plane = new THREE.PlaneBufferGeometry(2, 2);
    this.quad = new THREE.Mesh(plane, materialShad);
    this.postScene.add(this.quad);
  }
  renderCall() {
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

    this.quad.material = this.FinalShader;
    this.quad.material.uniforms.tex2.value = this.RT6.texture;
    this.quad.material.uniforms.intensity.value = 1;
    //this.quad.material.uniforms.tex2.value = this.RT2.texture;

    if (this.renderSwap) {
      this.renderSwap = false;
      this.quad.material.uniforms.tex3.value = this.RT4.texture;
      this.renderer.setRenderTarget(this.RT3);
      this.renderer.render(this.postScene, this.postCamera);
      this.renderer.setRenderTarget(null);
      this.quad.material = this.PostShader;
      this.quad.material.uniforms.tex.value = this.RT3.texture;
    } else {
      this.renderSwap = true;
      this.quad.material.uniforms.tex3.value = this.RT3.texture;
      this.renderer.setRenderTarget(this.RT4);
      this.renderer.render(this.postScene, this.postCamera);
      this.renderer.setRenderTarget(null);
      this.quad.material = this.PostShader;
      this.quad.material.uniforms.tex.value = this.RT4.texture;
    }

    this.renderer.render(this.postScene, this.postCamera);
  }
  init() {
    const game = this;
    this.counter = 0;
    this.isResize = 0;
    this.gameCounter = 0;

    this.mTex_fonts = Array(5);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1, 0); //30
    // this.shaderAdd();
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    shaderAdd(this);
    initObj(this);

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
    const manager = new THREE.LoadingManager(loadModel);
    manager.onProgress = function (item, loaded, total) {};
    function onProgress(xhr) {}
    function onError() {}

    const textureLoader = new THREE.TextureLoader();
    this.uniforms = {
      time: { value: 1.0 },
      texture: {
        value: new THREE.TextureLoader().load("assets/lava/lavatile.jpg"),
      },
    };
    this.uniforms["texture"].value.wrapS = this.uniforms[
      "texture"
    ].value.wrapT = THREE.RepeatWrapping;

    const size = 0.65;

    const materialShad = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: this.uniforms,
      vertexShader: document.getElementById("vertexShader").textContent,
      fragmentShader: document.getElementById("fragment_shader1").textContent,
    });

    this.cylinders = [];
    const geometryCylinder = new THREE.CylinderGeometry(
      8,
      8,
      40,
      32,
      1,
      true,
      Math.PI * 0.4,
      Math.PI * 2
    );
    const materialCylinder = new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load("assets/lava/lavatile.jpg"),
      side: THREE.DoubleSide,
      color: 0xff0000,
    });
    for (let i = 0; i < 0; i++) {
      const cylinder = new THREE.Mesh(geometryCylinder, materialCylinder);
      game.scene.add(cylinder);
      this.cylinders.push(cylinder);
      this.cylinders[i].position.set(0, 0, 1000);
    }

    const materiaBooster = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      color: 0xffffff,
    });
    const boosterGeom = new THREE.CubeGeometry(0.15, 0.15, 0.15); //, 1, 1, 1, materialArray);
    this.boosters = [];
    for (let i = 0; i < 0; i++) {
      const booster = new THREE.Mesh(boosterGeom, materiaBooster);
      game.scene.add(booster);
      booster.position.set(0, 0, -i * 10);
      this.boosters.push(booster);
    }

    const objLoader = new THREE.OBJLoader(manager);
    objLoader.load(
      "assets/power.obj",
      function (obj) {
        obj.traverse(function (child) {
          if (child.isMesh) {
            const material = new THREE.MeshStandardMaterial({
              color: 0xffff00,
              metalness: 0,
              roughness: 1,
              envMapIntensity: 1.0,
            });
            child.material = material;
          }
        });
        for (let i = 0; i < 10; i++) {
          const booster = obj.clone();
          booster.scale.set(0.03, 0.03, 0.03);
          game.scene.add(booster);
          game.boosters.push(booster);
        }
      },
      onProgress,
      onError
    );

    const movingCubeMaterial = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      color: 0xff00ff,
    });
    const MovingCubeGeom = new THREE.CubeGeometry(0.1, 0.1, 0.1);
    this.MovingCube = new THREE.Mesh(MovingCubeGeom, movingCubeMaterial);
    this.MovingCube.position.set(0, 0, -5);
    // this.scene.add(this.MovingCube);

    const geometry = new THREE.PlaneBufferGeometry(16, 16);
    const material = new THREE.MeshLambertMaterial({
      side: THREE.DoubleSide,
      color: 0xf2f0fa,
    });
    this.Gate = new THREE.Mesh(geometry, material);
    this.scene.add(this.Gate);

    Particle(this.scene);
    this.mixer = [];
    const loader = new THREE.GLTFLoader(manager);
    loader.load(
      "assets/WarpRide.gltf",
      function (obj) {
        console.log("GLTFLoader ");
        game.obj_WarpRide = obj;

        const objWarpRide = game.obj_WarpRide.scene;
        objWarpRide.traverse((object) => {
          if (!object["isMesh"]) return;
          const material = object["material"];
          if (material.isMaterial) {
            material.color.setHex(0xff0000);
          }
        });

        for (let i = 0; i < 9; i++) {
          const cylinder = objWarpRide.clone();
          game.scene.add(cylinder);
          game.cylinders.push(cylinder);

          for (let j = 0; j < cylinder.children[2].children.length; j++) {
            cylinder.children[2].children[j].visible = false;
            cylinder.children[2].children[(i % 3) + 2].visible = true;
            cylinder.children[2].children[1].visible = true;
            cylinder.children[2].children[5].visible = true;
          }
          const animations = obj.animations;
          if (animations && animations.length) {
            game.mixer.push(new THREE.AnimationMixer(cylinder));
            for (let k = 0; k < animations.length; k++) {
              const animation = animations[k];
              const action = game.mixer[i].clipAction(animation);
              game.mixer[i].used = 0;
              action.play();
            }
          }
        }
      },
      onProgress,
      onError
    );

    AssetLoader.progressListener = function (progress) {};
    AssetLoader.add.image("assets/logo.png");
    AssetLoader.add.image("assets/1.png");
    AssetLoader.add.image("assets/2.png");
    AssetLoader.add.image("assets/3.png");
    AssetLoader.add.image("assets/reload.png");
    AssetLoader.load(function () {
      game.mTex_logo = loadUIRect(game.gameUI, 0, 0, 1920, 1920, 0);
      const httLogo = loadUI(game.gameUI, "assets/logo.png", 0, 0);
      httLogo.parent = game.mTex_logo;
      httLogo.visible = true;
      game.mTex_logo.visible = true;
      game.start = 1;

      game.Number = [];
      game.Number.push(loadUI(game.gameUI, "assets/3.png", 0, 0));
      game.Number.push(loadUI(game.gameUI, "assets/2.png", 0, 0));
      game.Number.push(loadUI(game.gameUI, "assets/1.png", 0, 0));
      game.reload = loadUI(game.gameUI, "assets/reload.png", 0, 0);
      for (let i = 0; i < game.mTex_fonts.length; i++) {
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
      game.setScreen(GAMEPLAY);
    });

    this.helper = new CannonHelper(this.scene);
    this.helper.addLights(this.renderer);

    document.addEventListener("keydown", dealWithKeyboard);
    document.addEventListener("keyup", upWithKeyboard);

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
  }
  onWindowResize() {
    mGame.camera.aspect = window.innerWidth / window.innerHeight;
    mGame.camera.updateProjectionMatrix();
    mGame.renderer.setSize(window.innerWidth, window.innerHeight);
    mGame.isResize = 5;
  }
  touchEvent(e, type, sys) {
    const scale =
      this.gameUI.height /
      this.gameUI.gameCanvas.getBoundingClientRect().height;
    const CANVAS_HEIGHT = window.innerHeight;
    const CANVAS_WIDTH = window.innerWidth;
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
      console.log("e.touches.length = " + e.touches.length);
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

      const elem = this.renderer.domElement,
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
    let bounds;
    if (this.start === undefined) {
      return;
    }
    switch (GameScreen) {
      case GAMEMENU:
      case GAMEOVER:
        this.mSel = 0;
        bounds = this.reload.getBounds();
        if (
          ThreeUI.isInBoundingBox(
            this.coords.x,
            this.coords.y,
            bounds.x,
            bounds.y,
            bounds.width,
            bounds.height
          )
        ) {
          this.mSel = 1;
        }
        if (type == 2) {
          switch (this.mSel) {
            case 1:
              this.setScreen(GAMEPLAY);
              break;
          }
          this.mSel = 0;
        }
        break;
    }
  }

  animate() {
    setTimeout(function () {
      requestAnimationFrame(function () {
        game.animate();
      });
    }, 1000 / 50);

    const game = this;
    this.delta = this.clock.getDelta();
    // requestAnimationFrame(function () { game.animate(); });
    // this.renderer.render(this.scene, this.camera);
    // renderCall(this);
    update(this);

    this.gameUI.render(this.renderer);
    // this.renderCall();
    this.counter++;

    if (this.start === undefined) {
      return;
    }
    switch (GameScreen) {
      case GAMEPLAY:
        this.movemet();
        break;
      case GAMEOVER:
        DrawTexture(
          this.reload,
          0,
          360,
          128 * (this.mSel == 1 ? 1.1 : 1),
          128 * (this.mSel == 1 ? 1.1 : 1)
        );
        for (let i = 0; i < this.cylinders.length; i++) {
          // this.cylinders[i].rotation.set(Math.PI * .5, 0, 0);
          this.cylinders[i].position.set(0, 0, -220 * i);
        }

        break;
    }
    // this.uniforms["time"].value += 0.2 * this.delta;
    if (this.isResize > 0) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.gameUI.resize();
      this.isResize--;
    }
  }

  movemet() {
    if (this.gameCounter < 300) {
      this.Number.forEach((element) => {
        element.visible = false;
      });
      DrawTexture(
        this.Number[Math.floor(this.gameCounter / 100)],
        0,
        0,
        128 * (this.gameCounter % 100) * 0.02,
        128 * (this.gameCounter % 100) * 0.02
      );
      this.gameCounter += 4;
      if (this.gameCounter == 300) {
        this.Number.forEach((element) => {
          element.visible = false;
        });
      }
      this.boosAnim = 250;
      for (let i = 0; i < this.cylinders.length; i++) {
        this.cylinders[i].rotation.set(Math.PI, 0, 0);
        this.cylinders[i].position.set(0, 0, -110 - 220 * i);
      }
    } else {
      DrawLbl(this.mTex_fonts[0], "" + this.boosCount, 0, -850, CLR_WHT, 100);
      if (this.boosAnim > 0) {
        this.boosAnim--;
        this.camera.fov = 10;
        aniparticle();
        stars.visible = particles.visible = true;
        if (this.camera.position.y > 0.2) this.camera.position.y -= 0.025; //set(0, 1.2, 0);
        if (this.spd < 1.21) {
          this.spd += 0.005;
        }
      } else {
        if (this.camera.position.y < 1) this.camera.position.y += 0.025; //set(0, 1.2, 0);
        this.camera.fov = 40;
        stars.visible = particles.visible = false;
        if (this.spd < 0.2) {
          this.spd += 0.001;
        }
        if (this.spd > 0.2) {
          this.spd -= 0.005;
          if (this.spd < 0.2) {
            this.spd = 0.2;
          }
        }
      }

      this.Gate.position.z += this.spd;
      for (let i = 0; i < this.cylinders.length; i++) {
        this.cylinders[i].position.z += this.spd;
      }
      for (let i = 0; i < this.cylinders.length; i++) {
        if (this.cylinders[i].position.z > 220) {
          this.mixer[i].used = 0;
          const clyz =
            this.cylinders[(i == 0 ? this.cylinders.length : i) - 1].position
              .z - 220;
          if (clyz > this.Gate.position.z) this.cylinders[i].position.z = clyz;
        }
        if (this.cylinders[i].position.z > -50) {
          if (this.mixer[i]) {
            if (this.mixer[i].used < 0.8) this.mixer[i].update(this.delta);
            this.mixer[i].used += this.delta;
            // this.mixer[i].stopAllAction();
            // this.obj_WarpRide.animations.forEach(function (clip) {
            //     // mGame.mixer[i].clipAction(clip).stop();
            //     // console.log(clip.duration);
            // });
          }
        }
      }
      for (let i = 0; i < this.boosters.length; i++) {
        this.boosters[i].position.z += this.spd;
        if (this.spd < 1) {
          if (
            this.boosters[i].visible &&
            CircRectsOverlap(
              this.MovingCube.position.x,
              this.MovingCube.position.z,
              0.05,
              0.5,
              this.boosters[i].position.x,
              this.boosters[i].position.z,
              0.05
            )
          ) {
            this.boosters[i].visible = false;
            this.boosCount++;
          }
        } else {
          if (
            this.boosters[i].visible &&
            CircRectsOverlap(
              this.MovingCube.position.x,
              this.MovingCube.position.z,
              0.1,
              2,
              this.boosters[i].position.x,
              this.boosters[i].position.z,
              0.1
            )
          ) {
            this.boosters[i].visible = false;
            this.boosCount++;
          }
        }
      }
      for (let i = 0; i < this.boosters.length; i++) {
        if (this.boosters[i].position.z > 20) {
          this.boosters[i].position.z =
            this.boosters[(i == 0 ? this.boosters.length : i) - 1].position.z -
            20;
          this.boosters[i].position.x = random(-10, 10) * 0.1;
          this.boosters[i].visible = true;
          this.boosTotal++;
        }
      }
      if (this.Gate.position.z > 0) {
        this.setScreen(GAMEOVER);
      }
      //if (this.boosCount > 20)
      {
        this.boosAnim = 200;
        // this.boosCount = 0;
      }
      if (keydown == 39 && this.MovingCube.position.x < 2) {
        this.MovingCube.position.x += 0.03;
      }
      if (keydown == 37 && this.MovingCube.position.x > -2) {
        this.MovingCube.position.x -= 0.03;
      }
    }
  }

  setScreen(scr) {
    GameScreen = scr;
    this.mTex_logo.visible = false;
    this.Number.forEach((element) => {
      element.visible = false;
    });
    this.mTex_fonts.forEach((element) => {
      element.visible = false;
    });
    this.cylinders.forEach((element) => {
      element.visible = false;
    });
    this.boosters.forEach((element) => {
      element.visible = false;
    });
    this.Gate.visible =
      this.MovingCube.visible =
      stars.visible =
      particles.visible =
        false;
    this.reload.visible = false;
    switch (GameScreen) {
      case GAMEMENU:
        break;
      case GAMEPLAY:
        this.cylinders.forEach((element) => {
          element.visible = true;
        });
        this.boosters.forEach((element) => {
          element.visible = true;
        });
        this.Gate.visible = this.MovingCube.visible = true;
        this.gameCounter = 0;
        for (let i = 0; i < this.cylinders.length; i++) {
          this.cylinders[i].rotation.set(Math.PI * 0.5, 0, 0);
          this.cylinders[i].position.set(0, 0, -220 * i);
        }
        for (let i = 0; i < this.boosters.length; i++) {
          this.boosters[i].position.set(random(-10, 10) * 0.1, 0, -50 - i * 20);
        }
        this.MovingCube.position.set(0, 0, -5);
        this.Gate.position.set(0, 0, -2400);
        this.boosCount = 0;
        this.boosTotal = 0;
        this.boosAnim = 0;
        this.time = new Date().getTime();

        //setTimeout(this.timeout, 41000);

        // GameScreen = GAMEOVER;

        break;
      case GAMEOVER:
        this.time = new Date().getTime() - this.time;
        console.log("this.time = " + this.time);
        DrawLbl(
          this.mTex_fonts[0],
          "Catch: " + this.boosCount,
          0,
          -160,
          CLR_WHT,
          100
        );
        DrawLbl(
          this.mTex_fonts[1],
          "Total: " + this.boosTotal,
          0,
          0,
          CLR_WHT,
          100
        );
        DrawLbl(
          this.mTex_fonts[2],
          "Score: " + (this.boosCount * 10 - this.boosTotal),
          0,
          160,
          CLR_WHT,
          100
        );
        // DrawLbl(this.mTex_fonts[1], 'Score: ' + (this.boosCount * 10 - this.boosTotal), 0, 120, CLR_WHT, 100);
        break;
    }
  }
  timeout() {
    console.log(mGame.Gate.position);
    mGame.Gate.position.set(0, 0, -200);
    console.log("this.time = " + mGame.time);
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
