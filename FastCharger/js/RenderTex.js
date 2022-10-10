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

  var material = new THREE.ShaderMaterial({
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

  var quad = new THREE.Mesh(plane, material);
  quad.position.z = -100;
  game.sceneRTT.add(quad);

  var quad = new THREE.Mesh(plane, materialScreen);
  quad.position.z = -100;
  game.sceneScreen.add(quad);
}
function update(game) {
  game.renderer.clear();

  // Render first scene into texture

  game.renderer.render(game.sceneRTT, game.cameraRTT, game.tTexture, true);

  // Render full screen quad with generated texture

  game.renderer.render(game.sceneScreen, game.cameraRTT);

  // Render second scene to screen
  // (using first scene as regular texture)

  game.renderer.render(game.scene, game.camera);
}
