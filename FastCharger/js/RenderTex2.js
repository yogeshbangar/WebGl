function fragment_shader_screen() {
  return `	varying vec2 vUv;
    uniform sampler2D tDiffuse;

    void main() {

        gl_FragColor = texture2D( tDiffuse, vUv );

    }
`;
}
function fragment_shader_pass_1() {
  return `
    varying vec2 vUv;
    uniform float time;

    void main() {

        float r = vUv.x;
        if (vUv.y < 0.5) r = 0.0;
        float g = vUv.y;
        if (vUv.x < 0.5) g = 0.0;

        gl_FragColor = vec4(r, g, time, 1.0);

    }
    `;
}
function vertexShader() {
  return `

			varying vec2 vUv;

			void main() {

				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}

    `;
}
function shaderAdd(game) {
  game.renderSwap = false;
  game.postScene = new THREE.Scene();
  game.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
  game.renderTarget = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight
  );
  game.RT1 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
  game.RT2 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
  game.RT3 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
  game.RT4 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
  game.RT5 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
  game.RT6 = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
  let uniforms = {
    tex1: { value: game.renderTarget.texture },
    tex2: { value: game.RT2.texture },
    tex3: { value: game.RT4.texture },
    factor: { value: 0.8 },
    intensity: { value: 1.0 },
  };
  let uniformsP = {
    tex: { value: game.RT3.texture },
  };
  let uniformsH = {
    tex: { value: game.renderTarget.texture },
    width: { value: window.innerWidth },
    height: { value: window.innerHeight },
  };
  let uniformsV = {
    tex: { value: game.RT1.texture },
    backbuffer: { value: game.RT3.texture },
    width: { value: window.innerWidth },
    height: { value: window.innerHeight },
  };
  game.HorizontalBlur = new THREE.ShaderMaterial({
    uniforms: uniformsH,
    fragmentShader: Blurfs(),
    vertexShader: BlurHvs(),
  });
  game.VerticalBlur = new THREE.ShaderMaterial({
    uniforms: uniformsV,
    fragmentShader: Blurfs(),
    vertexShader: BlurVvs(),
  });
  game.FinalShader = new THREE.ShaderMaterial({
    uniforms: uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader(),
  });
  game.PostShader = new THREE.ShaderMaterial({
    uniforms: uniformsP,
    fragmentShader: simpleFragmentShader(),
    vertexShader: vertexShader(),
  });
  var materialShad = new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide,
    color: 0xff0ff0,
  });
  const plane = new THREE.PlaneBufferGeometry(2, 2);
  game.quady = new THREE.Mesh(plane, materialShad);
  game.postScene.add(game.quady);
}
function renderCall(game) {
  game.renderer.setRenderTarget(game.renderTarget);
  game.renderer.render(game.scene, game.camera);
  game.renderer.setRenderTarget(null);

  game.renderer.setRenderTarget(game.RT1);
  game.quady.material = game.HorizontalBlur;

  game.quady.material.uniforms.tex.value = game.renderTarget.texture;
  game.quady.material.uniforms.width.value = window.innerWidth / 32;
  game.renderer.render(game.postScene, game.postCamera);
  game.renderer.setRenderTarget(null);

  game.quady.material = game.VerticalBlur;
  game.quady.material.uniforms.tex.value = game.RT1.texture;
  game.quady.material.uniforms.height.value = window.innerHeight / 16;
  game.renderer.setRenderTarget(game.RT2);
  game.renderer.render(game.postScene, game.postCamera);
  game.renderer.setRenderTarget(null);

  game.renderer.setRenderTarget(game.RT5);
  game.quady.material = game.HorizontalBlur;
  game.quady.material.uniforms.tex.value = game.RT2.texture;
  game.quady.material.uniforms.width.value = window.innerWidth / 8;
  game.renderer.render(game.postScene, game.postCamera);
  game.renderer.setRenderTarget(null);

  game.quady.material = game.VerticalBlur;
  game.quady.material.uniforms.tex.value = game.RT5.texture;
  game.quady.material.uniforms.height.value = window.innerHeight / 6;
  game.renderer.setRenderTarget(game.RT6);
  game.renderer.render(game.postScene, game.postCamera);
  game.renderer.setRenderTarget(null);

  game.renderer.setRenderTarget(game.RT1);
  game.quady.material = game.HorizontalBlur;
  game.quady.material.uniforms.tex.value = game.RT5.texture;
  game.quady.material.uniforms.width.value = window.innerWidth / 4;
  game.renderer.render(game.postScene, game.postCamera);
  game.renderer.setRenderTarget(null);

  game.quady.material = game.VerticalBlur;
  game.quady.material.uniforms.tex.value = game.RT1.texture;
  game.quady.material.uniforms.height.value = window.innerHeight / 2;
  game.renderer.setRenderTarget(game.RT2);
  game.renderer.render(game.postScene, game.postCamera);
  game.renderer.setRenderTarget(null);

  game.renderer.setRenderTarget(game.RT5);
  game.quady.material = game.HorizontalBlur;
  game.quady.material.uniforms.tex.value = game.RT2.texture;
  game.quady.material.uniforms.width.value = window.innerWidth / 1;
  game.renderer.render(game.postScene, game.postCamera);
  game.renderer.setRenderTarget(null);

  game.quady.material = game.VerticalBlur;
  game.quady.material.uniforms.tex.value = game.RT5.texture;
  game.quady.material.uniforms.height.value = window.innerHeight / 1;
  game.renderer.setRenderTarget(game.RT6);
  game.renderer.render(game.postScene, game.postCamera);
  game.renderer.setRenderTarget(null);

  game.quady.material = game.FinalShader;
  game.quady.material.uniforms.tex2.value = game.RT6.texture;
  game.quady.material.uniforms.intensity.value = 1;
  //game.quady.material.uniforms.tex2.value = game.RT2.texture;

  if (game.renderSwap) {
    game.renderSwap = false;
    game.quady.material.uniforms.tex3.value = game.RT4.texture;
    game.renderer.setRenderTarget(game.RT3);
    game.renderer.render(game.postScene, game.postCamera);
    game.renderer.setRenderTarget(null);
    game.quady.material = game.PostShader;
    game.quady.material.uniforms.tex.value = game.RT3.texture;
  } else {
    game.renderSwap = true;
    game.quady.material.uniforms.tex3.value = game.RT3.texture;
    game.renderer.setRenderTarget(game.RT4);
    game.renderer.render(game.postScene, game.postCamera);
    game.renderer.setRenderTarget(null);
    game.quady.material = game.PostShader;
    game.quady.material.uniforms.tex.value = game.RT4.texture;
  }

  game.renderer.render(game.postScene, game.postCamera);

  // game.renderer.render(game.scene, game.camera);
}
function initObj(game) {
  game.cameraRTT = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    -10000,
    10000
  );
  game.cameraRTT.position.z = 100;
  game.sceneRTT = new THREE.Scene();
  game.sceneScreen = new THREE.Scene();
  var light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 0, 1).normalize();
  game.sceneRTT.add(light);
  light = new THREE.DirectionalLight(0xffaaaa, 1.5);
  light.position.set(0, 0, -1).normalize();
  game.sceneRTT.add(light);
  game.rtTexture = new THREE.WebGLRenderTarget(
    window.innerWidth,
    window.innerHeight,
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBFormat,
    }
  );
  game.materialRtt = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0.0 } },
    vertexShader: vertexShader(),
    fragmentShader: fragment_shader_pass_1(),
  });
  var materialScreen = new THREE.ShaderMaterial({
    uniforms: { tDiffuse: { value: game.rtTexture.texture } },
    vertexShader: vertexShader(),
    fragmentShader: fragment_shader_screen(),
    depthWrite: false,
  });
  var plane = new THREE.PlaneBufferGeometry(
    window.innerWidth,
    window.innerHeight
  );
  var quad = new THREE.Mesh(plane, game.materialRtt);
  quad.position.z = -100;
  game.sceneRTT.add(quad);
  var quad = new THREE.Mesh(plane, materialScreen);
  quad.position.z = -10;
  game.sceneScreen.add(quad);
}
var delta = 0.01;
function update(game) {
  game.camera.position.x = 0;
  game.camera.position.y = 0;

  var time = Date.now() * 0.0015;
  if (
    game.materialRtt.uniforms["time"].value > 1 ||
    game.materialRtt.uniforms["time"].value < 0
  ) {
    delta *= -1;
  }
  game.materialRtt.uniforms["time"].value += delta;
  game.renderer.clear();
  // Render first scene into texture

  game.renderer.render(game.sceneRTT, game.cameraRTT, game.tTexture, true);

  // Render full screen quad with generated texture

  game.renderer.render(game.sceneScreen, game.cameraRTT);

  // Render second scene to screen
  // (using first scene as regular texture)

  game.renderer.render(game.scene, game.camera);
}
