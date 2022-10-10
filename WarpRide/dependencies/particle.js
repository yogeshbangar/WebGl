import * as THREE from 'three'

var stars, particles;
const startGeo = new THREE.Geometry();
function Particle(scene) {
    // const startGeo = new THREE.Geometry();
    for (let i = 0; i < 500; i++) {
        let star = new THREE.Vector3(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * (- 300)
        );
        star.velocity = 0;
        star.acceleration = 0.02;
        startGeo.vertices.push(star);
    }
    let starMaterial = new THREE.PointsMaterial({
        color: 0x001eff,
        size: 0.1,
    });
    stars = new THREE.Points(startGeo, starMaterial);

    scene.add(stars);
    setupScene(scene);
}
function aniparticle() {
    startGeo.vertices.forEach(p => {
        p.velocity += p.acceleration
        p.z += p.velocity;

        if (p.z > 0) {
            p.z = -200;
            p.velocity = 0;
        }
    });

    startGeo.verticesNeedUpdate = true;
    particles.children.forEach(p => {

        p.velocity += p.acceleration;
        p.position.z += p.velocity;

        if (p.position.z > 50) {
            p.position.z = -200;
            p.velocity = 0;
        }
    })
}

var MAX = 500;
function setupScene(scene) {
    particles = new THREE.Group()
    const geo = new THREE.BoxBufferGeometry(.01, .01, 20)
    const mat = new THREE.MeshBasicMaterial({ color: 0x001eff })
    for (let i = 0; i < MAX; i++) {
        const particle = new THREE.Mesh(geo, mat)
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

export { Particle, aniparticle, setupScene, stars, particles };