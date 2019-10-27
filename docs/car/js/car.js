var scene = new THREE.Scene();
scene.background = new THREE.Color(0xdddddd);

var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
camera.position.x = 400;
camera.position.y = 200;
camera.position.z = 400;

var controls = new THREE.OrbitControls(camera);
controls.addEventListener("change", renderer);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var loader = new THREE.GLTFLoader();
loader.load('./textures/scene.gltf', function(gltf) {
    scene.add(gltf.scene);
    animate();
});

window.addEventListener("resize", onWindowResize);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}