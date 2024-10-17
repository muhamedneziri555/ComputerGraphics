import * as THREE from "three";
import GUI from "lil-gui";

const scene = new THREE.Scene();

// Plane (Surface) Geometry
const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10); // Width, Height, WidthSegments, HeightSegments
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
}); // Green surface
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI * 0.5; // Rotate the plane to lie flat on the XZ plane
plane.position.y = -1; // Position the plane slightly below the objects
scene.add(plane);

// Create mixed geometries (cube, sphere, cone) and place them in the center
const geometries = [
  new THREE.BoxGeometry(0.7, 0.7, 0.7), // Cube
  new THREE.SphereGeometry(0.4, 32, 32), // Sphere
  new THREE.ConeGeometry(0.4, 0.8, 32), // Cone
];

// Materials for each object
const materials = [
  new THREE.MeshStandardMaterial({ color: 0xff0000 }), // Red for Cube
  new THREE.MeshStandardMaterial({ color: 0x0000ff }), // Blue for Sphere
  new THREE.MeshStandardMaterial({ color: 0xffff00 }), // Yellow for Cone
];

// Create and position each object dynamically
const objects = []; // Array to store the created objects
for (let i = 0; i < geometries.length; i++) {
  const object = new THREE.Mesh(geometries[i], materials[i]);
  object.position.set((i - 1) * 2, 0, 0); // Space them out along the x-axis
  objects.push(object); // Store the object for later reference
  scene.add(object);
}

// Add a light source for better 3D effect
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// GUI controls for rotation and position
const gui = new GUI();
objects.forEach((object, index) => {
  const folder = gui.addFolder(`Object ${index + 1}`);
  folder.add(object.rotation, "x", 0, Math.PI * 2, 0.01).name("Rotate X");
  folder.add(object.rotation, "y", 0, Math.PI * 2, 0.01).name("Rotate Y");
  folder.add(object.rotation, "z", 0, Math.PI * 2, 0.01).name("Rotate Z");
  folder.add(object.position, "x", -5, 5, 0.1).name("Move X");
  folder.add(object.position, "y", -5, 5, 0.1).name("Move Y");
  folder.add(object.position, "z", -5, 5, 0.1).name("Move Z");
  folder.open();
});

// Camera
const sizes = {
  width: 800,
  height: 600,
};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
camera.position.x = 0;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sizes.width, sizes.height);
document.getElementById("scene").appendChild(renderer.domElement);

// Render the scene once without any animation loop
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

// Start the animation loop
animate();
