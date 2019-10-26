var camera, scene, renderer;
var geometry, material, mesh, light;

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    geometry = new THREE.BoxGeometry(1, 1, 1);
    material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
    
    for (let i = 0; i < 35; i++) {
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = (Math.random() - 0.5) * 13;
        mesh.position.y = (Math.random() - 0.5) * 13;
        mesh.position.z = (Math.random() - 0.5) * 9;
        scene.add(mesh);
    }

    light = new THREE.PointLight(0xffffff, 1, 500);
    light.position.set(0, 0, 25);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    })
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
