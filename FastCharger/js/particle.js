var stars, particles;
function Particle(scene) {
  starGeo = new THREE.Geometry();
  for (let i = 0; i < 500; i++) {
    let star = new THREE.Vector3(
      Math.random() * 20 - 10,
      Math.random() * 20 - 10,
      Math.random() * -300
    );
    star.velocity = 0;
    star.acceleration = 0.02;
    starGeo.vertices.push(star);
  }
  let starMaterial = new THREE.PointsMaterial({
    color: 0xff0000,
    size: 0.1,
  });
  stars = new THREE.Points(starGeo, starMaterial);

  scene.add(stars);
  setupScene(scene);
}
function aniparticle() {
  starGeo.vertices.forEach((p) => {
    p.velocity += p.acceleration;
    p.z += p.velocity;

    if (p.z > 0) {
      p.z = -200;
      p.velocity = 0;
    }
  });

  starGeo.verticesNeedUpdate = true;
  particles.children.forEach((p) => {
    p.velocity += p.acceleration;
    p.position.z += p.velocity;

    if (p.position.z > 50) {
      p.position.z = -200;
      p.velocity = 0;
    }
  });
}

var MAX = 500;
function setupScene(scene) {
  particles = new THREE.Group();
  const geo = new THREE.BoxBufferGeometry(0.01, 0.01, 20);
  const mat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  for (let i = 0; i < MAX; i++) {
    const particle = new THREE.Mesh(geo, mat);
    particle.position.x = Math.random() * 20 - 10;
    particle.position.z = -(Math.random() * 550);
    particle.position.y = Math.random() * 20 - 10;
    particle.velocity = 0;
    particle.acceleration = 0.02;
    particles.add(particle);
  }
  particles.position.z = -40;
  scene.add(particles);
  particles.visible = false;
  stars.visible = false;
}

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
  `;
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
