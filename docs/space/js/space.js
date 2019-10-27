var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.rotation.x = Math.PI / 2;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var starGeo = new THREE.Geometry();
for (let i = 0; i < 6000; i++) {
    star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
    )
    star.velocity = 0;
    star.acceleration = 0.02;
    starGeo.vertices.push(star);
}

var sprite = new THREE.TextureLoader().load("./textures/star.png");
var starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.9,
    map: sprite
});

var stars = new THREE.Points(starGeo, starMaterial);
scene.add(stars);

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    starGeo.vertices.forEach(star => {
        star.velocity += star.acceleration;
        star.y -= star.velocity;
        if (star.y < -200) {
            star.y = 200;
            star.velocity = 0;
        }
    });
    starGeo.verticesNeedUpdate = true;
    stars.rotation.y += 0.0015;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();