import * as THREE from "three";

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

// Create mixed geometries (cube, cone, sphere, etc.) and place them in the center
const geometries = [
  new THREE.BoxGeometry(0.5, 0.5, 0.5), // Cube
  new THREE.SphereGeometry(0.3, 32, 32), // Sphere
  new THREE.ConeGeometry(0.3, 0.7, 32), // Cone
  new THREE.CylinderGeometry(0.3, 0.3, 0.7, 32), // Cylinder
  new THREE.TorusGeometry(0.3, 0.1, 16, 100), // Torus (donut shape)
];

// Materials for each object
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Red for Cube
  new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Blue for Sphere
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Yellow for Cone
  new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Cyan for Cylinder
  new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Magenta for Torus
];

// Create and position each object dynamically
for (let i = 0; i < geometries.length; i++) {
  const object = new THREE.Mesh(geometries[i], materials[i]);
  object.position.set((i - 2) * 1.2, 0, 0); // Space them out along the x-axis
  scene.add(object);
}

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
renderer.render(scene, camera);
