// Basic 3D Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('globe-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Add a glowing sphere (AI Globe)
const geometry = new THREE.SphereGeometry(2, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  emissive: 0x00ffff,
  emissiveIntensity: 0.6,
  metalness: 0.3,
  roughness: 0.2,
});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(ambientLight, pointLight);

// Particle cloud
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 800;
const positions = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 20;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMaterial = new THREE.PointsMaterial({
  color: 0x00ffff,
  size: 0.02,
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// Camera Position
camera.position.z = 6;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.003;
  particles.rotation.y += 0.001;
  renderer.render(scene, camera);
}

animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
